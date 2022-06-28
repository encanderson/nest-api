import { Injectable } from '@nestjs/common';

import { Response } from 'express';
import { Forbidden, Unauthorized } from './../errors';
import { AuthDbService } from '../auth-db/auth-db-service';
import { generateCode, createdAt } from '../utils';
import { HashService } from '../security/tokens/hash.service';
import { TokensService } from '../security/tokens/tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authDbService: AuthDbService,
    private readonly hashService: HashService,
    private readonly tokenService: TokensService,
  ) {}

  async verifyUser(cpf: string, password: string) {
    const user = await this.authDbService.user.findUnique({
      where: {
        user_id: this.hashService.hashFunction(cpf),
      },
    });

    if (!user) {
      throw new Forbidden();
    }

    await this.hashService.comparePassword(password, user.password);

    // TODO expireId 3m
    const accessToken = await this.tokenService.generateAccessToken(
      '30m',
      user,
    );

    const code = generateCode();

    await this.authDbService.user.update({
      where: {
        user_id: user.user_id,
      },
      data: {
        code: code,
        updated_at: createdAt(),
      },
    });

    // TODO - send code by email
    console.log(code);
    return { token: accessToken };
  }

  async confirmSign(res: Response, signToken: string, accessCode: number) {
    const decoded = this.tokenService.verifyToken(signToken);

    const { accessToken, newRefreshToken } =
      await this.tokenService.generateSignTokens(decoded);

    res.setHeader('Access-Token', accessToken);
    res.setHeader('Refresh-Token', newRefreshToken);

    const user = await this.authDbService.user.findUnique({
      where: {
        user_id: decoded.user_id,
      },
      select: {
        active: true,
        app: true,
        code: true,
        email: true,
        id: true,
        name: true,
        picture: true,
        user_id: true,
      },
    });

    if (!user || user.code !== accessCode) {
      throw new Unauthorized();
    }

    delete user.code;

    return user;
  }
}

import { randomBytes } from 'crypto';
import * as moment from 'moment';

import { Response } from 'express';
import { Forbidden, Unauthorized, ExpiredSession } from './../errors';
import { AuthDbService } from '../auth-db/auth-db-service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SecurityService } from '../security/security.service';
import { generateCode, createdAt } from '../utils';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly authDbService: AuthDbService,
    private readonly jwtService: JwtService,
    private readonly securityService: SecurityService,
  ) {}

  async generateAccessToken(expireIn: string, user: User): Promise<string> {
    const accessToken = this.jwtService.sign(
      {
        user_id: user.user_id,
        app: user.app,
        id: user.id,
      },
      {
        expiresIn: expireIn,
      },
    );

    return accessToken;
  }

  async generateRefreshToken(user_id: string, app: string) {
    const expirationDate = moment().add(3, 'd').unix();
    const newRefreshToken = randomBytes(24).toString('hex');

    // TODO - set to Allowlist
    const setKey = {
      user_id,
      app,
    };

    console.log(setKey);

    return { newRefreshToken, expirationDate };
  }

  async verifyUser(cpf: string, password: string) {
    const user = await this.authDbService.user.findUnique({
      where: {
        user_id: this.securityService.hashFunction(cpf),
      },
    });

    if (!user) {
      throw new Forbidden();
    }

    await this.securityService.comparePassword(password, user.password);

    // TODO expireId 3m
    const accessToken = this.generateAccessToken('30m', user);

    await this.authDbService.user.update({
      where: {
        user_id: user.user_id,
      },
      data: {
        code: generateCode(),
        updated_at: createdAt(),
      },
    });

    // TODO - send code by email
    return { token: accessToken };
  }

  async confirmSign(res: Response, signToken: string, accessCode: number) {
    const decoded = this.verifyToken(signToken);

    const accessToken = await this.generateAccessToken('60', {
      user_id: decoded.user_id,
      app: decoded.app,
      id: decoded.id,
    });

    const { newRefreshToken } = await this.generateRefreshToken(
      decoded.user_id,
      decoded.app,
    );
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

  verifyToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: 'secret',
      }) as { user_id: string; app: string; id: string };

      return decoded;
    } catch (err) {
      if (err) {
        throw new ExpiredSession();
      }
    }
  }
}

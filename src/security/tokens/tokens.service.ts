import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { randomBytes } from 'crypto';
import * as moment from 'moment';

import { ExpiredSession } from '../../errors';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class TokensService {
  constructor(private readonly jwtService: JwtService) {}

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

  async generateSignTokens(user: User) {
    // TODO expireId 15m
    const accessToken = await this.generateAccessToken('60m', {
      user_id: user.user_id,
      app: user.app,
      id: user.id,
    });

    const { newRefreshToken } = await this.generateRefreshToken(
      user.user_id,
      user.app,
    );

    return { accessToken, newRefreshToken };
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

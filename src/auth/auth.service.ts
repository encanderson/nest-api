import { Forbidden, Unauthorized } from './../errors';
import { AuthDbService } from './../auth-db/auth-db.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authDbService: AuthDbService,
    private readonly jwtService: JwtService,
  ) {}

  async verifyUser(cpf: string, password: string) {
    const user = await this.authDbService.user.findUnique({
      where: {
        user_id: cpf,
      },
    });

    if (!user) {
      throw new Forbidden();
    }

    if (user.password !== password) {
      throw new Unauthorized();
    }

    const accessToken = this.jwtService.sign(
      {
        user_id: user.user_id,
        app: user.app,
        id: user.id,
      },
      {
        expiresIn: '3m',
      },
    );

    return { token: accessToken };
  }

  async verifyToken(token: string) {
    const decoded = this.jwtService.verify(token, {
      secret: 'secret',
    });

    const user = this.authDbService.user.findUnique({
      where: {
        user_id: decoded.user_id,
      },
    });

    return user;
  }
}

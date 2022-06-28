import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'cpf',
    });
  }

  async validate(cpf: string, password: string) {
    const { token } = await this.authService.verifyUser(cpf, password);

    return {
      signToken: token,
    };
  }
}

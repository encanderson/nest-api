import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthDbService } from '../auth-db/auth-db-service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../security/strategies/jwt-strategy';
import { LocalStrategy } from '../security/strategies/local-strategy';
import { SecurityService } from '../security/security.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'secret',
    }),
  ],
  providers: [
    AuthDbService,
    SecurityService,
    JwtStrategy,
    LocalStrategy,
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}

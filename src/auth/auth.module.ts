import { Module } from '@nestjs/common';

import { AuthDbService } from '../auth-db/auth-db-service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { SecurityModule } from '../security/security.module';
import { LocalStrategy } from '../strategies';

@Module({
  imports: [SecurityModule],
  providers: [AuthDbService, LocalStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

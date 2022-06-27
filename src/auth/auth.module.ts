import { Module } from '@nestjs/common';

import { AuthDbService } from '../auth-db/auth-db-service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { SecurityModule } from '../security/security.module';

@Module({
  imports: [SecurityModule],
  providers: [AuthDbService, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

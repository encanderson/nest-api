import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthDbService } from '../auth-db/auth-db-service';
import { SecurityService } from '../security/security.service';

@Module({
  // imports: [AuthDbService],
  controllers: [AdminController],
  providers: [AuthDbService, SecurityService, AdminService],
})
export class AdminModule {}

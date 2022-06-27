import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { SecurityModule } from './security/security.module';

@Module({
  imports: [UsersModule, AdminModule, AuthModule, SecurityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

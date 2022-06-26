import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [UsersModule, AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

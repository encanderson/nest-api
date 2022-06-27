/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../security/guards/local-auth-guard';
import { Credentials } from '../security/dto/credentials-sign';

@ApiTags('Authentication')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() payload: Credentials) {
    return req.user;
  }
}

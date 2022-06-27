/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response } from 'express';
import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Res,
} from '@nestjs/common';
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

  @Post('confirm-sign')
  async confirmSignIn(
    @Res() res: Response,
    @Body() payload: { accessToken: string; code: string },
  ) {
    const user = await this.authService.confirmSign(
      res,
      payload.accessToken,
      +payload.code,
    );

    res.status(200).send(user);
  }
}

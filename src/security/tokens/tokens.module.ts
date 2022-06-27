import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { TokensService } from './tokens.service';
import { HashService } from './hash.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'secret',
    }),
  ],
  providers: [TokensService, HashService, JwtService],
  exports: [TokensService, HashService],
})
export class TokensModule {}

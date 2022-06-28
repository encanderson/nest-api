import { Module } from '@nestjs/common';
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
  providers: [TokensService, HashService],
  exports: [TokensService, HashService],
})
export class TokensModule {}

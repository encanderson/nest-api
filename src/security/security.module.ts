import { Module } from '@nestjs/common';

import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [TokensModule],
  providers: [TokensModule],
  exports: [TokensModule],
})
export class SecurityModule {}

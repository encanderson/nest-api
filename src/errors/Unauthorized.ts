import { HttpException, HttpStatus } from '@nestjs/common';

export class Unauthorized extends HttpException {
  constructor() {
    super('Dados incorretos', HttpStatus.UNAUTHORIZED);
  }
}

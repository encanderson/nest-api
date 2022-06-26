import { HttpException, HttpStatus } from '@nestjs/common';

export class Forbidden extends HttpException {
  constructor() {
    super('Usuário não reconhecido', HttpStatus.FORBIDDEN);
  }
}

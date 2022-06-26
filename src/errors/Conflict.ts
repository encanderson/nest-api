import { HttpException, HttpStatus } from '@nestjs/common';

export class Conflict extends HttpException {
  constructor() {
    super('Usuário já existe', HttpStatus.CONFLICT);
  }
}

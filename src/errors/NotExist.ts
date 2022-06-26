import { HttpException, HttpStatus } from '@nestjs/common';

export class NotExist extends HttpException {
  constructor() {
    super('Usuário não registrado', HttpStatus.NOT_FOUND);
  }
}

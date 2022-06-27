import { HttpException, HttpStatus } from '@nestjs/common';

export class ExpiredSession extends HttpException {
  constructor() {
    super('Sessão expirada', HttpStatus.UNAUTHORIZED);
  }
}

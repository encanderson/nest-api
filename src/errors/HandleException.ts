import { HttpException, HttpStatus } from '@nestjs/common';
import { StatusType } from './statusType';

export class HandleExceptions extends HttpException {
  constructor(msg: string, code: StatusType) {
    super(msg, HttpStatus[code]);
  }
}

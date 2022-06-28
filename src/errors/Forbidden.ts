import { HandleExceptions } from './HandleException';
export class Forbidden extends HandleExceptions {
  constructor() {
    super('Acesso nagado', 'FORBIDDEN');
  }
}

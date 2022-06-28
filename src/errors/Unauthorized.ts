import { HandleExceptions } from './HandleException';
export class Unauthorized extends HandleExceptions {
  constructor() {
    super('Verifique os seus dados', 'UNAUTHORIZED');
  }
}

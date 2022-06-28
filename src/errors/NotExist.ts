import { HandleExceptions } from './HandleException';
export class NotExist extends HandleExceptions {
  constructor() {
    super('Usuário não existe', 'NOT_FOUND');
  }
}

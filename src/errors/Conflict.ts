import { HandleExceptions } from './HandleException';
export class Conflict extends HandleExceptions {
  constructor() {
    super('Usuário já existe', 'CONFLICT');
  }
}

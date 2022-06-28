import { HandleExceptions } from './HandleException';
export class ExpiredSession extends HandleExceptions {
  constructor() {
    super('Sessão expirada', 'UNAUTHORIZED');
  }
}

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SetHeadersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.setHeader('X-Powered-By', 'PHP/7.1.7');

    res.setHeader(
      'Access-Control-Expose-Headers',
      'Refresh-Token, Access-Token',
    );

    next();
  }
}

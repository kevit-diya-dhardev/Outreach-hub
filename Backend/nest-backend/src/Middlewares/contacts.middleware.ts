import { NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class IsContactEditorType implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.body.role == 'Editor') {
      next();
    }
    throw new UnauthorizedException('You are not an editor!');
  }
}

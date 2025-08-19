import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class IsAdminType implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.body.isAdmin == true) {
      next();
    } else {
      throw new UnauthorizedException("You're not admin!");
    }
  }
}

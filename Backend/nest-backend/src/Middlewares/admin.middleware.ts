import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

@Injectable()
export class IsAdminType implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Inside middleware!');
    if (!req.headers.authorization)
      throw new JsonWebTokenError('Token not found!');
    const token = req.headers.authorization.split(' ')[1];
    const payload: any = jwt.decode(token);
    if (!payload.isAdmin) {
      throw new UnauthorizedException('Access unauthorized!');
    }
    next();
  }
}

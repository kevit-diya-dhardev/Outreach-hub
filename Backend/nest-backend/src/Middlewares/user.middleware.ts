import { NestMiddleware, UnauthorizedException } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';

export class userMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Inside user middleware!');
    if (!req.headers.authorization)
      throw new JsonWebTokenError('Token not found error!');
    const token = req.headers.authorization.split(' ')[1];
    const decoded: any = jwt.decode(token);
    const isAdmin = decoded.isAdmin;
    if (isAdmin) {
      throw new UnauthorizedException('Auth failed!');
    }
    next();
  }
}

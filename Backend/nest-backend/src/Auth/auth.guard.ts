import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './auth.schema';
import { Model } from 'mongoose';

//Guard to validate token

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Auth.name) private authModel: Model<Auth>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('Inside auth-guard!');
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization header format');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      req.userData = payload;
      await this.checkForToken(token);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
    return true;
  }
  async checkForToken(token) {
    const existToken = await this.authModel.find({ token: token });
    if (!existToken) {
      throw new Error();
    }
    return;
  }
}

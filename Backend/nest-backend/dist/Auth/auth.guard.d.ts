import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './auth.schema';
import { Model } from 'mongoose';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private authModel;
    constructor(jwtService: JwtService, authModel: Model<Auth>);
    canActivate(context: ExecutionContext): Promise<boolean>;
    checkForToken(token: any): Promise<boolean>;
}

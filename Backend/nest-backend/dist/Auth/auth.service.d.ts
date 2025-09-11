import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'src/users/users.schema';
import { AuthDto } from './dto/auth.dto';
import { Auth } from './auth.schema';
export declare class AuthService {
    private userModel;
    private jwtService;
    private authModel;
    constructor(userModel: Model<User>, jwtService: JwtService, authModel: Model<Auth>);
    generateToken(authData: AuthDto): Promise<{
        token: string;
    }>;
    storeToken(token: any): Promise<import("mongoose").Document<unknown, {}, Auth, {}, {}> & Auth & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteTokenFromDb(token: any): Promise<import("mongodb").DeleteResult>;
}

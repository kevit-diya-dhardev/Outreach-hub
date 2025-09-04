import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'src/users/users.schema';
import { AuthDto } from './dto/auth.dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    generateToken(authData: AuthDto): Promise<{
        token: string;
        isAdmin: boolean | undefined;
    }>;
}

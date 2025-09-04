import { AuthDto } from 'src/Auth/dto/auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(userData: AuthDto): Promise<{
        token: string;
        isAdmin: boolean | undefined;
    }>;
}

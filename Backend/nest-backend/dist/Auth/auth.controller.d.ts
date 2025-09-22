import { AuthDto } from 'src/Auth/dto/auth.dto';
import { AdminAuthService } from './services/admin-auth.service';
import { UserAuthService } from './services/user-auth.service';
export declare class AuthController {
    private adminAuthService;
    private userAuthService;
    constructor(adminAuthService: AdminAuthService, userAuthService: UserAuthService);
    loginAdmin(userData: AuthDto): Promise<{
        token: string;
    }>;
    loginUser(userData: AuthDto): Promise<{
        token: string;
    }>;
    logoutAdmin(req: any): Promise<import("mongodb").DeleteResult>;
    logoutUser(req: any): Promise<import("mongodb").DeleteResult>;
}

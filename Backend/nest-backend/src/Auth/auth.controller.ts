import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Req,
  HttpException,
} from '@nestjs/common';
import { AuthDto } from 'src/Auth/dto/auth.dto';
import { AdminAuthService } from './services/admin-auth.service';
import { UserAuthService } from './services/user-auth.service';

//Below controller for login route

@Controller()
export class AuthController {
  constructor(
    private adminAuthService: AdminAuthService,
    private userAuthService: UserAuthService,
  ) {}
  @Post('login/admin')
  async loginAdmin(@Body() userData: AuthDto) {
    return await this.adminAuthService.generateToken(userData);
  }

  @Post('login/user')
  async loginUser(@Body() userData: AuthDto) {
    return await this.userAuthService.generateToken(userData);
  }
  @Post('logout/admin')
  async logoutAdmin(@Req() req: any) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      return await this.adminAuthService.deleteTokenFromDb(token);
    } catch (error) {
      console.log(error);
      throw new HttpException('Token deleting error in logout', 500);
    }
  }
  @Post('logout/user')
  async logoutUser(@Req() req: any) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      return await this.userAuthService.deleteTokenFromDb(token);
    } catch (error) {
      console.log(error);
      throw new HttpException('Token deleting error in logout', 500);
    }
  }
}

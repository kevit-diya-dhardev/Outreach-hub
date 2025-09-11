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
import { AuthService } from './auth.service';

//Below controller for login route

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(@Body() userData: AuthDto) {
    return await this.authService.generateToken(userData);
  }

  @Post('logout')
  async logout(@Req() req: any) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      return await this.authService.deleteTokenFromDb(token);
    } catch (error) {
      console.log(error);
      throw new HttpException('Token deleting error in logout', 500);
    }
  }
}

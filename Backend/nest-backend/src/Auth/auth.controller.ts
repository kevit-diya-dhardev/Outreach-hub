import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { AuthDto } from 'src/Auth/dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  login(@Body() userData: AuthDto) {
    return this.authService.generateToken(userData);
  }
}

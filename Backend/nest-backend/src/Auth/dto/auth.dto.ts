import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  email: String;

  @IsNotEmpty()
  @IsString()
  password: String;
}

import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class userDto {
  @IsNotEmpty()
  @IsString()
  name: String;

  @IsNotEmpty()
  @IsString()
  email: String;

  @IsNotEmpty()
  @IsString()
  password: String;

  @IsNotEmpty()
  @IsString()
  workspace_id: String;

  @IsNotEmpty()
  @IsString()
  role: String;

  @IsOptional()
  @IsBoolean()
  isAdmin: boolean;
}

export class updateUserDto {
  @IsOptional()
  @IsString()
  name: String;

  @IsOptional()
  @IsString()
  email: String;

  @IsOptional()
  @IsString()
  password: String;

  @IsOptional()
  @IsObject()
  workspace: Object;
}

import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ContactsDto {
  @IsNotEmpty()
  contact_name: String;

  @IsNotEmpty()
  @IsNumber()
  phoneNumber: Number;

  @IsNotEmpty()
  @IsArray()
  tags: String[];

  @IsNotEmpty()
  @IsString()
  workspace_id: String;

  @IsOptional()
  @IsString()
  createdBy: String;
}

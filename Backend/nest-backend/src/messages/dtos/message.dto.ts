import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum messageType {
  'text' = 'Text',
  'text-image' = 'Text-Image',
}

type message = {
  text: String;
  imageUrl: String;
};

export class messageDataDto {
  @IsNotEmpty()
  @IsString()
  name: String;

  @IsNotEmpty()
  @IsEnum(messageType)
  type: messageType;

  @IsNotEmpty()
  message: message;

  @IsNotEmpty()
  workspace_id: string;
}

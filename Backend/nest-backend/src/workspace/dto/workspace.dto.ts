import { IsNotEmpty, IsString } from 'class-validator';

export class workspaceSchemaDto {
  @IsNotEmpty()
  @IsString()
  workspace_name: String;

  @IsNotEmpty()
  @IsString()
  description: String;
}

import { IsOptional, IsString } from 'class-validator';

export class updateWorkspaceDto {
  @IsOptional()
  @IsString()
  workspace_name: String;

  @IsOptional()
  @IsString()
  description: String;
}

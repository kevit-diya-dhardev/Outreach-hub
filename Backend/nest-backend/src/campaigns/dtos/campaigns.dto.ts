import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';
import { status } from '../campaign-schema/campaigns.schema';
import mongoose from 'mongoose';
import { PartialType } from '@nestjs/mapped-types';
type message = {
  message_name: string;
  type: string;
  text: string;
  imageUrl?: string;
  message_id: mongoose.Types.ObjectId;
};

export class CampaignDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsArray()
  selectedTags: string[];

  @IsNotEmpty()
  message: message;

  @IsNotEmpty()
  @IsString()
  workspace_id: mongoose.Types.ObjectId;
}
export class updateCampaignDto extends PartialType(CampaignDto) {}

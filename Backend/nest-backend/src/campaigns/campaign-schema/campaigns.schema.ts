import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Submessage {
  @Prop({ required: true, enum: ['Text', 'Text-Image'] })
  type: string;

  @Prop({ required: true })
  text: string;

  @Prop()
  imageUrl?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Message' })
  message_id: mongoose.Types.ObjectId;
}

export const SubmessageSchema = SchemaFactory.createForClass(Submessage);

export enum status {
  'Draft' = 'Draft',
  'Running' = 'Running',
  'Completed' = 'Completed',
}

@Schema({ timestamps: true })
export class Campaign {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({
    type: String,
    enum: Object.values(status),
    default: status.Draft,
  })
  status: status;

  @Prop({ type: [{ type: String, ref: 'Contact' }] })
  selectedTags: string[];

  @Prop({ type: SubmessageSchema })
  message: Submessage;

  @Prop({ type: Date })
  launchedAt: Date; // Use the correct TypeScript type

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
  })
  workspace_id: mongoose.Types.ObjectId; // It's better to use ObjectId for references

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: mongoose.Types.ObjectId;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);

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

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: true,
  })
  contact_id: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true })
  contact_name: string;

  @Prop({ type: Number, required: true })
  phoneNumber: number;
}

export const SubmessageSchema = SchemaFactory.createForClass(Submessage);

@Schema()
export class CampaignPerContacts {
  @Prop({ required: true, type: [SubmessageSchema] })
  messagePerContact: Submessage[];

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  workspace_id: mongoose.Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  campaignId: mongoose.Types.ObjectId;

  @Prop({ required: true, type: Date, default: Date.now() })
  sentAt: Date;

  @Prop({ type: [{ type: String, required: true }] })
  tags: string[];
}

export const CampaignPerContactsSchema =
  SchemaFactory.createForClass(CampaignPerContacts);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  name: String;

  @Prop({ required: true, unique: true })
  email: String;

  @Prop({ required: true })
  password: String;

  @Prop({ required: true, enum: ['Editor', 'Viewer'] })
  role: String;

  @Prop({ type: [{ required: true, type: mongoose.Schema.Types.ObjectId }] })
  workspace_id: String[];

  @Prop({ required: true, type: Date, default: Date.now() })
  createdAt: String;

  @Prop({ required: false, default: false })
  isAdmin?: boolean;

  @Prop({ required: true, type: String })
  createdBy: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

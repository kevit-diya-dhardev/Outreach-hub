import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

class Submessage {
  @Prop({ required: true, type: String })
  text: string;

  @Prop()
  imageUrl?: string;
}

@Schema()
export class Message {
  @Prop({ required: true, type: String })
  name: String;

  @Prop({
    required: true,
    type: String,
    enum: ['Text', 'Text-Image'],
    default: 'Text',
  })
  type: String;

  @Prop({ required: true, type: String, ref: 'Workspace' })
  workspace_id: String;

  @Prop({ required: true })
  message: Submessage;

  @Prop({ required: true, ref: 'User', type: String })
  createdBy: String;

  @Prop({ required: true, type: Date, default: Date.now() })
  createdAt: String;
}
export const MessageSchema = SchemaFactory.createForClass(Message);

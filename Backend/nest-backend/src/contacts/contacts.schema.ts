import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

@Schema()
export class Contacts {
  @Prop({ required: true })
  contact_name: String;

  @Prop({ required: true })
  phoneNumber: Number;

  @Prop({ required: true, type: Array })
  tags: String[];

  @Prop({ required: true, ref: 'Workspace' })
  workspace_id: String;

  @Prop({ required: false, ref: 'User' })
  createdBy: String;
}

export const ContactSchema = SchemaFactory.createForClass(Contacts);

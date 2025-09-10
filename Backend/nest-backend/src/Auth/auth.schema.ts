import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Auth {
  @Prop({ type: String })
  token: string;
}
export const AuthSchema = SchemaFactory.createForClass(Auth);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Auth {
  @Prop({ type: String })
  token: string;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;
}
export const AuthSchema = SchemaFactory.createForClass(Auth);
AuthSchema.index({ createdAt: 1 }, { expireAfterSeconds: 36000 });

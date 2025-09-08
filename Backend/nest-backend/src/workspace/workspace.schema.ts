import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/users.schema';

@Schema()
export class Workspace {
  @Prop({ unique: true, required: true })
  workspace_id: String;

  @Prop({ required: true })
  workspace_name: String;

  @Prop({ required: true })
  description: String;

  @Prop({ required: true, type: Date, default: Date.now() })
  createdAt: String;

  @Prop({ type: String, ref: 'User' })
  createdBy: String;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);

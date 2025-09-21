import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { Message, MessageSchema } from './messages.schema';
import { MessageController } from './messages.controller';
import { MessageService } from './messages.services';
import { UserService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/Auth/auth.module';
import { Auth, AuthSchema } from 'src/Auth/auth.schema';
import { Workspace, WorkspaceSchema } from 'src/workspace/workspace.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: Message.name, schema: MessageSchema },
      { name: Workspace.name, schema: WorkspaceSchema },
    ]),
    UsersModule,
    AuthModule,
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessaegeModule {}

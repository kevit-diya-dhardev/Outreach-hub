import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { Message, MessageSchema } from './messages.schema';
import { MessageController } from './messages.controller';
import { MessageService } from './messages.services';
import { UserService } from 'src/users/users.service';
import { RolesGuard } from 'src/Auth/roles.guard';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/Auth/auth.module';
import { Auth, AuthSchema } from 'src/Auth/auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([ { name: Auth.name, schema: AuthSchema },{ name: Message.name, schema: MessageSchema }]),
    UsersModule,
    AuthModule,
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessaegeModule {}

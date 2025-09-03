import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { Message, MessageSchema } from './messages.schema';
import { MessageController } from './messages.controller';
import { MessageService } from './messages.services';
import { UserService } from 'src/users/users.service';
import { RolesGuard } from 'src/Auth/roles.guard';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    UsersModule,
  ],
  controllers: [MessageController],
  providers: [MessageService, RolesGuard],
})
export class MessaegeModule {}

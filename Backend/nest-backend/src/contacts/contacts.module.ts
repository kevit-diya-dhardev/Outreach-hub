import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Contacts, ContactSchema } from './contacts.schema';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { User, UserSchema } from 'src/users/users.schema';
import { Workspace, WorkspaceSchema } from 'src/workspace/workspace.schema';

import { UsersModule } from 'src/users/users.module';
import { AuthService } from 'src/Auth/auth.service';
import { AuthModule } from 'src/Auth/auth.module';
import { Auth, AuthSchema } from 'src/Auth/auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: Contacts.name, schema: ContactSchema },
      { name: User.name, schema: UserSchema },
      { name: Workspace.name, schema: WorkspaceSchema },
    ]),
    UsersModule,
    AuthModule,
  ],
  providers: [ContactsService],
  controllers: [ContactsController],
})
export class ContactsModule {}

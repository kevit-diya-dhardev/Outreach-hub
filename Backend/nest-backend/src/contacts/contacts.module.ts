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
import { UserService } from 'src/users/users.service';
import { RolesGuard } from 'src/Auth/roles.guard';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Contacts.name, schema: ContactSchema },
      { name: User.name, schema: UserSchema },
      { name: Workspace.name, schema: WorkspaceSchema },
    ]),
    UsersModule,
  ],
  providers: [ContactsService, RolesGuard],
  controllers: [ContactsController],
})
export class ContactsModule {}

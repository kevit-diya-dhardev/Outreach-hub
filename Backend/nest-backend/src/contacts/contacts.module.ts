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
import { IsContactEditorType } from 'src/Middlewares/contacts.middleware';
import { userMiddleware } from 'src/Middlewares/user.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Contacts.name, schema: ContactSchema },
      { name: User.name, schema: UserSchema },
      { name: Workspace.name, schema: WorkspaceSchema },
    ]),
  ],
  providers: [ContactsService],
  controllers: [ContactsController],
})
export class ContactsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsContactEditorType)
      .exclude({ path: 'contacts', method: RequestMethod.GET })
      .forRoutes(ContactsController);

    consumer.apply(userMiddleware).forRoutes(ContactsController);
  }
}

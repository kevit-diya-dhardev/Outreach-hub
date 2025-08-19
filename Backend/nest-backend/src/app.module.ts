import { Module } from '@nestjs/common';
import { WorkspaceModule } from './workspace/workspace.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://diyadhardev:mongodbprincess21@cluster0.rkza2ea.mongodb.net/Nest-Outreach-hub',
    ),
    WorkspaceModule,
    UsersModule,
    ContactsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

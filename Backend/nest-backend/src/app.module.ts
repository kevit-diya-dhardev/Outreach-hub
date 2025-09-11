import { Module } from '@nestjs/common';
import { WorkspaceModule } from './workspace/workspace.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ContactsModule } from './contacts/contacts.module';
import { AuthModule } from './Auth/auth.module';
import { AuthGuard } from './Auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { MessaegeModule } from './messages/messages.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://diyadhardev:mongodbprincess21@cluster0.rkza2ea.mongodb.net/Nest-Outreach-hub',
    ),
    WorkspaceModule,
    UsersModule,
    ContactsModule,
    MessaegeModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

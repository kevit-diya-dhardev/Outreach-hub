import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Workspace, WorkspaceSchema } from './workspace.schema';
import { UserService } from 'src/users/users.service';
import { AdminRoleGuard } from 'src/Auth/Roles/adminRole.guard';
import { UsersModule } from 'src/users/users.module';

import { AuthModule } from 'src/Auth/auth.module';
import { Auth, AuthSchema } from 'src/Auth/auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      {
        name: Workspace.name,
        schema: WorkspaceSchema,
      },
    ]),
    UsersModule,
    forwardRef(() => AuthModule),
  ],
  providers: [WorkspaceService],
  controllers: [WorkspaceController],
})
export class WorkspaceModule {}

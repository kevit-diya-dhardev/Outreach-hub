import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Workspace, WorkspaceSchema } from './workspace.schema';
import { UserService } from 'src/users/users.service';
import { RolesGuard } from 'src/Auth/roles.guard';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from 'src/Auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Workspace.name,
        schema: WorkspaceSchema,
      },
    ]),
    UsersModule,
  ],
  providers: [WorkspaceService, RolesGuard],
  controllers: [WorkspaceController],
})
export class WorkspaceModule {}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { Workspace, WorkspaceSchema } from 'src/workspace/workspace.schema';
import { RolesGuard } from 'src/Auth/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      { name: Workspace.name, schema: WorkspaceSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, RolesGuard],
  exports: [UserService],
})
export class UsersModule {}

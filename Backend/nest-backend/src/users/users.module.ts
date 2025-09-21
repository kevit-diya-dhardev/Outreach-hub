import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { Workspace, WorkspaceSchema } from 'src/workspace/workspace.schema';
import { AuthGuard } from 'src/Auth/auth.guard';
import { AuthModule } from 'src/Auth/auth.module';
import { WorkspaceModule } from 'src/workspace/workspace.module';
import { Auth, AuthSchema } from 'src/Auth/auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      {
        name: User.name,
        schema: UserSchema,
      },
      { name: Workspace.name, schema: WorkspaceSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}

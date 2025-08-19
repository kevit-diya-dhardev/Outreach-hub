import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { Workspace, WorkspaceSchema } from 'src/workspace/workspace.schema';
import { IsAdminType } from 'src/Middlewares/admin.middleware';

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
  providers: [UserService],
})
// export class UsersModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(IsAdminType).forRoutes('users');
//   }
// }
export class UsersModule {}

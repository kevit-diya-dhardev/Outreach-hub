import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Workspace, WorkspaceSchema } from './workspace.schema';
import { IsAdminType } from 'src/Middlewares/admin.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Workspace.name,
        schema: WorkspaceSchema,
      },
    ]),
  ],
  providers: [WorkspaceService],
  controllers: [WorkspaceController],
})
export class WorkspaceModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsAdminType).forRoutes('workspace');
  }
}

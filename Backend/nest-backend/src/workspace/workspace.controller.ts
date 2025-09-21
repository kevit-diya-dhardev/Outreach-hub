import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { workspaceSchemaDto } from './dto/workspace.dto';
import { WorkspaceService } from './workspace.service';
import { updateWorkspaceDto } from './dto/updateWorkspace.schema.dto';
import { AuthGuard } from 'src/Auth/auth.guard';
import { AdminRoleGuard } from 'src/Auth/Roles/adminRole.guard';
import { Roles } from 'src/Auth/Roles/roles.decorator';

@UseGuards(AuthGuard, AdminRoleGuard)
@Controller('workspaces')
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}
  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard, AdminRoleGuard)
  async getWorkspaces(@Query('page') page: number) {
    const workspaces = await this.workspaceService.getWorkspaces(page);

    if (!workspaces) {
      throw new HttpException('Workspaces not found!', HttpStatus.NOT_FOUND);
    }
    return workspaces;
  }

  @Post()
  @Roles('admin')
  @UseGuards(AuthGuard, AdminRoleGuard)
  async createWorkspace(
    @Body() workspaceData: workspaceSchemaDto,
    @Req() request: any,
  ) {
    const workspace = await this.workspaceService.createWorkspace(
      workspaceData,
      request,
    );
    if (!workspace) {
      throw new ConflictException('Workspace with this id already exists!');
    }
    return workspace;
  }

  @Get('my-workspaces')
  @Roles('admin')
  @UseGuards(AuthGuard)
  async getMyWorkspaces(@Req() req: any, @Query('page') page: number) {
    return this.workspaceService.getMyWorkspaces(req, page).catch((error) => {
      console.log(error);
      throw new HttpException('Server error in workspace fetching', 500);
    });
  }

  @Get(':id')
  @UseGuards(AuthGuard, AdminRoleGuard)
  async getSingleWorkspace(@Param('id') id: String) {
    const workspace = await this.workspaceService.getSingleWorkspace(id);
    if (!workspace)
      throw new HttpException(
        "Workspace with this id doesn't exists!",
        HttpStatus.NOT_FOUND,
      );

    return workspace;
  }

  @Patch(':id')
  @Roles('admin')
  @UseGuards(AuthGuard, AdminRoleGuard)
  async updateWorkspace(
    @Param('id') id: String,
    @Body() workspaceData: updateWorkspaceDto,
  ) {
    const updatedWorkspace = await this.workspaceService.updateWorkspace(
      id,
      workspaceData,
    );
    if (!updateWorkspaceDto)
      throw new NotFoundException('No workspace found with this id!');

    return updatedWorkspace;
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard, AdminRoleGuard)
  async deleteWorkspace(@Param('id') id: string) {
    console.log('Controller ', id);
    const deletedWorkspace = await this.workspaceService.deleteWorkspace(id);
    if (!deletedWorkspace)
      throw new NotFoundException('Workspace with this id not found!');
    return deletedWorkspace;
  }
}

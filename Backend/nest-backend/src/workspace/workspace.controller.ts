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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { workspaceSchemaDto } from './dto/workspace.dto';
import { WorkspaceService } from './workspace.service';
import { updateWorkspaceDto } from './dto/updateWorkspace.schema.dto';
import { AuthGuard } from 'src/Auth/auth.guard';

@Controller('workspace')
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}
  @Get()
  @UsePipes(new ValidationPipe())
  async getWorkspaces() {
    const workspaces = await this.workspaceService.getWorkspaces();
    if (!workspaces) {
      throw new HttpException('Workspaces not found!', HttpStatus.NOT_FOUND);
    }
    return workspaces;
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createWorkspace(@Body() workspaceData: workspaceSchemaDto) {
    const workspace =
      await this.workspaceService.createWorkspace(workspaceData);
    if (!workspace) {
      throw new ConflictException('Workspace with this id already exists!');
    }
    return workspace;
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async getSingleWokspace(@Param('id') id: String) {
    const workspace = await this.workspaceService.getSingleWorkspace(id);
    if (!workspace)
      throw new HttpException(
        "Workspace with this id doesn't exists!",
        HttpStatus.NOT_FOUND,
      );

    return workspace;
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
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
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async deleteWorkspace(@Param('id') id: String) {
    const deletedWorkspace = await this.workspaceService.deleteWorkspace(id);
    if (!deletedWorkspace)
      throw new NotFoundException('Workspace with this id not found!');
    return deletedWorkspace;
  }
}

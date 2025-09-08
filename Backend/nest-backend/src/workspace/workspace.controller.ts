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
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { workspaceSchemaDto } from './dto/workspace.dto';
import { WorkspaceService } from './workspace.service';
import { updateWorkspaceDto } from './dto/updateWorkspace.schema.dto';
import { AuthGuard } from 'src/Auth/auth.guard';
import { RolesGuard } from 'src/Auth/roles.guard';
import { Roles } from 'src/Auth/roles.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Roles('admin')
@Controller('workspace')
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}
  @Get()
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
  @UseGuards(AuthGuard)
  async getMyWorkspaces(@Req() req: any) {
    return this.workspaceService.getMyWorkspaces(req).catch((error) => {
      console.log(error);
      throw new HttpException('Server error in workspace fetching', 500);
    });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
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
  async deleteWorkspace(@Param('id') id: String) {
    const deletedWorkspace = await this.workspaceService.deleteWorkspace(id);
    if (!deletedWorkspace)
      throw new NotFoundException('Workspace with this id not found!');
    return deletedWorkspace;
  }
}

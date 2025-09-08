import { Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Workspace } from './workspace.schema';
import { Model } from 'mongoose';
import { workspaceSchemaDto } from './dto/workspace.dto';
import { updateWorkspaceDto } from './dto/updateWorkspace.schema.dto';
import { Request } from 'express';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectModel(Workspace.name) private workspaceModel: Model<Workspace>,
  ) {}

  async createWorkspace(
    { workspace_id, ...workspaceData }: workspaceSchemaDto,
    req: any,
  ) {
    const exists = await this.workspaceModel.findOne({
      workspace_id: workspace_id,
    });
    if (exists) {
      return null;
    }
    const newWorkspace = new this.workspaceModel({
      workspace_id,
      ...workspaceData,
      createdBy: req.userData.id,
    });
    const savedWorkspace = await newWorkspace.save();
    return savedWorkspace;
  }

  async getWorkspaces() {
    const workspaces = await this.workspaceModel.find();
    if (workspaces.length < 1) return null;
    return workspaces;
  }

  async getSingleWorkspace(id: String) {
    const workspace = await this.workspaceModel.findOne({ workspace_id: id });
    if (!workspace) return null;
    return workspace;
  }

  async updateWorkspace(id: String, workspaceData: updateWorkspaceDto) {
    const updatedWorkspace = await this.workspaceModel.findOneAndUpdate(
      { workspace_id: id },
      workspaceData,
      { new: true },
    );
    if (!updateWorkspaceDto) return null;
    return updatedWorkspace;
  }

  async deleteWorkspace(id: String) {
    const findWorkspace = await this.workspaceModel.findOne({
      workspace_id: id,
    });
    if (!findWorkspace) return null;
    const deletedWorkspace = await this.workspaceModel.deleteOne({
      workspace_id: id,
    });
    return deletedWorkspace;
  }

  async getMyWorkspaces(req: any) {
    const workspaces = this.workspaceModel.find({ createdBy: req.userData.id });
    return workspaces;
  }
}

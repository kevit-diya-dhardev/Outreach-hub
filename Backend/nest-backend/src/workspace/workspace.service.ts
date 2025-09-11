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

  async createWorkspace({ ...workspaceData }: workspaceSchemaDto, req: any) {
    const newWorkspace = new this.workspaceModel({
      ...workspaceData,
      createdBy: req.userData.userId,
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
    const workspace = await this.workspaceModel.findOne({ _id: id });
    if (!workspace) return null;
    return workspace;
  }

  async updateWorkspace(id: String, workspaceData: updateWorkspaceDto) {
    const updatedWorkspace = await this.workspaceModel.findOneAndUpdate(
      { _id: id },
      workspaceData,
      { new: true },
    );
    if (!updateWorkspaceDto) return null;
    return updatedWorkspace;
  }

  async deleteWorkspace(id: String) {
    const findWorkspace = await this.workspaceModel.findOne({
      _id: id,
    });
    if (!findWorkspace) return null;
    const deletedWorkspace = await this.workspaceModel.deleteOne({
      _id: id,
    });
    return deletedWorkspace;
  }

  async getMyWorkspaces(req: any) {
    const workspaces = this.workspaceModel.find({
      createdBy: req.userData.userId,
    });
    return workspaces;
  }
}

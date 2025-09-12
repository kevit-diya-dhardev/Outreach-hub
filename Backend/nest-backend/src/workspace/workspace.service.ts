import { Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Workspace } from './workspace.schema';
import mongoose, { Model } from 'mongoose';
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

  async getWorkspaces(page: number) {
    const workspaces = await this.workspaceModel
      .find({})
      .limit(10)
      .skip((page - 1) * 10)
      .exec();
    const totalDocs = await this.workspaceModel.countDocuments();
    if (workspaces.length < 1) return null;
    return { workspaces: workspaces, totalPages: Math.ceil(totalDocs / 10) };
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

  async deleteWorkspace(id: string) {
    console.log(id);
    const findWorkspace = await this.workspaceModel.findOne({
      _id: id,
    });
    if (!findWorkspace) return null;
    const deletedWorkspace = await this.workspaceModel.deleteOne({
      _id: id,
    });
    return deletedWorkspace;
  }

  async getMyWorkspaces(req: any, page: number) {
    const workspaces = await this.workspaceModel
      .find({
        createdBy: req.userData.userId,
      })
      .limit(10)
      .skip((page - 1) * 10)
      .exec();
    const totalDocs = await this.workspaceModel.countDocuments();
    return { workspaces: workspaces, totalPages: Math.ceil(totalDocs / 10) };
  }
}

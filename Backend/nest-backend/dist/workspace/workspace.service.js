"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const workspace_schema_1 = require("./workspace.schema");
const mongoose_2 = require("mongoose");
const updateWorkspace_schema_dto_1 = require("./dto/updateWorkspace.schema.dto");
let WorkspaceService = class WorkspaceService {
    workspaceModel;
    constructor(workspaceModel) {
        this.workspaceModel = workspaceModel;
    }
    async createWorkspace({ ...workspaceData }, req) {
        const newWorkspace = new this.workspaceModel({
            ...workspaceData,
            createdBy: req.userData.userId,
        });
        const savedWorkspace = await newWorkspace.save();
        return savedWorkspace;
    }
    async getWorkspaces(page) {
        const workspaces = await this.workspaceModel
            .find({})
            .sort({ createdAt: -1 })
            .limit(10)
            .skip((page - 1) * 10)
            .exec();
        const totalDocs = await this.workspaceModel.countDocuments();
        if (workspaces.length < 1)
            return null;
        return {
            workspaces: workspaces,
            totalPages: Math.ceil(totalDocs / 10),
            totalDocs: totalDocs,
        };
    }
    async getSingleWorkspace(id) {
        const workspace = await this.workspaceModel.findOne({ _id: id });
        if (!workspace)
            return null;
        return workspace;
    }
    async updateWorkspace(id, workspaceData) {
        const updatedWorkspace = await this.workspaceModel.findOneAndUpdate({ _id: id }, workspaceData, { new: true });
        if (!updateWorkspace_schema_dto_1.updateWorkspaceDto)
            return null;
        return updatedWorkspace;
    }
    async deleteWorkspace(id) {
        console.log(id);
        const findWorkspace = await this.workspaceModel.findOne({
            _id: id,
        });
        if (!findWorkspace)
            return null;
        const deletedWorkspace = await this.workspaceModel.deleteOne({
            _id: id,
        });
        return deletedWorkspace;
    }
    async getMyWorkspaces(req, page) {
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
};
exports.WorkspaceService = WorkspaceService;
exports.WorkspaceService = WorkspaceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(workspace_schema_1.Workspace.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WorkspaceService);
//# sourceMappingURL=workspace.service.js.map
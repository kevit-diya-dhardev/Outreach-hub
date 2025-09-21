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
exports.WorkspaceController = void 0;
const common_1 = require("@nestjs/common");
const workspace_dto_1 = require("./dto/workspace.dto");
const workspace_service_1 = require("./workspace.service");
const updateWorkspace_schema_dto_1 = require("./dto/updateWorkspace.schema.dto");
const auth_guard_1 = require("../Auth/auth.guard");
const adminRole_guard_1 = require("../Auth/Roles/adminRole.guard");
const roles_decorator_1 = require("../Auth/Roles/roles.decorator");
let WorkspaceController = class WorkspaceController {
    workspaceService;
    constructor(workspaceService) {
        this.workspaceService = workspaceService;
    }
    async getWorkspaces(page) {
        const workspaces = await this.workspaceService.getWorkspaces(page);
        if (!workspaces) {
            throw new common_1.HttpException('Workspaces not found!', common_1.HttpStatus.NOT_FOUND);
        }
        return workspaces;
    }
    async createWorkspace(workspaceData, request) {
        const workspace = await this.workspaceService.createWorkspace(workspaceData, request);
        if (!workspace) {
            throw new common_1.ConflictException('Workspace with this id already exists!');
        }
        return workspace;
    }
    async getMyWorkspaces(req, page) {
        return this.workspaceService.getMyWorkspaces(req, page).catch((error) => {
            console.log(error);
            throw new common_1.HttpException('Server error in workspace fetching', 500);
        });
    }
    async getSingleWorkspace(id) {
        const workspace = await this.workspaceService.getSingleWorkspace(id);
        if (!workspace)
            throw new common_1.HttpException("Workspace with this id doesn't exists!", common_1.HttpStatus.NOT_FOUND);
        return workspace;
    }
    async updateWorkspace(id, workspaceData) {
        const updatedWorkspace = await this.workspaceService.updateWorkspace(id, workspaceData);
        if (!updateWorkspace_schema_dto_1.updateWorkspaceDto)
            throw new common_1.NotFoundException('No workspace found with this id!');
        return updatedWorkspace;
    }
    async deleteWorkspace(id) {
        console.log('Controller ', id);
        const deletedWorkspace = await this.workspaceService.deleteWorkspace(id);
        if (!deletedWorkspace)
            throw new common_1.NotFoundException('Workspace with this id not found!');
        return deletedWorkspace;
    }
};
exports.WorkspaceController = WorkspaceController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, adminRole_guard_1.AdminRoleGuard),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "getWorkspaces", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, adminRole_guard_1.AdminRoleGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [workspace_dto_1.workspaceSchemaDto, Object]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "createWorkspace", null);
__decorate([
    (0, common_1.Get)('my-workspaces'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "getMyWorkspaces", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, adminRole_guard_1.AdminRoleGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "getSingleWorkspace", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, adminRole_guard_1.AdminRoleGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        updateWorkspace_schema_dto_1.updateWorkspaceDto]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "updateWorkspace", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, adminRole_guard_1.AdminRoleGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "deleteWorkspace", null);
exports.WorkspaceController = WorkspaceController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, adminRole_guard_1.AdminRoleGuard),
    (0, common_1.Controller)('workspaces'),
    __metadata("design:paramtypes", [workspace_service_1.WorkspaceService])
], WorkspaceController);
//# sourceMappingURL=workspace.controller.js.map
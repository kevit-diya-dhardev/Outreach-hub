"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceModule = void 0;
const common_1 = require("@nestjs/common");
const workspace_controller_1 = require("./workspace.controller");
const workspace_service_1 = require("./workspace.service");
const mongoose_1 = require("@nestjs/mongoose");
const workspace_schema_1 = require("./workspace.schema");
const users_module_1 = require("../users/users.module");
const auth_module_1 = require("../Auth/auth.module");
const auth_schema_1 = require("../Auth/auth.schema");
let WorkspaceModule = class WorkspaceModule {
};
exports.WorkspaceModule = WorkspaceModule;
exports.WorkspaceModule = WorkspaceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: auth_schema_1.Auth.name, schema: auth_schema_1.AuthSchema },
                {
                    name: workspace_schema_1.Workspace.name,
                    schema: workspace_schema_1.WorkspaceSchema,
                },
            ]),
            users_module_1.UsersModule,
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
        ],
        providers: [workspace_service_1.WorkspaceService],
        controllers: [workspace_controller_1.WorkspaceController],
    })
], WorkspaceModule);
//# sourceMappingURL=workspace.module.js.map
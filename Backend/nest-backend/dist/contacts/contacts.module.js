"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const contacts_schema_1 = require("./contacts.schema");
const contacts_controller_1 = require("./contacts.controller");
const contacts_service_1 = require("./contacts.service");
const users_schema_1 = require("../users/users.schema");
const workspace_schema_1 = require("../workspace/workspace.schema");
const roles_guard_1 = require("../Auth/roles.guard");
const users_module_1 = require("../users/users.module");
let ContactsModule = class ContactsModule {
};
exports.ContactsModule = ContactsModule;
exports.ContactsModule = ContactsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: contacts_schema_1.Contacts.name, schema: contacts_schema_1.ContactSchema },
                { name: users_schema_1.User.name, schema: users_schema_1.UserSchema },
                { name: workspace_schema_1.Workspace.name, schema: workspace_schema_1.WorkspaceSchema },
            ]),
            users_module_1.UsersModule,
        ],
        providers: [contacts_service_1.ContactsService, roles_guard_1.RolesGuard],
        controllers: [contacts_controller_1.ContactsController],
    })
], ContactsModule);
//# sourceMappingURL=contacts.module.js.map
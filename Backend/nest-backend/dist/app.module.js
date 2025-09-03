"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const workspace_module_1 = require("./workspace/workspace.module");
const mongoose_1 = require("@nestjs/mongoose");
const users_module_1 = require("./users/users.module");
const contacts_module_1 = require("./contacts/contacts.module");
const auth_module_1 = require("./Auth/auth.module");
const messages_module_1 = require("./messages/messages.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://diyadhardev:mongodbprincess21@cluster0.rkza2ea.mongodb.net/Nest-Outreach-hub'),
            workspace_module_1.WorkspaceModule,
            users_module_1.UsersModule,
            contacts_module_1.ContactsModule,
            auth_module_1.AuthModule,
            messages_module_1.MessaegeModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_dto_1 = require("./dto/auth.dto");
const admin_auth_service_1 = require("./services/admin-auth.service");
const user_auth_service_1 = require("./services/user-auth.service");
let AuthController = class AuthController {
    adminAuthService;
    userAuthService;
    constructor(adminAuthService, userAuthService) {
        this.adminAuthService = adminAuthService;
        this.userAuthService = userAuthService;
    }
    async loginAdmin(userData) {
        return await this.adminAuthService.generateToken(userData);
    }
    async loginUser(userData) {
        return await this.userAuthService.generateToken(userData);
    }
    async logoutAdmin(req) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            return await this.adminAuthService.deleteTokenFromDb(token);
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('Token deleting error in logout', 500);
        }
    }
    async logoutUser(req) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            return await this.userAuthService.deleteTokenFromDb(token);
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('Token deleting error in logout', 500);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login/admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginAdmin", null);
__decorate([
    (0, common_1.Post)('login/user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Post)('logout/admin'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logoutAdmin", null);
__decorate([
    (0, common_1.Post)('logout/user'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logoutUser", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [admin_auth_service_1.AdminAuthService,
        user_auth_service_1.UserAuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
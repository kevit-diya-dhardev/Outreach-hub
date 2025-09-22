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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("./constants");
const mongoose_1 = require("@nestjs/mongoose");
const auth_schema_1 = require("./auth.schema");
const mongoose_2 = require("mongoose");
let AuthGuard = class AuthGuard {
    jwtService;
    authModel;
    constructor(jwtService, authModel) {
        this.jwtService = jwtService;
        this.authModel = authModel;
    }
    async canActivate(context) {
        console.log('Inside auth-guard!');
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            throw new common_1.UnauthorizedException('Authorization header missing');
        }
        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            throw new common_1.UnauthorizedException('Invalid authorization header format');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: constants_1.jwtConstants.secret,
            });
            req.userData = payload;
            const isTokenPresent = await this.checkForToken(token);
            if (isTokenPresent) {
                return true;
            }
            else {
                throw new common_1.UnauthorizedException();
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.UnauthorizedException();
        }
    }
    async checkForToken(token) {
        const existToken = await this.authModel.find({ token: token });
        return existToken.length > 0;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(auth_schema_1.Auth.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map
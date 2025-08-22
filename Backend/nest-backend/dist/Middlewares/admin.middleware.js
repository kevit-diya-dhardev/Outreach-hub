"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsAdminType = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
const jsonwebtoken_2 = __importDefault(require("jsonwebtoken"));
let IsAdminType = class IsAdminType {
    use(req, res, next) {
        console.log('Inside middleware!');
        if (!req.headers.authorization)
            throw new jsonwebtoken_1.JsonWebTokenError('Token not found!');
        const token = req.headers.authorization.split(' ')[1];
        const payload = jsonwebtoken_2.default.decode(token);
        if (!payload.isAdmin) {
            throw new common_1.UnauthorizedException('Access unauthorized!');
        }
        next();
    }
};
exports.IsAdminType = IsAdminType;
exports.IsAdminType = IsAdminType = __decorate([
    (0, common_1.Injectable)()
], IsAdminType);
//# sourceMappingURL=admin.middleware.js.map
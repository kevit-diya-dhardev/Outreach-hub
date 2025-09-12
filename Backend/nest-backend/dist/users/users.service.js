"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_schema_1 = require("./users.schema");
const mongoose_2 = require("mongoose");
const workspace_schema_1 = require("../workspace/workspace.schema");
const bcrypt = __importStar(require("bcrypt"));
let UserService = class UserService {
    userModel;
    workspaceModel;
    constructor(userModel, workspaceModel) {
        this.userModel = userModel;
        this.workspaceModel = workspaceModel;
    }
    async createUser({ password, ...userData }, req) {
        try {
            const hash = await bcrypt.hash(password, 10);
            const newUser = new this.userModel({
                password: hash,
                ...userData,
                createdBy: req.userData.userId,
            });
            return await newUser.save();
        }
        catch (err) {
            if (err.code === 11000) {
                throw new common_1.ConflictException('User with this email already exists in this workspace');
            }
            console.log(err);
            throw new common_1.HttpException('Internal server errro!', 501);
        }
    }
    async getUsers(page) {
        const findUsers = await this.userModel
            .find({})
            .limit(10)
            .skip((page - 1) * 10);
        const totalDocs = await this.workspaceModel.countDocuments();
        return { findUsers: findUsers, totalPages: Math.ceil(totalDocs / 10) };
    }
    async getSingleUser(id) {
        console.log('Inside user service method');
        const findUser = await this.userModel.findById(id);
        if (!findUser)
            throw new common_1.NotFoundException('User not found!');
        return findUser;
    }
    async updateUser(id, { password, ...userData }) {
        console.log(userData);
        if (password) {
            const hash = await bcrypt.hash(password, 10);
            await this.userModel.findByIdAndUpdate(id, { password: hash });
        }
        const updatedUser = await this.userModel.findByIdAndUpdate(id, { ...userData }, { new: true });
        if (!updatedUser)
            throw new common_1.NotFoundException('User not found!');
        return updatedUser;
    }
    async deleteUser(id) {
        const deletedUser = await this.userModel.findOneAndDelete({ _id: id });
        if (!deletedUser)
            throw new common_1.NotFoundException('User not found!');
        return deletedUser;
    }
    async getMyUsers(req, page) {
        const myUsers = await this.userModel
            .find({
            createdBy: req.userData.userId,
        })
            .limit(10)
            .skip((page - 1) * 10);
        const totalDocs = await this.workspaceModel.countDocuments();
        return { findUsers: myUsers, totalPages: Math.ceil(totalDocs / 10) };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(workspace_schema_1.Workspace.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UserService);
//# sourceMappingURL=users.service.js.map
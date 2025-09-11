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
exports.ContactsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const contacts_schema_1 = require("./contacts.schema");
const mongoose_2 = require("mongoose");
const users_schema_1 = require("../users/users.schema");
const workspace_schema_1 = require("../workspace/workspace.schema");
let ContactsService = class ContactsService {
    contactsModel;
    usersModel;
    workspaceModel;
    constructor(contactsModel, usersModel, workspaceModel) {
        this.contactsModel = contactsModel;
        this.usersModel = usersModel;
        this.workspaceModel = workspaceModel;
    }
    async createContact({ ...contactData }, req) {
        const findWorkspace = await this.workspaceModel.findOne({
            _id: contactData.workspace_id,
        });
        if (!findWorkspace)
            throw new common_1.NotFoundException("Workspace doesn't exists!");
        const findContact = await this.contactsModel.findOne({
            phoneNumber: contactData.phoneNumber,
        });
        if (findContact)
            throw new common_1.ConflictException('Contact already exists!');
        const newContact = await new this.contactsModel({
            ...contactData,
            createdBy: req.userData.userId,
            _id: req.userData.userId,
        });
        return await newContact.save();
    }
    async updateContact(id, contactData) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.NotFoundException("Contact does't exists!!");
        const newContact = this.contactsModel.findByIdAndUpdate(id, contactData, {
            new: true,
        });
        return newContact;
    }
    async deleteContact(id) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.NotFoundException("Contact does't exists!!");
        const findContact = await this.contactsModel.findById(id);
        return await this.contactsModel.deleteOne({ _id: id });
    }
    async getContacts() {
        return await this.contactsModel.find();
    }
    async getSingleContact(id) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.NotFoundException("Contact does't exists!!");
        const findContact = await this.contactsModel.findOne({ _id: id });
        if (!findContact)
            throw new common_1.NotFoundException("Contact does'nt exists!!");
        return findContact;
    }
};
exports.ContactsService = ContactsService;
exports.ContactsService = ContactsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(contacts_schema_1.Contacts.name)),
    __param(1, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(workspace_schema_1.Workspace.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ContactsService);
//# sourceMappingURL=contacts.service.js.map
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contacts } from './contacts.schema';
import { isValidObjectId, Model } from 'mongoose';
import { User } from 'src/users/users.schema';
import { Workspace } from 'src/workspace/workspace.schema';
import { ContactsDto } from './dto/contacts.dto';
import { find, NotFoundError } from 'rxjs';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contacts.name) private contactsModel: Model<Contacts>,
    @InjectModel(User.name) private usersModel: Model<User>,
    @InjectModel(Workspace.name) private workspaceModel: Model<Workspace>,
  ) {}

  async createContact(contactData: ContactsDto) {
    const findWorkspace = await this.workspaceModel.findOne({
      workspace_id: contactData.workspace_id,
    });
    if (!findWorkspace)
      throw new NotFoundException("Workspace doesn't exists!");
    const findContact = await this.contactsModel.findOne({
      phoneNumber: contactData.phoneNumber,
    });
    if (findContact) throw new ConflictException('Contact already exists!');
    const newContact = await new this.contactsModel(contactData);
    return await newContact.save();
  }

  async updateContact(id: String, contactData: ContactsDto) {
    if (!isValidObjectId(id))
      throw new NotFoundException("Contact does't exists!!");
    const newContact = this.contactsModel.findByIdAndUpdate(id, contactData, {
      new: true,
    });
    return newContact;
  }

  async deleteContact(id: String) {
    if (!isValidObjectId(id))
      throw new NotFoundException("Contact does't exists!!");
    const findContact = await this.contactsModel.findById(id);
    return await this.contactsModel.deleteOne({ _id: id });
  }

  async getContacts() {
    return await this.contactsModel.find();
  }

  async getSingleContact(id: String) {
    if (!isValidObjectId(id))
      throw new NotFoundException("Contact does't exists!!");
    const findContact = await this.contactsModel.findOne({ _id: id });
    if (!findContact) throw new NotFoundException("Contact does'nt exists!!");
    return findContact;
  }
}

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
  allcnt: any = 0;
  mycnt: any = 0;
  constructor(
    @InjectModel(Contacts.name) private contactsModel: Model<Contacts>,
    @InjectModel(User.name) private usersModel: Model<User>,
    @InjectModel(Workspace.name) private workspaceModel: Model<Workspace>,
  ) {}

  async createContact({ ...contactData }: ContactsDto, req: any) {
    const findWorkspace = await this.workspaceModel.findOne({
      _id: contactData.workspace_id,
    });
    if (!findWorkspace)
      throw new NotFoundException("Workspace doesn't exists!");
    const findContact = await this.contactsModel.findOne({
      phoneNumber: contactData.phoneNumber,
    });
    if (findContact) throw new ConflictException('Contact already exists!');
    const newContact = await new this.contactsModel({
      ...contactData,
      createdBy: req.userData.userId,
    });
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

  async getContacts(page: number, workspace_id: string) {
    const contacts = await this.contactsModel
      .find({ workspace_id: workspace_id })
      .populate('workspace_id')
      .limit(10)
      .skip(page * 10);

    const totalDocs = await this.contactsModel.countDocuments();

    return { contacts: contacts, totalPages: Math.ceil(totalDocs / 10) };
  }

  async getSingleContact(contact_id: String) {
    if (!isValidObjectId(contact_id))
      throw new NotFoundException("Contact does't exists!!");
    const findContact = await this.contactsModel.findOne({ _id: contact_id });
    if (!findContact) throw new NotFoundException("Contact does'nt exists!!");
    return findContact;
  }
}

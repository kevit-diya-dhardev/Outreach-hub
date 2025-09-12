import { Contacts } from './contacts.schema';
import { Model } from 'mongoose';
import { User } from 'src/users/users.schema';
import { Workspace } from 'src/workspace/workspace.schema';
import { ContactsDto } from './dto/contacts.dto';
export declare class ContactsService {
    private contactsModel;
    private usersModel;
    private workspaceModel;
    allcnt: any;
    mycnt: any;
    constructor(contactsModel: Model<Contacts>, usersModel: Model<User>, workspaceModel: Model<Workspace>);
    createContact({ ...contactData }: ContactsDto, req: any): Promise<import("mongoose").Document<unknown, {}, Contacts, {}, {}> & Contacts & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateContact(id: String, contactData: ContactsDto): Promise<(import("mongoose").Document<unknown, {}, Contacts, {}, {}> & Contacts & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteContact(id: String): Promise<import("mongodb").DeleteResult>;
    getContacts(page: number): Promise<{
        contacts: (import("mongoose").Document<unknown, {}, Contacts, {}, {}> & Contacts & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        totalPages: number;
    }>;
    getSingleContact(id: String): Promise<import("mongoose").Document<unknown, {}, Contacts, {}, {}> & Contacts & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}

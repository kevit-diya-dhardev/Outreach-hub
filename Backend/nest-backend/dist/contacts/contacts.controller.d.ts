import { ContactsService } from './contacts.service';
import { ContactsDto } from './dto/contacts.dto';
export declare class ContactsController {
    private contactService;
    constructor(contactService: ContactsService);
    createContact(contactData: ContactsDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("./contacts.schema").Contacts, {}, {}> & import("./contacts.schema").Contacts & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getContacts(workspace_id: string, page: number): Promise<{
        contacts: (import("mongoose").Document<unknown, {}, import("./contacts.schema").Contacts, {}, {}> & import("./contacts.schema").Contacts & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        totalPages: number;
    }>;
    getSingleContact(contact_id: String): Promise<import("mongoose").Document<unknown, {}, import("./contacts.schema").Contacts, {}, {}> & import("./contacts.schema").Contacts & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateContact(id: String, contactData: ContactsDto): Promise<(import("mongoose").Document<unknown, {}, import("./contacts.schema").Contacts, {}, {}> & import("./contacts.schema").Contacts & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteContact(id: String): Promise<import("mongodb").DeleteResult>;
}

export declare class Contacts {
    contact_name: String;
    phoneNumber: Number;
    tags: String[];
    workspace_id: String;
    createdBy: String;
}
export declare const ContactSchema: import("mongoose").Schema<Contacts, import("mongoose").Model<Contacts, any, any, any, import("mongoose").Document<unknown, any, Contacts, any, {}> & Contacts & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Contacts, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Contacts>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Contacts> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;

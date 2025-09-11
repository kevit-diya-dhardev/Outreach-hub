export declare class Workspace {
    workspace_name: String;
    description: String;
    createdAt: String;
    createdBy: String;
}
export declare const WorkspaceSchema: import("mongoose").Schema<Workspace, import("mongoose").Model<Workspace, any, any, any, import("mongoose").Document<unknown, any, Workspace, any, {}> & Workspace & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Workspace, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Workspace>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Workspace> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;

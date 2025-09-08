import { Workspace } from './workspace.schema';
import { Model } from 'mongoose';
import { workspaceSchemaDto } from './dto/workspace.dto';
import { updateWorkspaceDto } from './dto/updateWorkspace.schema.dto';
export declare class WorkspaceService {
    private workspaceModel;
    constructor(workspaceModel: Model<Workspace>);
    createWorkspace({ workspace_id, ...workspaceData }: workspaceSchemaDto, req: any): Promise<(import("mongoose").Document<unknown, {}, Workspace, {}, {}> & Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    getWorkspaces(): Promise<(import("mongoose").Document<unknown, {}, Workspace, {}, {}> & Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[] | null>;
    getSingleWorkspace(id: String): Promise<(import("mongoose").Document<unknown, {}, Workspace, {}, {}> & Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateWorkspace(id: String, workspaceData: updateWorkspaceDto): Promise<(import("mongoose").Document<unknown, {}, Workspace, {}, {}> & Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteWorkspace(id: String): Promise<import("mongodb").DeleteResult | null>;
    getMyWorkspaces(req: any): Promise<(import("mongoose").Document<unknown, {}, Workspace, {}, {}> & Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
}

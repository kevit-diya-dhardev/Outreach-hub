import { Workspace } from './workspace.schema';
import mongoose, { Model } from 'mongoose';
import { workspaceSchemaDto } from './dto/workspace.dto';
import { updateWorkspaceDto } from './dto/updateWorkspace.schema.dto';
export declare class WorkspaceService {
    private workspaceModel;
    constructor(workspaceModel: Model<Workspace>);
    createWorkspace({ ...workspaceData }: workspaceSchemaDto, req: any): Promise<mongoose.Document<unknown, {}, Workspace, {}, {}> & Workspace & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    getWorkspaces(page: number): Promise<{
        workspaces: (mongoose.Document<unknown, {}, Workspace, {}, {}> & Workspace & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        })[];
        totalPages: number;
        totalDocs: number;
    } | null>;
    getSingleWorkspace(id: String): Promise<(mongoose.Document<unknown, {}, Workspace, {}, {}> & Workspace & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateWorkspace(id: String, workspaceData: updateWorkspaceDto): Promise<(mongoose.Document<unknown, {}, Workspace, {}, {}> & Workspace & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteWorkspace(id: string): Promise<mongoose.mongo.DeleteResult | null>;
    getMyWorkspaces(req: any, page: number): Promise<{
        workspaces: (mongoose.Document<unknown, {}, Workspace, {}, {}> & Workspace & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        })[];
        totalPages: number;
    }>;
}

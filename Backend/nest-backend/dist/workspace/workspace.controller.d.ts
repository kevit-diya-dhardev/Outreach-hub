import { workspaceSchemaDto } from './dto/workspace.dto';
import { WorkspaceService } from './workspace.service';
import { updateWorkspaceDto } from './dto/updateWorkspace.schema.dto';
export declare class WorkspaceController {
    private workspaceService;
    constructor(workspaceService: WorkspaceService);
    getWorkspaces(page: number): Promise<{
        workspaces: (import("mongoose").Document<unknown, {}, import("./workspace.schema").Workspace, {}, {}> & import("./workspace.schema").Workspace & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        totalPages: number;
        totalDocs: number;
    }>;
    createWorkspace(workspaceData: workspaceSchemaDto, request: any): Promise<import("mongoose").Document<unknown, {}, import("./workspace.schema").Workspace, {}, {}> & import("./workspace.schema").Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getMyWorkspaces(req: any, page: number): Promise<{
        workspaces: (import("mongoose").Document<unknown, {}, import("./workspace.schema").Workspace, {}, {}> & import("./workspace.schema").Workspace & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        totalPages: number;
    }>;
    getSingleWorkspace(id: String): Promise<import("mongoose").Document<unknown, {}, import("./workspace.schema").Workspace, {}, {}> & import("./workspace.schema").Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateWorkspace(id: String, workspaceData: updateWorkspaceDto): Promise<(import("mongoose").Document<unknown, {}, import("./workspace.schema").Workspace, {}, {}> & import("./workspace.schema").Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteWorkspace(id: string): Promise<import("mongodb").DeleteResult>;
}

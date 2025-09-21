import { User } from './users.schema';
import { Model } from 'mongoose';
import { Workspace } from 'src/workspace/workspace.schema';
import { updateUserDto, userDto } from './dto/user.dto';
export declare class UserService {
    private userModel;
    private workspaceModel;
    constructor(userModel: Model<User>, workspaceModel: Model<Workspace>);
    createUser({ password, ...userData }: userDto, req: any): Promise<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    getUsers(page: number): Promise<{
        findUsers: (import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        totalPages: number;
        totalDocs: number;
    }>;
    getSingleUser(id: String): Promise<import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateUser(id: String, { password, ...userData }: updateUserDto): Promise<import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteUser(id: String): Promise<import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getMyUsers(req: any, page: number): Promise<{
        findUsers: (import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        totalPages: number;
    }>;
    getWorkspaceUsers(workspace_id: string): Promise<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
}

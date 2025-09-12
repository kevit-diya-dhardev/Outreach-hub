import { updateUserDto, userDto } from './dto/user.dto';
import { UserService } from './users.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createUser(userData: userDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("./users.schema").User, {}, {}> & import("./users.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getUsers(page: number): Promise<{
        findUsers: (import("mongoose").Document<unknown, {}, import("./users.schema").User, {}, {}> & import("./users.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        totalPages: number;
    }>;
    getMyUsers(req: any, page: number): Promise<{
        findUsers: (import("mongoose").Document<unknown, {}, import("./users.schema").User, {}, {}> & import("./users.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        totalPages: number;
    }>;
    getSingleUser(id: String): Promise<import("mongoose").Document<unknown, {}, import("./users.schema").User, {}, {}> & import("./users.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateUser(id: String, userData: updateUserDto): Promise<import("mongoose").Document<unknown, {}, import("./users.schema").User, {}, {}> & import("./users.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteUser(id: String): Promise<import("mongoose").Document<unknown, {}, import("./users.schema").User, {}, {}> & import("./users.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}

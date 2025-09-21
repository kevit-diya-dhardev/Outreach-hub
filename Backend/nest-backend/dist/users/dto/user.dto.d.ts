import mongoose from 'mongoose';
export declare class userDto {
    name: String;
    email: String;
    password: String;
    workspace_id: mongoose.Types.ObjectId;
    role: String;
    isAdmin: boolean;
}
export declare class updateUserDto {
    name: String;
    email: String;
    password: String;
    workspace: Object;
}

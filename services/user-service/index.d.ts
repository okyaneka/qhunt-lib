import { UserListParams, UserPayload, UserPublicPayload, S3Payload, UserProvider, UserLoginPayload, UserForeignFull, UserPasswordPayload } from "../..";
import { ClientSession } from "mongoose";
import { User as FirebaseUser } from "firebase/auth";
export declare const register: (payload: UserPayload, TID: string) => Promise<import("../..").User & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const googleSign: (payload: FirebaseUser, TID: string) => Promise<(import("../..").User & {
    _id: import("mongoose").Types.ObjectId;
}) | undefined>;
export declare const login: (payload: UserLoginPayload, provider: UserProvider, secret: string) => Promise<{
    id: import("mongoose").Types.ObjectId;
    name: string;
    email: string;
    TID: string;
    token: string;
}>;
export declare const profile: (bearer: string) => Promise<void>;
export declare const list: (params: UserListParams) => Promise<void>;
export declare const create: (payload: UserPayload) => Promise<void>;
export declare const detail: (id: string, session?: ClientSession) => Promise<UserForeignFull>;
export declare const update: (id: string, payload: UserPublicPayload) => Promise<import("../..").UserPublic & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const updatePassword: (id: string, payload: UserPasswordPayload) => Promise<{}>;
export declare const updatePhoto: (userId: string, payload: S3Payload) => Promise<import("../..").UserPublic & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const _delete: (id: string) => Promise<void>;
export declare const dataSync: (TID: string, session?: ClientSession) => Promise<void>;
declare const UserService: {
    register: (payload: UserPayload, TID: string) => Promise<import("../..").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    googleSign: (payload: FirebaseUser, TID: string) => Promise<(import("../..").User & {
        _id: import("mongoose").Types.ObjectId;
    }) | undefined>;
    login: (payload: UserLoginPayload, provider: UserProvider, secret: string) => Promise<{
        id: import("mongoose").Types.ObjectId;
        name: string;
        email: string;
        TID: string;
        token: string;
    }>;
    profile: (bearer: string) => Promise<void>;
    list: (params: UserListParams) => Promise<void>;
    create: (payload: UserPayload) => Promise<void>;
    detail: (id: string, session?: ClientSession) => Promise<UserForeignFull>;
    update: (id: string, payload: UserPublicPayload) => Promise<import("../..").UserPublic & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updatePassword: (id: string, payload: UserPasswordPayload) => Promise<{}>;
    updatePhoto: (userId: string, payload: S3Payload) => Promise<import("../..").UserPublic & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete: (id: string) => Promise<void>;
};
export default UserService;
//# sourceMappingURL=index.d.ts.map
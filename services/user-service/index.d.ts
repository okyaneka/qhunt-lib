import { UserListParams, UserPayload, UserPublicPayload, UserRole, S3Payload } from "../..";
import { ClientSession } from "mongoose";
export declare const register: (payload: UserPayload, TID: string) => Promise<import("../..").User & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const login: (payload: Omit<UserPayload, "name">, secret: string) => Promise<{
    id: import("mongoose").Types.ObjectId;
    name: string;
    email: string;
    TID: string;
    token: string;
}>;
export declare const profile: (bearer: string) => Promise<void>;
export declare const list: (params: UserListParams) => Promise<void>;
export declare const create: (payload: UserPayload) => Promise<void>;
export declare const detail: (id: string, session?: ClientSession) => Promise<{
    meta: import("../..").UserPublic & {
        _id: import("mongoose").Types.ObjectId;
    };
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const update: (id: string, payload: UserPublicPayload) => Promise<import("../..").UserPublic & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const updatePhoto: (payload: S3Payload, userId: string) => Promise<import("mongoose").Document<unknown, {}, import("../..").UserPublic> & import("../..").UserPublic & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const _delete: (id: string) => Promise<void>;
export declare const dataSync: (TID: string, session?: ClientSession) => Promise<void>;
declare const UserService: {
    register: (payload: UserPayload, TID: string) => Promise<import("../..").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    login: (payload: Omit<UserPayload, "name">, secret: string) => Promise<{
        id: import("mongoose").Types.ObjectId;
        name: string;
        email: string;
        TID: string;
        token: string;
    }>;
    profile: (bearer: string) => Promise<void>;
    list: (params: UserListParams) => Promise<void>;
    create: (payload: UserPayload) => Promise<void>;
    detail: (id: string, session?: ClientSession) => Promise<{
        meta: import("../..").UserPublic & {
            _id: import("mongoose").Types.ObjectId;
        };
        id: string;
        name: string;
        email: string;
        password: string;
        role: UserRole;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        _id: import("mongoose").Types.ObjectId;
    }>;
    update: (id: string, payload: UserPublicPayload) => Promise<import("../..").UserPublic & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updatePhoto: (payload: S3Payload, userId: string) => Promise<import("mongoose").Document<unknown, {}, import("../..").UserPublic> & import("../..").UserPublic & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    delete: (id: string) => Promise<void>;
};
export default UserService;
//# sourceMappingURL=index.d.ts.map
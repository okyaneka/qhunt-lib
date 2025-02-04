import { UserListParams, UserPayload, UserRole } from "../../types";
export declare const register: (payload: UserPayload, code?: string) => Promise<import("mongoose").Document<unknown, {}, import("../../types").User> & import("../../types").User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const login: (payload: UserPayload, secret: string) => Promise<{
    id: import("mongoose").Types.ObjectId;
    name: string;
    email: string;
    TID: string;
    token: string;
}>;
export declare const profile: (bearer: string) => Promise<void>;
export declare const list: (params: UserListParams) => Promise<void>;
export declare const create: (payload: UserPayload) => Promise<void>;
export declare const detail: (id: string) => Promise<{
    meta: import("../../types").UserPublic & {
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
export declare const update: (id: string, payload: UserPayload) => Promise<void>;
export declare const _delete: (id: string) => Promise<void>;
declare const UserService: {
    register: (payload: UserPayload, code?: string) => Promise<import("mongoose").Document<unknown, {}, import("../../types").User> & import("../../types").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    login: (payload: UserPayload, secret: string) => Promise<{
        id: import("mongoose").Types.ObjectId;
        name: string;
        email: string;
        TID: string;
        token: string;
    }>;
    profile: (bearer: string) => Promise<void>;
    list: (params: UserListParams) => Promise<void>;
    create: (payload: UserPayload) => Promise<void>;
    detail: (id: string) => Promise<{
        meta: import("../../types").UserPublic & {
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
    update: (id: string, payload: UserPayload) => Promise<void>;
    delete: (id: string) => Promise<void>;
};
export default UserService;
//# sourceMappingURL=index.d.ts.map
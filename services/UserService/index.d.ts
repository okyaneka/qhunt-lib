import { UserListQuery, UserPayload } from "~/models/UserModel";
export declare const register: (payload: UserPayload, code?: string) => Promise<any>;
export declare const login: (payload: UserPayload, secret: string) => Promise<{
    id: any;
    name: any;
    email: string;
    TID: string;
    token: string;
}>;
export declare const profile: (bearer: string) => Promise<void>;
export declare const list: (params: UserListQuery) => Promise<void>;
export declare const create: (payload: UserPayload) => Promise<void>;
export declare const detail: (id: string) => Promise<any>;
export declare const update: (id: string, payload: UserPayload) => Promise<void>;
export declare const _delete: (id: string) => Promise<void>;
declare const UserService: {
    register: (payload: UserPayload, code?: string) => Promise<any>;
    login: (payload: UserPayload, secret: string) => Promise<{
        id: any;
        name: any;
        email: string;
        TID: string;
        token: string;
    }>;
    profile: (bearer: string) => Promise<void>;
    list: (params: UserListQuery) => Promise<void>;
    create: (payload: UserPayload) => Promise<void>;
    detail: (id: string) => Promise<any>;
    update: (id: string, payload: UserPayload) => Promise<void>;
    delete: (id: string) => Promise<void>;
};
export default UserService;
//# sourceMappingURL=index.d.ts.map
import { Timestamps, DefaultListParams } from "../../helpers/types";
export declare enum UserRole {
    Admin = "admin",
    Private = "private",
    Public = "public"
}
export interface UserListParams extends DefaultListParams {
    role: UserRole | null;
}
export interface UserPayload {
    email: string;
    password: string;
}
export interface UserForeign {
    id: string;
    name: string;
}
export interface User extends Timestamps {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
}
//# sourceMappingURL=index.d.ts.map
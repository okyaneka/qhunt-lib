import { DefaultListParams } from "~/validators";
import { Timestamps } from "~/helpers";
export declare enum UserRole {
    Admin = "admin",
    Private = "private",
    Public = "public"
}
export interface UserListQuery extends DefaultListParams {
    role: UserRole | null;
}
export interface UserPayload {
    email: string;
    password: string;
}
export interface User extends Timestamps {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
}
//# sourceMappingURL=types.d.ts.map
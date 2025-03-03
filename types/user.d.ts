import { Timestamps, DefaultListParams, S3Foreign, ValueOf } from "..";
import { USER_PROVIDERS, USER_ROLES } from "../constants";
export type UserProvider = ValueOf<typeof USER_PROVIDERS>;
export type UserRole = ValueOf<typeof USER_ROLES>;
export interface UserListParams extends DefaultListParams {
    role: UserRole | null;
}
export interface UserPayload {
    name: string;
    email: string;
    password: string;
}
export interface UserPasswordPayload {
    old_password: string | null;
    new_password: string;
    confirm_password: string;
}
export type UserLoginPayload = Pick<User, "email" | "password">;
export type UserForeign = Pick<User, "id" | "name" | "email"> & {
    photo: string | null;
};
export type UserForeignFull = Pick<User, "id" | "name" | "email" | "photo" | "provider" | "role">;
export type Auth = Pick<User, "id" | "name" | "email"> & {
    token: string;
};
export interface User extends Timestamps {
    id: string;
    name: string;
    email: string;
    password: string | null;
    provider: UserProvider[];
    photo: S3Foreign | null;
    role: UserRole;
}
//# sourceMappingURL=user.d.ts.map
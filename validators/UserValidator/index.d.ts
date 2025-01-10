import { UserListQuery, UserPayload } from "~/models/UserModel";
export declare const UserPayloadValidator: import("joi").ObjectSchema<UserPayload>;
export declare const UserListQueryValidator: import("joi").ObjectSchema<UserListQuery>;
declare const UserValidator: {
    UserPayloadValidator: import("joi").ObjectSchema<UserPayload>;
    UserListQueryValidator: import("joi").ObjectSchema<UserListQuery>;
};
export default UserValidator;
//# sourceMappingURL=index.d.ts.map
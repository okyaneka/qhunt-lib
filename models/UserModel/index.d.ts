import { Model, Schema } from "mongoose";
import { User, UserForeign } from "./types";
export declare const UserForeignSchema: Schema<UserForeign, Model<UserForeign, any, any, any, import("mongoose").Document<unknown, any, UserForeign> & UserForeign & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserForeign, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UserForeign>> & import("mongoose").FlatRecord<UserForeign> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export * from "./types";
declare const UserModel: Model<User, {}, {}, {}, import("mongoose").Document<unknown, {}, User> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default UserModel;
//# sourceMappingURL=index.d.ts.map
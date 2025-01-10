import { Model, Schema } from "mongoose";
import { UserPublic, UserPublicForeign } from "./types";
export declare const UserPublicForeignSchema: Schema<UserPublicForeign, Model<UserPublicForeign, any, any, any, import("mongoose").Document<unknown, any, UserPublicForeign> & UserPublicForeign & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserPublicForeign, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UserPublicForeign>> & import("mongoose").FlatRecord<UserPublicForeign> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export * from "./types";
declare const UserPublicModel: Model<UserPublic, {}, {}, {}, import("mongoose").Document<unknown, {}, UserPublic> & UserPublic & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default UserPublicModel;
//# sourceMappingURL=index.d.ts.map
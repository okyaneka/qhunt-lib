import { Model, Schema } from "mongoose";
import { UserStage, UserStageForeign } from "./types";
export declare const UserStageForeignSchema: Schema<UserStageForeign, Model<UserStageForeign, any, any, any, import("mongoose").Document<unknown, any, UserStageForeign> & UserStageForeign & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserStageForeign, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UserStageForeign>> & import("mongoose").FlatRecord<UserStageForeign> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export * from "./types";
declare const UserStageModel: Model<UserStage, {}, {}, {}, import("mongoose").Document<unknown, {}, UserStage> & UserStage & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default UserStageModel;
//# sourceMappingURL=index.d.ts.map
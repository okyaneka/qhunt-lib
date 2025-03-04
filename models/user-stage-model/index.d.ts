import { Model, Schema } from "mongoose";
import { UserStage, UserStageForeign, UserStageResult } from "../../index";
export declare const UserStageForeignSchema: Schema<UserStageForeign, Model<UserStageForeign, any, any, any, import("mongoose").Document<unknown, any, UserStageForeign> & UserStageForeign & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserStageForeign, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UserStageForeign>> & import("mongoose").FlatRecord<UserStageForeign> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const UserStageResultSchema: Schema<UserStageResult, Model<UserStageResult, any, any, any, import("mongoose").Document<unknown, any, UserStageResult> & UserStageResult & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserStageResult, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UserStageResult>> & import("mongoose").FlatRecord<UserStageResult> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
declare const UserStageModel: Model<UserStage, {}, {}, {}, import("mongoose").Document<unknown, {}, UserStage> & UserStage & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default UserStageModel;
//# sourceMappingURL=index.d.ts.map
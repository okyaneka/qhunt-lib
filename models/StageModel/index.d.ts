import { Stage, StageForeign, StageSettingsForeign } from "./types";
import { Model, Schema } from "mongoose";
export declare const StageSettingsForeignSchema: Schema<StageSettingsForeign, Model<StageSettingsForeign, any, any, any, import("mongoose").Document<unknown, any, StageSettingsForeign> & StageSettingsForeign & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, StageSettingsForeign, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<StageSettingsForeign>> & import("mongoose").FlatRecord<StageSettingsForeign> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const StageForeignSchema: Schema<StageForeign, Model<StageForeign, any, any, any, import("mongoose").Document<unknown, any, StageForeign> & Pick<Stage, "id" | "name" | "storyline"> & {
    settings: StageSettingsForeign;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, StageForeign, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<StageForeign>> & import("mongoose").FlatRecord<StageForeign> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export * from "./types";
declare const StageModel: Model<Stage, {}, {}, {}, import("mongoose").Document<unknown, {}, Stage> & Stage & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default StageModel;
//# sourceMappingURL=index.d.ts.map
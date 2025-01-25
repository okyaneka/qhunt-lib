import { Model, Schema } from "mongoose";
import { Challenge, ChallengeFeedback, ChallengeForeign, ChallengeSettingsForeign } from "./types";
export declare const ChallengeFeedbackSchema: Schema<ChallengeFeedback, Model<ChallengeFeedback, any, any, any, import("mongoose").Document<unknown, any, ChallengeFeedback> & ChallengeFeedback & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ChallengeFeedback, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ChallengeFeedback>> & import("mongoose").FlatRecord<ChallengeFeedback> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const ChallengeSettingsForeignSchema: Schema<ChallengeSettingsForeign, Model<ChallengeSettingsForeign, any, any, any, import("mongoose").Document<unknown, any, ChallengeSettingsForeign> & ChallengeSettingsForeign & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ChallengeSettingsForeign, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ChallengeSettingsForeign>> & import("mongoose").FlatRecord<ChallengeSettingsForeign> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const ChallengeForeignSchema: Schema<ChallengeForeign, Model<ChallengeForeign, any, any, any, import("mongoose").Document<unknown, any, ChallengeForeign> & ChallengeForeign & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ChallengeForeign, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ChallengeForeign>> & import("mongoose").FlatRecord<ChallengeForeign> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export * from "./types";
declare const ChallengeModel: Model<Challenge, {}, {}, {}, import("mongoose").Document<unknown, {}, Challenge> & Challenge & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default ChallengeModel;
//# sourceMappingURL=index.d.ts.map
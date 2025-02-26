import { Model, Schema } from "mongoose";
import { UserChallenge, UserChallengeForeign, UserChallengeResult } from "../..";
export declare const UserChallengeForeignSchema: Schema<UserChallengeForeign, Model<UserChallengeForeign, any, any, any, import("mongoose").Document<unknown, any, UserChallengeForeign> & UserChallengeForeign & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserChallengeForeign, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UserChallengeForeign>> & import("mongoose").FlatRecord<UserChallengeForeign> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const UserChallengeResultSchema: Schema<UserChallengeResult, Model<UserChallengeResult, any, any, any, import("mongoose").Document<unknown, any, UserChallengeResult> & UserChallengeResult & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserChallengeResult, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UserChallengeResult>> & import("mongoose").FlatRecord<UserChallengeResult> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
declare const UserChallengeModel: Model<UserChallenge, {}, {}, {}, import("mongoose").Document<unknown, {}, UserChallenge> & UserChallenge & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default UserChallengeModel;
//# sourceMappingURL=index.d.ts.map
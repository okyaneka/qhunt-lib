import ChallengeModel from "./ChallengeModel";
import QrModel from "./QrModel";
import StageModel from "./StageModel";
import TriviaModel from "./TriviaModel";
import UserModel from "./UserModel";
import UserChallengeModel from "./UserChallengeModel";
import UserPublicModel from "./UserPublicModel";
import UserStageModel from "./UserStageModel";
import UserTriviaModel from "./UserTriviaModel";
declare const models: {
    readonly ChallengeModel: import("mongoose").Model<import("./ChallengeModel").Challenge, {}, {}, {}, import("mongoose").Document<unknown, {}, import("./ChallengeModel").Challenge> & import("./ChallengeModel").Challenge & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    readonly QrModel: import("mongoose").Model<import("./QrModel").Qr, {}, {}, {}, import("mongoose").Document<unknown, {}, import("./QrModel").Qr> & import("./QrModel").Qr & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    readonly StageModel: import("mongoose").Model<import("./StageModel").Stage, {}, {}, {}, import("mongoose").Document<unknown, {}, import("./StageModel").Stage> & import("./StageModel").Stage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    readonly TriviaModel: import("mongoose").Model<any, {}, {}, {}, any, any>;
    readonly UserModel: import("mongoose").Model<any, {}, {}, {}, any, any>;
    readonly UserChallengeModel: import("mongoose").Model<import("./UserChallengeModel").UserChallenge, {}, {}, {}, import("mongoose").Document<unknown, {}, import("./UserChallengeModel").UserChallenge> & import("./UserChallengeModel").UserChallenge & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    readonly UserPublicModel: import("mongoose").Model<import("./UserPublicModel").UserPublic, {}, {}, {}, import("mongoose").Document<unknown, {}, import("./UserPublicModel").UserPublic> & import("./UserPublicModel").UserPublic & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    readonly UserStageModel: import("mongoose").Model<import("./UserStageModel").UserStage, {}, {}, {}, import("mongoose").Document<unknown, {}, import("./UserStageModel").UserStage> & import("./UserStageModel").UserStage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    readonly UserTriviaModel: import("mongoose").Model<import("./UserTriviaModel").UserTrivia, {}, {}, {}, import("mongoose").Document<unknown, {}, import("./UserTriviaModel").UserTrivia> & import("./UserTriviaModel").UserTrivia & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
};
export { ChallengeModel, QrModel, StageModel, TriviaModel, UserModel, UserChallengeModel, UserPublicModel, UserStageModel, UserTriviaModel, };
export default models;
//# sourceMappingURL=index.d.ts.map
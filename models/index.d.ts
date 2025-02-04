import ChallengeModel from "./challenge";
import QrModel from "./qr";
import StageModel from "./stage";
import TriviaModel from "./trivia";
import UserModel from "./user";
import UserChallengeModel from "./user-challenge";
import UserPublicModel from "./user-public";
import UserStageModel from "./user-stage";
import UserTriviaModel from "./user-trivia";
import PhotoHuntModel from "./photo-hunt";
declare const models: {
    readonly ChallengeModel: import("mongoose").Model<import("..").Challenge, {}, {}, {}, import("mongoose").Document<unknown, {}, import("..").Challenge> & import("..").Challenge & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    readonly QrModel: import("mongoose").Model<import("..").Qr, {}, {}, {}, import("mongoose").Document<unknown, {}, import("..").Qr> & import("..").Qr & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    readonly StageModel: import("mongoose").Model<import("..").Stage, {}, {}, {}, import("mongoose").Document<unknown, {}, import("..").Stage> & import("..").Stage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    readonly TriviaModel: import("mongoose").Model<import("..").Trivia, {}, {}, {}, import("mongoose").Document<unknown, {}, import("..").Trivia> & import("..").Trivia & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    readonly PhotoHuntModel: import("mongoose").Model<import("..").PhotoHunt, {}, {}, {}, import("mongoose").Document<unknown, {}, import("..").PhotoHunt> & import("..").PhotoHunt & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    readonly UserModel: import("mongoose").Model<import("..").User, {}, {}, {}, import("mongoose").Document<unknown, {}, import("..").User> & import("..").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    readonly UserChallengeModel: import("mongoose").Model<import("..").UserChallenge, {}, {}, {}, import("mongoose").Document<unknown, {}, import("..").UserChallenge> & import("..").UserChallenge & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    readonly UserPublicModel: import("mongoose").Model<import("..").UserPublic, {}, {}, {}, import("mongoose").Document<unknown, {}, import("..").UserPublic> & import("..").UserPublic & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    readonly UserStageModel: import("mongoose").Model<import("..").UserStage, {}, {}, {}, import("mongoose").Document<unknown, {}, import("..").UserStage> & import("..").UserStage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    readonly UserTriviaModel: import("mongoose").Model<import("..").UserTrivia, {}, {}, {}, import("mongoose").Document<unknown, {}, import("..").UserTrivia> & import("..").UserTrivia & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
};
export { ChallengeModel, QrModel, StageModel, TriviaModel, PhotoHuntModel, UserModel, UserChallengeModel, UserPublicModel, UserStageModel, UserTriviaModel, };
export default models;
//# sourceMappingURL=index.d.ts.map
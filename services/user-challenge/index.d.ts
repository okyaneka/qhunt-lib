import { UserChallengeParams, UserChallengeResult, UserChallengeSummary, UserStage, Stage, ChallengeForeign, ChallengeSettingsForeign } from "../../types";
import { ClientSession } from "mongoose";
export declare const init: (stage: Stage, userStage: UserStage, session?: ClientSession) => Promise<(import("mongoose").Document<unknown, {}, import("../../types").UserChallenge> & import("../../types").UserChallenge & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
})[]>;
export declare const setup: (challengeId: string, TID: string, setDiscover?: boolean) => Promise<import("../../types").UserChallenge & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const list: (params: UserChallengeParams, TID: string) => Promise<{
    page: number;
    totalItems: number;
    totalPages: number;
    list: {
        id: string;
        challenge: ChallengeForeign;
        settings: ChallengeSettingsForeign;
        userStage: import("../../types").UserStageForeign | null;
        status: import("../../types").UserChallengeStatus;
        results: UserChallengeResult | null;
        contents: string[];
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        _id: import("mongoose").Types.ObjectId;
    }[];
}>;
export declare const detail: (id: string, TID: string) => Promise<import("../../types").UserChallenge & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const submit: (id: string, TID: string, session?: ClientSession, forceFinish?: boolean) => Promise<import("../../types").UserChallenge & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const summary: (userStageId: string, TID: string, session?: ClientSession) => Promise<UserChallengeSummary[]>;
declare const UserChallengeService: {
    readonly verify: (challengeId: string, TID: string, setDiscover?: boolean) => Promise<(import("../../types").UserChallenge & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    readonly setup: (challengeId: string, TID: string, setDiscover?: boolean) => Promise<import("../../types").UserChallenge & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    readonly list: (params: UserChallengeParams, TID: string) => Promise<{
        page: number;
        totalItems: number;
        totalPages: number;
        list: {
            id: string;
            challenge: ChallengeForeign;
            settings: ChallengeSettingsForeign;
            userStage: import("../../types").UserStageForeign | null;
            status: import("../../types").UserChallengeStatus;
            results: UserChallengeResult | null;
            contents: string[];
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            _id: import("mongoose").Types.ObjectId;
        }[];
    }>;
    readonly detail: (id: string, TID: string) => Promise<import("../../types").UserChallenge & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    readonly submit: (id: string, TID: string, session?: ClientSession, forceFinish?: boolean) => Promise<import("../../types").UserChallenge & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    readonly summary: (userStageId: string, TID: string, session?: ClientSession) => Promise<UserChallengeSummary[]>;
    readonly init: (stage: Stage, userStage: UserStage, session?: ClientSession) => Promise<(import("mongoose").Document<unknown, {}, import("../../types").UserChallenge> & import("../../types").UserChallenge & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
};
export default UserChallengeService;
//# sourceMappingURL=index.d.ts.map
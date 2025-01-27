import { UserChallengeParams, UserChallengeResult, UserChallengeStatus } from "../../models/UserChallengeModel";
export declare const verify: (code: string, challengeId: string, isDiscover?: boolean) => Promise<import("../../models/UserChallengeModel").UserChallenge & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const discover: (id: string) => Promise<import("../../models/UserChallengeModel").UserChallenge & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const setup: (code: string, challengeId: string, isDiscover?: boolean) => Promise<import("../../models/UserChallengeModel").UserChallenge & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const list: (params: UserChallengeParams, TID: string) => Promise<{
    page: number;
    totalItems: number;
    totalPages: number;
    list: {
        id: string;
        challenge: import("../../models/ChallengeModel").ChallengeForeign;
        settings: import("../../models/ChallengeModel").ChallengeSettingsForeign;
        userStage: import("../../models/UserStageModel").UserStageForeign | null;
        status: UserChallengeStatus;
        results: UserChallengeResult | null;
        contents: string[];
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        _id: import("mongoose").Types.ObjectId;
    }[];
}>;
export declare const detail: (id: string, TID: string) => Promise<import("../../models/UserChallengeModel").UserChallenge & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const detailContent: (id: string, TID: string, hasResult?: boolean) => Promise<(import("../../models/UserTriviaModel").UserTrivia & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare const submit: (id: string, TID: string, bonus?: number) => Promise<import("../../models/UserChallengeModel").UserChallenge & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const submitState: (id: string, TID: string) => Promise<import("../../models/UserChallengeModel").UserChallenge & {
    _id: import("mongoose").Types.ObjectId;
}>;
declare const UserChallengeService: {
    readonly verify: (code: string, challengeId: string, isDiscover?: boolean) => Promise<import("../../models/UserChallengeModel").UserChallenge & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    readonly setup: (code: string, challengeId: string, isDiscover?: boolean) => Promise<import("../../models/UserChallengeModel").UserChallenge & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    readonly list: (params: UserChallengeParams, TID: string) => Promise<{
        page: number;
        totalItems: number;
        totalPages: number;
        list: {
            id: string;
            challenge: import("../../models/ChallengeModel").ChallengeForeign;
            settings: import("../../models/ChallengeModel").ChallengeSettingsForeign;
            userStage: import("../../models/UserStageModel").UserStageForeign | null;
            status: UserChallengeStatus;
            results: UserChallengeResult | null;
            contents: string[];
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            _id: import("mongoose").Types.ObjectId;
        }[];
    }>;
    readonly detail: (id: string, TID: string) => Promise<import("../../models/UserChallengeModel").UserChallenge & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    readonly detailContent: (id: string, TID: string, hasResult?: boolean) => Promise<(import("../../models/UserTriviaModel").UserTrivia & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    readonly submit: (id: string, TID: string, bonus?: number) => Promise<import("../../models/UserChallengeModel").UserChallenge & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    readonly submitState: (id: string, TID: string) => Promise<import("../../models/UserChallengeModel").UserChallenge & {
        _id: import("mongoose").Types.ObjectId;
    }>;
};
export default UserChallengeService;
//# sourceMappingURL=index.d.ts.map
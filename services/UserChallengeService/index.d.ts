import { UserChallengeParams, UserChallengeStatus } from "../../models/UserChallengeModel";
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
        userStage: import("../../models/UserStageModel").UserStageForeign | null;
        status: UserChallengeStatus;
        score: number | null;
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
export declare const detailContent: (id: string, TID: string) => Promise<(import("../../models/UserTriviaModel").UserTrivia & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare const submit: (id: string, payload: any, TID: string) => Promise<void>;
declare const UserChallengeService: {
    verify: (code: string, challengeId: string, isDiscover?: boolean) => Promise<import("../../models/UserChallengeModel").UserChallenge & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    setup: (code: string, challengeId: string, isDiscover?: boolean) => Promise<import("../../models/UserChallengeModel").UserChallenge & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    list: (params: UserChallengeParams, TID: string) => Promise<{
        page: number;
        totalItems: number;
        totalPages: number;
        list: {
            id: string;
            challenge: import("../../models/ChallengeModel").ChallengeForeign;
            userStage: import("../../models/UserStageModel").UserStageForeign | null;
            status: UserChallengeStatus;
            score: number | null;
            contents: string[];
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            _id: import("mongoose").Types.ObjectId;
        }[];
    }>;
    detail: (id: string, TID: string) => Promise<import("../../models/UserChallengeModel").UserChallenge & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    detailContent: (id: string, TID: string) => Promise<(import("../../models/UserTriviaModel").UserTrivia & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    submit: (id: string, payload: any, TID: string) => Promise<void>;
};
export default UserChallengeService;
//# sourceMappingURL=index.d.ts.map
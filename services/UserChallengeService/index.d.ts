import { UserChallengeParams, UserChallengeResult, UserChallengeSummary } from "../../models/UserChallengeModel";
export declare const setup: (challengeId: string, TID: string, setDiscover?: boolean) => Promise<import("../../models/UserChallengeModel").UserChallenge & {
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
        status: import("../../models/UserChallengeModel").UserChallengeStatus;
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
export declare const submit: (id: string, TID: string, bonus?: number) => Promise<import("../../models/UserChallengeModel").UserChallenge & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const submitState: (id: string, TID: string) => Promise<import("../../models/UserChallengeModel").UserChallenge & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const summary: (userStageId: string, TID: string) => Promise<UserChallengeSummary[]>;
declare const UserChallengeService: {
    readonly verify: (challengeId: string, TID: string, setDiscover?: boolean) => Promise<(import("../../models/UserChallengeModel").UserChallenge & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    readonly setup: (challengeId: string, TID: string, setDiscover?: boolean) => Promise<import("../../models/UserChallengeModel").UserChallenge & {
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
            status: import("../../models/UserChallengeModel").UserChallengeStatus;
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
    readonly submit: (id: string, TID: string, bonus?: number) => Promise<import("../../models/UserChallengeModel").UserChallenge & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    readonly submitState: (id: string, TID: string) => Promise<import("../../models/UserChallengeModel").UserChallenge & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    readonly summary: (userStageId: string, TID: string) => Promise<UserChallengeSummary[]>;
};
export default UserChallengeService;
//# sourceMappingURL=index.d.ts.map
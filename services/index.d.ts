import ChallengeService from "./challenge";
import PhotoHuntService from "./photo-hunt";
import QrService from "./qr";
import StageService from "./stage";
import TriviaService from "./trivia";
import UserChallengeService from "./user-challenge";
import UserPhotoHuntService from "./user-photo-hunt";
import UserPublicService from "./user-public";
import UserService from "./user";
import UserStageService from "./user-stage";
import UserTriviaService from "./user-trivia";
import LeaderboardService from "./leaderboard";
declare const services: {
    readonly ChallengeService: {
        readonly list: (params: import("..").ChallengeListParams) => Promise<{
            list: (import("..").Challenge & {
                _id: import("mongoose").Types.ObjectId;
            })[];
            page: number;
            totalItems: number;
            totalPages: number;
        }>;
        readonly create: (payload: import("..").ChallengePayload) => Promise<import("..").Challenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        readonly detail: (id: string) => Promise<import("..").Challenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        readonly update: (id: string, payload: import("..").ChallengePayload) => Promise<import("..").Challenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        readonly updateContent: (id: string, contents: string[]) => Promise<import("..").Challenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        readonly delete: (id: string) => Promise<import("..").Challenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        readonly verify: (id: string) => Promise<import("..").Challenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
    };
    readonly PhotoHuntService: {
        detail: (id: string) => Promise<import("..").PhotoHunt & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        details: (challengeId: string) => Promise<(import("..").PhotoHunt & {
            _id: import("mongoose").Types.ObjectId;
        })[]>;
        sync: (challengeId: string, payload: import("..").PhotoHuntPayload[]) => Promise<(import("..").PhotoHunt & {
            _id: import("mongoose").Types.ObjectId;
        })[]>;
        verify: (id: string) => Promise<void>;
        verifyCode: (challengeId: string, code: string) => Promise<import("..").PhotoHunt & {
            _id: import("mongoose").Types.ObjectId;
        }>;
    };
    readonly QrService: {
        generate: (count: number) => Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("..").Qr> & import("..").Qr & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, Omit<import("..").QrPayload, "_id">>[]>;
        list: (params: import("..").QrListParams) => Promise<{
            list: (import("..").Qr & {
                _id: import("mongoose").Types.ObjectId;
            })[];
            page: number;
            totalItems: number;
            totalPages: number;
        }>;
        detail: (id: string) => Promise<import("..").Qr & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        details: (ids: string[]) => Promise<(import("..").Qr & {
            _id: import("mongoose").Types.ObjectId;
        })[]>;
        update: (id: string, payload: import("..").QrUpdatePayload) => Promise<import("..").Qr & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        delete: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("..").Qr> & import("..").Qr & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        deleteMany: (ids: string[]) => Promise<import("mongoose").UpdateWriteOpResult>;
        verify: (code: string, TID: string) => Promise<import("..").QrContent>;
    };
    readonly StageService: {
        list: (params: import("..").StageListParams) => Promise<{
            list: (import("..").Stage & {
                _id: import("mongoose").Types.ObjectId;
            })[];
            page: number;
            totalItems: number;
            totalPages: number;
        }>;
        create: (payload: import("..").StagePayload) => Promise<import("..").Stage & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        detail: (id: string) => Promise<import("..").Stage & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        update: (id: string, payload: import("..").StagePayload) => Promise<import("..").Stage & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        delete: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("..").Stage> & import("..").Stage & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        verify: (id: string) => Promise<import("..").Stage & {
            _id: import("mongoose").Types.ObjectId;
        }>;
    };
    readonly TriviaService: {
        detail: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("..").Trivia> & import("..").Trivia & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        details: (challengeId: string) => Promise<(import("..").Trivia & {
            _id: import("mongoose").Types.ObjectId;
        })[]>;
        sync: (challengeId: string, payload: import("..").TriviaPayload[]) => Promise<(import("..").Trivia & {
            _id: import("mongoose").Types.ObjectId;
        })[]>;
        verify: (id: string) => Promise<void>;
    };
    readonly UserChallengeService: {
        readonly verify: (challengeId: string, TID: string, setDiscover?: boolean) => Promise<(import("..").UserChallenge & {
            _id: import("mongoose").Types.ObjectId;
        }) | null>;
        readonly setup: (challengeId: string, TID: string, setDiscover?: boolean) => Promise<import("..").UserChallenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        readonly list: (params: import("..").UserChallengeParams, TID: string) => Promise<{
            page: number;
            totalItems: number;
            totalPages: number;
            list: {
                id: string;
                challenge: import("..").ChallengeForeign;
                settings: import("..").ChallengeSettingsForeign;
                userStage: import("..").UserStageForeign | null;
                status: import("..").UserChallengeStatus;
                results: import("..").UserChallengeResult | null;
                contents: string[];
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                _id: import("mongoose").Types.ObjectId;
            }[];
        }>;
        readonly detail: (id: string, TID: string) => Promise<import("..").UserChallenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        readonly submit: (id: string, TID: string, session?: import("mongoose").ClientSession) => Promise<import("..").UserChallenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        readonly submitState: (id: string, TID: string, finish?: boolean, session?: import("mongoose").ClientSession) => Promise<import("..").UserChallenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        readonly summary: (userStageId: string, TID: string, session?: import("mongoose").ClientSession) => Promise<import("..").UserChallengeSummary[]>;
        readonly init: (stage: import("..").Stage, userStage: import("..").UserStage, session?: import("mongoose").ClientSession) => Promise<(import("mongoose").Document<unknown, {}, import("..").UserChallenge> & import("..").UserChallenge & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[]>;
    };
    readonly UserPublicService: {
        verify: (value: string) => Promise<import("..").UserPublic & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        setup: (userId?: string) => Promise<import("..").UserPublic & {
            _id: import("mongoose").Types.ObjectId;
        }>;
    };
    readonly UserService: {
        register: (payload: import("..").UserPayload, code?: string) => Promise<import("mongoose").Document<unknown, {}, import("..").User> & import("..").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        login: (payload: import("..").UserPayload, secret: string) => Promise<{
            id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            TID: string;
            token: string;
        }>;
        profile: (bearer: string) => Promise<void>;
        list: (params: import("..").UserListParams) => Promise<void>;
        create: (payload: import("..").UserPayload) => Promise<void>;
        detail: (id: string) => Promise<{
            meta: import("..").UserPublic & {
                _id: import("mongoose").Types.ObjectId;
            };
            id: string;
            name: string;
            email: string;
            password: string;
            role: import("..").UserRole;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            _id: import("mongoose").Types.ObjectId;
        }>;
        update: (id: string, payload: import("..").UserPayload) => Promise<void>;
        delete: (id: string) => Promise<void>;
    };
    readonly UserStageService: {
        list: (params: import("..").UserStageListParams, TID: string) => Promise<{
            list: (import("..").UserStage & {
                _id: import("mongoose").Types.ObjectId;
            })[];
            page: number;
            totalItems: number;
            totalPages: number;
        }>;
        detail: (id: string, TID: string) => Promise<import("..").UserStage & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        setup: (stageId: string, TID: string) => Promise<(import("..").UserStage & {
            _id: import("mongoose").Types.ObjectId;
        }) | (import("mongoose").Document<unknown, {}, import("..").UserStage> & import("..").UserStage & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })>;
        verify: (stageId: string, TID: string) => Promise<(import("mongoose").Document<unknown, {}, import("..").UserStage> & import("..").UserStage & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | null>;
        submitState: (id: string, TID: string, session?: import("mongoose").ClientSession) => Promise<import("..").UserStage & {
            _id: import("mongoose").Types.ObjectId;
        }>;
    };
    readonly UserTriviaService: {
        readonly setup: (userPublic: import("..").UserPublicForeign, userChallenge: import("..").UserChallengeForeign, session?: import("mongoose").ClientSession) => Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("..").UserTrivia> & import("..").UserTrivia & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, Omit<{
            userPublic: import("..").UserPublicForeign;
            userChallenge: import("..").UserChallengeForeign;
            trivia: import("..").TriviaForeign;
        }[], "_id">>[]>;
        readonly details: (ids: string[], TID: string, hasResult?: boolean) => Promise<(import("..").UserTrivia & {
            _id: import("mongoose").Types.ObjectId;
        })[]>;
        readonly submit: (id: string, TID: string, answer?: string | null, bonus?: number) => Promise<import("..").UserTrivia & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        readonly submitEmpties: (userChallengeId: string, TID: string, session?: import("mongoose").ClientSession) => Promise<import("mongoose").UpdateWriteOpResult>;
        readonly summary: (userChallengeId: string, TID: string, session?: import("mongoose").ClientSession) => Promise<import("..").UserTriviaSummary>;
    };
    readonly UserPhotoHuntService: {
        readonly setup: (userPublic: import("..").UserPublicForeign, userChallenge: import("..").UserChallengeForeign, session?: import("mongoose").ClientSession) => Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("..").UserPhotoHunt> & import("..").UserPhotoHunt & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, Omit<{
            userPublic: import("..").UserPublicForeign;
            userChallenge: import("..").UserChallengeForeign;
            photoHunt: {
                id: string;
                hint: string;
            };
        }[], "_id">>[]>;
        readonly details: (ids: string[], TID: string, hasResult?: boolean) => Promise<(import("..").UserPhotoHunt & {
            _id: import("mongoose").Types.ObjectId;
        })[]>;
        readonly submit: (userChallengeId: string, TID: string, code: string, bonus?: number) => Promise<import("..").UserPhotoHunt & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        readonly submitEmpties: (userChallengeId: string, TID: string, session?: import("mongoose").ClientSession) => Promise<import("mongoose").UpdateWriteOpResult>;
        readonly summary: (userChallengeId: string, TID: string, session?: import("mongoose").ClientSession) => Promise<import("..").UserPhotoHuntSummary>;
    };
    readonly LeaderboardService: {
        readonly stage: (stageId: string, TID?: string, limit?: number) => Promise<import("..").LeaderboardData>;
    };
};
export { ChallengeService, PhotoHuntService, QrService, StageService, TriviaService, UserChallengeService, UserPublicService, UserService, UserStageService, UserTriviaService, UserPhotoHuntService, LeaderboardService, };
export default services;
//# sourceMappingURL=index.d.ts.map
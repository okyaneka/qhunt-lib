import ChallengeService from "./ChallengeService";
import PhotoHuntService from "./PhotoHuntService";
import QrService from "./QrService";
import StageService from "./StageService";
import TriviaService from "./TriviaService";
import UserChallengeService from "./UserChallengeService";
import UserPhotoHuntService from "./UserPhotoHuntService";
import UserPublicService from "./UserPublicService";
import UserService from "./UserService";
import UserStageService from "./UserStageService";
import UserTriviaService from "./UserTriviaService";
declare const services: {
    readonly ChallengeService: {
        readonly list: (params: import("../models/ChallengeModel").ChallengeListParams) => Promise<{
            list: (import("../models/ChallengeModel").Challenge & {
                _id: import("mongoose").Types.ObjectId;
            })[];
            page: number;
            totalItems: number;
            totalPages: number;
        }>;
        readonly create: (payload: import("../models/ChallengeModel").ChallengePayload) => Promise<import("../models/ChallengeModel").Challenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        readonly detail: (id: string) => Promise<import("../models/ChallengeModel").Challenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        readonly update: (id: string, payload: import("../models/ChallengeModel").ChallengePayload) => Promise<import("../models/ChallengeModel").Challenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        readonly updateContent: (id: string, contents: string[]) => Promise<import("../models/ChallengeModel").Challenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        readonly delete: (id: string) => Promise<import("../models/ChallengeModel").Challenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        readonly verify: (id: string) => Promise<import("../models/ChallengeModel").Challenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
    };
    readonly PhotoHuntService: {
        detail: (id: string) => Promise<import("../models/PhotoHuntModel").PhotoHunt & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        details: (challengeId: string) => Promise<(import("../models/PhotoHuntModel").PhotoHunt & {
            _id: import("mongoose").Types.ObjectId;
        })[]>;
        sync: (challengeId: string, payload: import("../models/PhotoHuntModel").PhotoHuntPayload[]) => Promise<(import("../models/PhotoHuntModel").PhotoHunt & {
            _id: import("mongoose").Types.ObjectId;
        })[]>;
        verify: (id: string) => Promise<void>;
    };
    readonly QrService: {
        generate: (count: number) => Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("../models/QrModel").Qr> & import("../models/QrModel").Qr & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, Omit<import("../models/QrModel").QrPayload, "_id">>[]>;
        list: (params: import("../models/QrModel").QrListParams) => Promise<{
            list: (import("../models/QrModel").Qr & {
                _id: import("mongoose").Types.ObjectId;
            })[];
            page: number;
            totalItems: number;
            totalPages: number;
        }>;
        detail: (id: string) => Promise<import("../models/QrModel").Qr & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        details: (ids: string[]) => Promise<(import("../models/QrModel").Qr & {
            _id: import("mongoose").Types.ObjectId;
        })[]>;
        update: (id: string, payload: import("../models/QrModel").QrUpdatePayload) => Promise<import("../models/QrModel").Qr & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        delete: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/QrModel").Qr> & import("../models/QrModel").Qr & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        deleteMany: (ids: string[]) => Promise<import("mongoose").UpdateWriteOpResult>;
        verify: (code: string, TID: string) => Promise<import("../models/QrModel").QrContent>;
    };
    readonly StageService: {
        list: (params: import("../models/StageModel").StageListParams) => Promise<{
            list: (import("../models/StageModel").Stage & {
                _id: import("mongoose").Types.ObjectId;
            })[];
            page: number;
            totalItems: number;
            totalPages: number;
        }>;
        create: (payload: import("../models/StageModel").StagePayload) => Promise<import("../models/StageModel").Stage & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        detail: (id: string) => Promise<import("../models/StageModel").Stage & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        update: (id: string, payload: import("../models/StageModel").StagePayload) => Promise<import("../models/StageModel").Stage & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        delete: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/StageModel").Stage> & import("../models/StageModel").Stage & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        verify: (id: string) => Promise<import("../models/StageModel").Stage & {
            _id: import("mongoose").Types.ObjectId;
        }>;
    };
    readonly TriviaService: {
        detail: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/TriviaModel").Trivia> & import("../models/TriviaModel").Trivia & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        details: (challengeId: string) => Promise<(import("../models/TriviaModel").Trivia & {
            _id: import("mongoose").Types.ObjectId;
        })[]>;
        sync: (challengeId: string, payload: import("../models/TriviaModel").TriviaPayload[]) => Promise<(import("../models/TriviaModel").Trivia & {
            _id: import("mongoose").Types.ObjectId;
        })[]>;
        verify: (id: string) => Promise<void>;
    };
    readonly UserChallengeService: {
        readonly verify: (challengeId: string, TID: string, setDiscover?: boolean) => Promise<(import("../models/UserChallengeModel").UserChallenge & {
            _id: import("mongoose").Types.ObjectId;
        }) | null>;
        readonly setup: (challengeId: string, TID: string, setDiscover?: boolean) => Promise<import("../models/UserChallengeModel").UserChallenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        readonly list: (params: import("../models/UserChallengeModel").UserChallengeParams, TID: string) => Promise<{
            page: number;
            totalItems: number;
            totalPages: number;
            list: {
                id: string;
                challenge: import("../models/ChallengeModel").ChallengeForeign;
                settings: import("../models/ChallengeModel").ChallengeSettingsForeign;
                userStage: import("../models/UserStageModel").UserStageForeign | null;
                status: import("../models/UserChallengeModel").UserChallengeStatus;
                results: import("../models/UserChallengeModel").UserChallengeResult | null;
                contents: string[];
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                _id: import("mongoose").Types.ObjectId;
            }[];
        }>;
        readonly detail: (id: string, TID: string) => Promise<import("../models/UserChallengeModel").UserChallenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        readonly submit: (id: string, TID: string, bonus?: number) => Promise<import("../models/UserChallengeModel").UserChallenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        readonly submitState: (id: string, TID: string) => Promise<import("../models/UserChallengeModel").UserChallenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        readonly summary: (userStageId: string, TID: string) => Promise<import("../models/UserChallengeModel").UserChallengeSummary[]>;
    };
    readonly UserPublicService: {
        verify: (value: string) => Promise<import("../models/UserPublicModel").UserPublic & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        setup: (userId?: string) => Promise<import("../models/UserPublicModel").UserPublic & {
            _id: import("mongoose").Types.ObjectId;
        }>;
    };
    readonly UserService: {
        register: (payload: import("../models/UserModel").UserPayload, code?: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/UserModel").User> & import("../models/UserModel").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        login: (payload: import("../models/UserModel").UserPayload, secret: string) => Promise<{
            id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            TID: string;
            token: string;
        }>;
        profile: (bearer: string) => Promise<void>;
        list: (params: import("../models/UserModel").UserListParams) => Promise<void>;
        create: (payload: import("../models/UserModel").UserPayload) => Promise<void>;
        detail: (id: string) => Promise<{
            meta: import("../models/UserPublicModel").UserPublic & {
                _id: import("mongoose").Types.ObjectId;
            };
            id: string;
            name: string;
            email: string;
            password: string;
            role: import("../models/UserModel").UserRole;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            _id: import("mongoose").Types.ObjectId;
        }>;
        update: (id: string, payload: import("../models/UserModel").UserPayload) => Promise<void>;
        delete: (id: string) => Promise<void>;
    };
    readonly UserStageService: {
        list: (params: import("../models/UserStageModel").UserStageListParams, TID: string) => Promise<{
            list: (import("../models/UserStageModel").UserStage & {
                _id: import("mongoose").Types.ObjectId;
            })[];
            page: number;
            totalItems: number;
            totalPages: number;
        }>;
        detail: (id: string, TID: string) => Promise<import("../models/UserStageModel").UserStage & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        setup: (stageId: string, TID: string) => Promise<(import("../models/UserStageModel").UserStage & {
            _id: import("mongoose").Types.ObjectId;
        }) | (import("mongoose").Document<unknown, {}, import("../models/UserStageModel").UserStage> & import("../models/UserStageModel").UserStage & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })>;
        verify: (stageId: string, TID: string) => Promise<(import("mongoose").Document<unknown, {}, import("../models/UserStageModel").UserStage> & import("../models/UserStageModel").UserStage & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | null>;
        submitState: (id: string, TID: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/UserStageModel").UserStage> & import("../models/UserStageModel").UserStage & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
    };
    readonly UserTriviaService: {
        readonly setup: (userPublic: import("../models/UserPublicModel").UserPublicForeign, userChallenge: import("../models/UserChallengeModel").UserChallengeForeign) => Promise<string[]>;
        readonly details: (ids: string[], TID: string, hasResult?: boolean) => Promise<(import("../models/UserTriviaModel").UserTrivia & {
            _id: import("mongoose").Types.ObjectId;
        })[]>;
        readonly submit: (id: string, TID: string, answer?: string | null, bonus?: number) => Promise<import("../models/UserTriviaModel").UserTrivia & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        readonly submitEmpties: (userChallengeId: string, TID: string) => Promise<import("mongoose").UpdateWriteOpResult>;
        readonly summary: (userChallengeId: string, TID: string) => Promise<import("../models/UserTriviaModel").UserTriviaSummary>;
    };
    readonly UserPhotoHuntService: {
        readonly setup: (userPublic: import("../models/UserPublicModel").UserPublicForeign, userChallenge: import("../models/UserChallengeModel").UserChallengeForeign) => Promise<string[]>;
        readonly details: (ids: string[], TID: string, hasResult?: boolean) => Promise<(import("../models/UserPhotoHuntModel").UserPhotoHunt & {
            _id: import("mongoose").Types.ObjectId;
        })[]>;
        readonly submit: (id: string, TID: string, isFound: boolean, bonus?: number) => Promise<import("../models/UserPhotoHuntModel").UserPhotoHunt & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        readonly submitEmpties: (userChallengeId: string, TID: string) => Promise<import("mongoose").UpdateWriteOpResult>;
        readonly summary: (userChallengeId: string, TID: string) => Promise<import("../models/UserPhotoHuntModel").UserPhotoHuntSummary>;
    };
};
export { ChallengeService, PhotoHuntService, QrService, StageService, TriviaService, UserChallengeService, UserPublicService, UserService, UserStageService, UserTriviaService, UserPhotoHuntService, };
export default services;
//# sourceMappingURL=index.d.ts.map
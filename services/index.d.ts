import ChallengeService from "./ChallengeService";
import QrService from "./QrService";
import StageService from "./StageService";
import TriviaService from "./TriviaService";
import UserChallengeService from "./UserChallengeService";
import UserPublicService from "./UserPublicService";
import UserService from "./UserService";
import UserStageService from "./UserStageService";
import UserTriviaService from "./UserTriviaService";
declare const services: {
    readonly ChallengeService: {
        list: (params: import("../models/ChallengeModel").ChallengeListParams) => Promise<{
            list: (import("../models/ChallengeModel").Challenge & {
                _id: import("mongoose").Types.ObjectId;
            })[];
            page: number;
            totalItems: number;
            totalPages: number;
        }>;
        create: (payload: import("../models/ChallengeModel").ChallengePayload) => Promise<import("../models/ChallengeModel").Challenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        detail: (id: string) => Promise<import("../models/ChallengeModel").Challenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        update: (id: string, payload: import("../models/ChallengeModel").ChallengePayload) => Promise<import("../models/ChallengeModel").Challenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        updateContent: (id: string, contents: string[]) => Promise<import("../models/ChallengeModel").Challenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        delete: (id: string) => Promise<import("../models/ChallengeModel").Challenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        verify: (id: string) => Promise<import("../models/ChallengeModel").Challenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
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
        sync: (challenge: import("../models/ChallengeModel").Challenge, items: import("../models/TriviaModel").TriviaPayload[]) => Promise<string[]>;
        content: (challenge: import("../models/ChallengeModel").Challenge) => Promise<(import("../models/TriviaModel").Trivia & {
            _id: import("mongoose").Types.ObjectId;
        })[]>;
        detail: (id: string) => Promise<void>;
        verify: (id: string) => Promise<void>;
    };
    readonly UserChallengeService: {
        verify: (code: string, challengeId: string, isDiscover?: boolean) => Promise<import("../models/UserChallengeModel").UserChallenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        setup: (code: string, challengeId: string, isDiscover?: boolean) => Promise<import("../models/UserChallengeModel").UserChallenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        list: (params: import("../models/UserChallengeModel").UserChallengeParams, TID: string) => Promise<{
            page: number;
            totalItems: number;
            totalPages: number;
            list: {
                id: string;
                challenge: import("../models/ChallengeModel").ChallengeForeign;
                userStage: import("../models/UserStageModel").UserStageForeign | null;
                status: import("../models/UserChallengeModel").UserChallengeStatus;
                score: number | null;
                contents: string[];
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                _id: import("mongoose").Types.ObjectId;
            }[];
        }>;
        detail: (id: string, TID: string) => Promise<import("../models/UserChallengeModel").UserChallenge & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        detailContent: (id: string, TID: string) => Promise<(import("../models/UserTriviaModel").UserTrivia & {
            _id: import("mongoose").Types.ObjectId;
        })[]>;
        submit: (id: string, payload: any, TID: string) => Promise<void>;
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
        verify: (code: string, stageId: string) => Promise<import("../models/UserStageModel").UserStage & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        setup: (code: string, stageId: string) => Promise<import("../models/UserStageModel").UserStage & {
            _id: import("mongoose").Types.ObjectId;
        }>;
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
    };
    readonly UserTriviaService: {
        readonly setup: (userPublic: import("../models/UserPublicModel").UserPublicForeign, userChallenge: import("../models/UserChallengeModel").UserChallengeForeign, content: string[]) => Promise<string[]>;
        readonly details: (ids: string[], TID: string) => Promise<(import("../models/UserTriviaModel").UserTrivia & {
            _id: import("mongoose").Types.ObjectId;
        })[]>;
    };
};
export { ChallengeService, QrService, StageService, TriviaService, UserChallengeService, UserPublicService, UserService, UserStageService, UserTriviaService, };
export default services;
//# sourceMappingURL=index.d.ts.map
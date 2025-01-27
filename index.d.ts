import helpers from "./helpers";
import models from "./models";
import services from "./services";
import validators from "./validators";
import mongoose from "mongoose";
export { helpers, models, services, validators, mongoose };
declare const _default: {
    helpers: {
        readonly db: {
            transaction: <T>(operation: (session: mongoose.ClientSession) => Promise<T>) => Promise<T>;
        };
        readonly response: {
            success: (data?: any, message?: string) => {
                code: number;
                message: string;
                data: any;
                error: {};
            };
            error: (error?: any, message?: string, code?: number) => {
                code: number;
                message: string;
                data: {};
                error: any;
            };
            errorValidation: (error: import("joi").Root.ValidationError) => {
                code: number;
                message: string;
                data: {};
                error: any;
            };
        };
        readonly schema: {
            createValidator: <T = unknown>(base: import("joi").Schema<T>, option?: import("./helpers/schema").ValidatorOption<T>) => import("joi").Schema<T>;
            string: (option?: import("./helpers/schema").ValidatorOption<string | null>) => import("joi").StringSchema;
            number: (option?: import("./helpers/schema").ValidatorOption<number | null>) => import("joi").NumberSchema;
            boolean: (option?: import("./helpers/schema").ValidatorOption<boolean | null>) => import("joi").BooleanSchema;
            array: <T = unknown>(item: import("joi").Schema<T>, options?: import("./helpers/schema").ValidatorOption<T>) => import("joi").ArraySchema<T>;
            generate: <T>(fields: Record<keyof T, import("joi").Schema>) => import("joi").ObjectSchema<T>;
            ToObject: mongoose.ToObjectOptions<mongoose.Document<unknown, {}, unknown> & {
                _id: mongoose.Types.ObjectId;
            } & {
                __v: number;
            }>;
            PeriodSchema: mongoose.Schema<import("./helpers").Periode, mongoose.Model<import("./helpers").Periode, any, any, any, mongoose.Document<unknown, any, import("./helpers").Periode> & import("./helpers").Periode & {
                _id: mongoose.Types.ObjectId;
            } & {
                __v: number;
            }, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, import("./helpers").Periode, mongoose.Document<unknown, {}, mongoose.FlatRecord<import("./helpers").Periode>> & mongoose.FlatRecord<import("./helpers").Periode> & {
                _id: mongoose.Types.ObjectId;
            } & {
                __v: number;
            }>;
            IdNameSchema: mongoose.Schema<import("./helpers").IdName, mongoose.Model<import("./helpers").IdName, any, any, any, mongoose.Document<unknown, any, import("./helpers").IdName> & import("./helpers").IdName & {
                _id: mongoose.Types.ObjectId;
            } & {
                __v: number;
            }, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, import("./helpers").IdName, mongoose.Document<unknown, {}, mongoose.FlatRecord<import("./helpers").IdName>> & mongoose.FlatRecord<import("./helpers").IdName> & {
                _id: mongoose.Types.ObjectId;
            } & {
                __v: number;
            }>;
        };
        readonly service: {
            list: <T>(model: mongoose.Model<T>, page: number, limit: number, filters?: Record<string, any>, sort?: any) => Promise<{
                list: mongoose.Require_id<T>[];
                page: number;
                totalItems: number;
                totalPages: number;
            }>;
        };
        readonly qrcode: {
            readonly scanByStream: (stream: MediaStream, el?: HTMLVideoElement) => Promise<import("@zxing/library").Result>;
            readonly scanByFile: (file: File) => Promise<import("@zxing/library").Result>;
        };
    };
    models: {
        readonly ChallengeModel: mongoose.Model<import("./models/ChallengeModel").Challenge, {}, {}, {}, mongoose.Document<unknown, {}, import("./models/ChallengeModel").Challenge> & import("./models/ChallengeModel").Challenge & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }, any>;
        readonly QrModel: mongoose.Model<import("./models/QrModel").Qr, {}, {}, {}, mongoose.Document<unknown, {}, import("./models/QrModel").Qr> & import("./models/QrModel").Qr & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }, any>;
        readonly StageModel: mongoose.Model<import("./models/StageModel").Stage, {}, {}, {}, mongoose.Document<unknown, {}, import("./models/StageModel").Stage> & import("./models/StageModel").Stage & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }, any>;
        readonly TriviaModel: mongoose.Model<import("./models/TriviaModel").Trivia, {}, {}, {}, mongoose.Document<unknown, {}, import("./models/TriviaModel").Trivia> & import("./models/TriviaModel").Trivia & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }, any>;
        readonly UserModel: mongoose.Model<import("./models/UserModel").User, {}, {}, {}, mongoose.Document<unknown, {}, import("./models/UserModel").User> & import("./models/UserModel").User & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }, any>;
        readonly UserChallengeModel: mongoose.Model<import("./models/UserChallengeModel").UserChallenge, {}, {}, {}, mongoose.Document<unknown, {}, import("./models/UserChallengeModel").UserChallenge> & import("./models/UserChallengeModel").UserChallenge & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }, any>;
        readonly UserPublicModel: mongoose.Model<import("./models/UserPublicModel").UserPublic, {}, {}, {}, mongoose.Document<unknown, {}, import("./models/UserPublicModel").UserPublic> & import("./models/UserPublicModel").UserPublic & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }, any>;
        readonly UserStageModel: mongoose.Model<import("./models/UserStageModel").UserStage, {}, {}, {}, mongoose.Document<unknown, {}, import("./models/UserStageModel").UserStage> & import("./models/UserStageModel").UserStage & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }, any>;
        readonly UserTriviaModel: mongoose.Model<import("./models/UserTriviaModel").UserTrivia, {}, {}, {}, mongoose.Document<unknown, {}, import("./models/UserTriviaModel").UserTrivia> & import("./models/UserTriviaModel").UserTrivia & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }, any>;
    };
    services: {
        readonly ChallengeService: {
            readonly list: (params: import("./models/ChallengeModel").ChallengeListParams) => Promise<{
                list: (import("./models/ChallengeModel").Challenge & {
                    _id: mongoose.Types.ObjectId;
                })[];
                page: number;
                totalItems: number;
                totalPages: number;
            }>;
            readonly create: (payload: import("./models/ChallengeModel").ChallengePayload) => Promise<import("./models/ChallengeModel").Challenge & {
                _id: mongoose.Types.ObjectId;
            }>;
            readonly detail: (id: string) => Promise<import("./models/ChallengeModel").Challenge & {
                _id: mongoose.Types.ObjectId;
            }>;
            readonly detailContent: (id: string) => Promise<(import("./models/TriviaModel").Trivia & {
                _id: mongoose.Types.ObjectId;
            })[]>;
            readonly update: (id: string, payload: import("./models/ChallengeModel").ChallengePayload) => Promise<import("./models/ChallengeModel").Challenge & {
                _id: mongoose.Types.ObjectId;
            }>;
            readonly updateContent: (id: string, contents: string[]) => Promise<import("./models/ChallengeModel").Challenge & {
                _id: mongoose.Types.ObjectId;
            }>;
            readonly delete: (id: string) => Promise<import("./models/ChallengeModel").Challenge & {
                _id: mongoose.Types.ObjectId;
            }>;
            readonly verify: (id: string) => Promise<import("./models/ChallengeModel").Challenge & {
                _id: mongoose.Types.ObjectId;
            }>;
        };
        readonly QrService: {
            generate: (count: number) => Promise<mongoose.MergeType<mongoose.Document<unknown, {}, import("./models/QrModel").Qr> & import("./models/QrModel").Qr & {
                _id: mongoose.Types.ObjectId;
            } & {
                __v: number;
            }, Omit<import("./models/QrModel").QrPayload, "_id">>[]>;
            list: (params: import("./models/QrModel").QrListParams) => Promise<{
                list: (import("./models/QrModel").Qr & {
                    _id: mongoose.Types.ObjectId;
                })[];
                page: number;
                totalItems: number;
                totalPages: number;
            }>;
            detail: (id: string) => Promise<import("./models/QrModel").Qr & {
                _id: mongoose.Types.ObjectId;
            }>;
            update: (id: string, payload: import("./models/QrModel").QrUpdatePayload) => Promise<import("./models/QrModel").Qr & {
                _id: mongoose.Types.ObjectId;
            }>;
            delete: (id: string) => Promise<mongoose.Document<unknown, {}, import("./models/QrModel").Qr> & import("./models/QrModel").Qr & {
                _id: mongoose.Types.ObjectId;
            } & {
                __v: number;
            }>;
            deleteMany: (ids: string[]) => Promise<mongoose.UpdateWriteOpResult>;
            verify: (code: string, TID: string) => Promise<import("./models/QrModel").QrContent>;
        };
        readonly StageService: {
            list: (params: import("./models/StageModel").StageListParams) => Promise<{
                list: (import("./models/StageModel").Stage & {
                    _id: mongoose.Types.ObjectId;
                })[];
                page: number;
                totalItems: number;
                totalPages: number;
            }>;
            create: (payload: import("./models/StageModel").StagePayload) => Promise<import("./models/StageModel").Stage & {
                _id: mongoose.Types.ObjectId;
            }>;
            detail: (id: string) => Promise<import("./models/StageModel").Stage & {
                _id: mongoose.Types.ObjectId;
            }>;
            update: (id: string, payload: import("./models/StageModel").StagePayload) => Promise<import("./models/StageModel").Stage & {
                _id: mongoose.Types.ObjectId;
            }>;
            delete: (id: string) => Promise<mongoose.Document<unknown, {}, import("./models/StageModel").Stage> & import("./models/StageModel").Stage & {
                _id: mongoose.Types.ObjectId;
            } & {
                __v: number;
            }>;
            verify: (id: string) => Promise<import("./models/StageModel").Stage & {
                _id: mongoose.Types.ObjectId;
            }>;
        };
        readonly TriviaService: {
            sync: (challenge: import("./models/ChallengeModel").Challenge, items: import("./models/TriviaModel").TriviaPayload[]) => Promise<string[]>;
            content: (challenge: import("./models/ChallengeModel").Challenge) => Promise<(import("./models/TriviaModel").Trivia & {
                _id: mongoose.Types.ObjectId;
            })[]>;
            detail: (id: string) => Promise<void>;
            verify: (id: string) => Promise<void>;
        };
        readonly UserChallengeService: {
            readonly verify: (code: string, challengeId: string, isDiscover?: boolean) => Promise<import("./models/UserChallengeModel").UserChallenge & {
                _id: mongoose.Types.ObjectId;
            }>;
            readonly setup: (code: string, challengeId: string, isDiscover?: boolean) => Promise<import("./models/UserChallengeModel").UserChallenge & {
                _id: mongoose.Types.ObjectId;
            }>;
            readonly list: (params: import("./models/UserChallengeModel").UserChallengeParams, TID: string) => Promise<{
                page: number;
                totalItems: number;
                totalPages: number;
                list: {
                    id: string;
                    challenge: import("./models/ChallengeModel").ChallengeForeign;
                    settings: import("./models/ChallengeModel").ChallengeSettingsForeign;
                    userStage: import("./models/UserStageModel").UserStageForeign | null;
                    status: import("./models/UserChallengeModel").UserChallengeStatus;
                    results: import("./models/UserChallengeModel").UserChallengeResult | null;
                    contents: string[];
                    createdAt: Date;
                    updatedAt: Date;
                    deletedAt: Date | null;
                    _id: mongoose.Types.ObjectId;
                }[];
            }>;
            readonly detail: (id: string, TID: string) => Promise<import("./models/UserChallengeModel").UserChallenge & {
                _id: mongoose.Types.ObjectId;
            }>;
            readonly detailContent: (id: string, TID: string, hasResult?: boolean) => Promise<(import("./models/UserTriviaModel").UserTrivia & {
                _id: mongoose.Types.ObjectId;
            })[]>;
            readonly submit: (id: string, payload: any, TID: string) => Promise<void>;
        };
        readonly UserPublicService: {
            verify: (value: string) => Promise<import("./models/UserPublicModel").UserPublic & {
                _id: mongoose.Types.ObjectId;
            }>;
            setup: (userId?: string) => Promise<import("./models/UserPublicModel").UserPublic & {
                _id: mongoose.Types.ObjectId;
            }>;
        };
        readonly UserService: {
            register: (payload: import("./models/UserModel").UserPayload, code?: string) => Promise<mongoose.Document<unknown, {}, import("./models/UserModel").User> & import("./models/UserModel").User & {
                _id: mongoose.Types.ObjectId;
            } & {
                __v: number;
            }>;
            login: (payload: import("./models/UserModel").UserPayload, secret: string) => Promise<{
                id: mongoose.Types.ObjectId;
                name: string;
                email: string;
                TID: string;
                token: string;
            }>;
            profile: (bearer: string) => Promise<void>;
            list: (params: import("./models/UserModel").UserListParams) => Promise<void>;
            create: (payload: import("./models/UserModel").UserPayload) => Promise<void>;
            detail: (id: string) => Promise<{
                meta: import("./models/UserPublicModel").UserPublic & {
                    _id: mongoose.Types.ObjectId;
                };
                id: string;
                name: string;
                email: string;
                password: string;
                role: import("./models/UserModel").UserRole;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                _id: mongoose.Types.ObjectId;
            }>;
            update: (id: string, payload: import("./models/UserModel").UserPayload) => Promise<void>;
            delete: (id: string) => Promise<void>;
        };
        readonly UserStageService: {
            verify: (code: string, stageId: string) => Promise<import("./models/UserStageModel").UserStage & {
                _id: mongoose.Types.ObjectId;
            }>;
            setup: (code: string, stageId: string) => Promise<import("./models/UserStageModel").UserStage & {
                _id: mongoose.Types.ObjectId;
            }>;
            list: (params: import("./models/UserStageModel").UserStageListParams, TID: string) => Promise<{
                list: (import("./models/UserStageModel").UserStage & {
                    _id: mongoose.Types.ObjectId;
                })[];
                page: number;
                totalItems: number;
                totalPages: number;
            }>;
            detail: (id: string, TID: string) => Promise<import("./models/UserStageModel").UserStage & {
                _id: mongoose.Types.ObjectId;
            }>;
        };
        readonly UserTriviaService: {
            readonly setup: (userPublic: import("./models/UserPublicModel").UserPublicForeign, userChallenge: import("./models/UserChallengeModel").UserChallengeForeign, content: string[]) => Promise<string[]>;
            readonly details: (ids: string[], TID: string, hasResult?: boolean) => Promise<(import("./models/UserTriviaModel").UserTrivia & {
                _id: mongoose.Types.ObjectId;
            })[]>;
        };
    };
    validators: {
        readonly ChallengeValidator: {
            ChallengeFeedbackValidator: import("joi").ObjectSchema<import("./models/ChallengeModel").ChallengeFeedback>;
            ChallengeForeignValidator: import("joi").ObjectSchema<import("./models/ChallengeModel").ChallengeForeign>;
            ChallengeListParamsValidator: import("joi").ObjectSchema<import("./models/ChallengeModel").ChallengeListParams>;
            ChallengePayloadValidator: import("joi").ObjectSchema<import("./models/ChallengeModel").ChallengePayload>;
            ChallengeSettingsForeignValidator: import("joi").ObjectSchema<import("./models/ChallengeModel").ChallengeSettingsForeign>;
            ChallengeSettingsValidator: import("joi").ObjectSchema<import("./models/ChallengeModel").ChallengeSettings>;
        };
        readonly QrValidator: {
            QrListParamsValidator: import("joi").ObjectSchema<import("./models/QrModel").QrListParams>;
            QrGeneratePayloadValidator: import("joi").ObjectSchema<import("./models/QrModel").QrGeneratePayload>;
            QrUpdatePayloadValidator: import("joi").ObjectSchema<import("./models/QrModel").QrUpdatePayload>;
            QrDeleteBulkPayloadValidator: import("joi").ObjectSchema<import("./models/QrModel").QrDeleteBulkPayload>;
        };
        readonly StageValidator: {
            StageSettingsValidator: import("joi").ObjectSchema<import("./models/StageModel").StageSettings>;
            StageListParamsValidator: import("joi").ObjectSchema<import("./models/StageModel").StageListParams>;
            StagePayloadValidator: import("joi").ObjectSchema<import("./models/StageModel").StagePayload>;
            StageForeignValidator: import("joi").ObjectSchema<import("./models/StageModel").StageForeign>;
        };
        readonly TriviaValidator: {
            TriviaOptionValidator: import("joi").ObjectSchema<import("./models/TriviaModel").TriviaOption>;
            TriviaOptionsValidator: import("joi").ArraySchema<import("./models/TriviaModel").TriviaOption>;
            TriviaPayloadValidator: import("joi").ObjectSchema<import("./models/TriviaModel").TriviaPayload>;
            TriviaItemsPayloadValidator: import("joi").ObjectSchema<{
                items: import("./models/TriviaModel").TriviaPayload[];
            }>;
            TriviaForeignValidator: import("joi").ObjectSchema<import("./models/TriviaModel").TriviaForeign>;
        };
        readonly UserChallengeValidator: {
            UserChallengeForeignValidator: import("joi").ObjectSchema<import("./models/UserChallengeModel").UserChallengeForeign>;
            UserChallengeParamsValidator: import("joi").ObjectSchema<import("./models/UserChallengeModel").UserChallengeParams>;
        };
        readonly UserPublicValidator: {
            UserPublicForeignValidator: import("joi").ObjectSchema<import("./models/UserPublicModel").UserPublicForeign>;
        };
        readonly UserStageValidator: {
            UserStageForeignValidator: import("joi").ObjectSchema<import("./models/UserStageModel").UserStageForeign>;
            UserStageListParamsValidator: import("joi").ObjectSchema<import("./models/UserStageModel").UserStageListParams>;
        };
        readonly UserValidator: {
            UserPayloadValidator: import("joi").ObjectSchema<import("./models/UserModel").UserPayload>;
            UserListParamsValidator: import("joi").ObjectSchema<import("./models/UserModel").UserListParams>;
        };
    };
    mongoose: typeof mongoose;
};
export default _default;
//# sourceMappingURL=index.d.ts.map
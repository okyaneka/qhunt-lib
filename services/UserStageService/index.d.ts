import { UserStageListParams } from "../../models/UserStageModel";
export declare const verify: (code: string, stageId: string) => Promise<import("../../models/UserStageModel").UserStage & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const setup: (code: string, stageId: string) => Promise<import("../../models/UserStageModel").UserStage & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const list: (params: UserStageListParams, TID: string) => Promise<{
    list: (import("../../models/UserStageModel").UserStage & {
        _id: import("mongoose").Types.ObjectId;
    })[];
    page: number;
    totalItems: number;
    totalPages: number;
}>;
export declare const detail: (id: string, TID: string) => Promise<import("../../models/UserStageModel").UserStage & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const submitState: (id: string, TID: string) => Promise<import("mongoose").Document<unknown, {}, import("../../models/UserStageModel").UserStage> & import("../../models/UserStageModel").UserStage & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
declare const UserStageService: {
    verify: (code: string, stageId: string) => Promise<import("../../models/UserStageModel").UserStage & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    setup: (code: string, stageId: string) => Promise<import("../../models/UserStageModel").UserStage & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    list: (params: UserStageListParams, TID: string) => Promise<{
        list: (import("../../models/UserStageModel").UserStage & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        page: number;
        totalItems: number;
        totalPages: number;
    }>;
    detail: (id: string, TID: string) => Promise<import("../../models/UserStageModel").UserStage & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    submitState: (id: string, TID: string) => Promise<import("mongoose").Document<unknown, {}, import("../../models/UserStageModel").UserStage> & import("../../models/UserStageModel").UserStage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
};
export default UserStageService;
//# sourceMappingURL=index.d.ts.map
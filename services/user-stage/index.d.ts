import { UserStageListParams } from "../../types";
import { ClientSession } from "mongoose";
export declare const verify: (stageId: string, TID: string) => Promise<(import("mongoose").Document<unknown, {}, import("../../types").UserStage> & import("../../types").UserStage & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}) | null>;
export declare const setup: (stageId: string, TID: string) => Promise<(import("../../types").UserStage & {
    _id: import("mongoose").Types.ObjectId;
}) | (import("mongoose").Document<unknown, {}, import("../../types").UserStage> & import("../../types").UserStage & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
})>;
export declare const list: (params: UserStageListParams, TID: string) => Promise<{
    list: (import("../../types").UserStage & {
        _id: import("mongoose").Types.ObjectId;
    })[];
    page: number;
    totalItems: number;
    totalPages: number;
}>;
export declare const detail: (id: string, TID: string) => Promise<import("../../types").UserStage & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const submitState: (id: string, TID: string, session?: ClientSession) => Promise<import("../../types").UserStage & {
    _id: import("mongoose").Types.ObjectId;
}>;
declare const UserStageService: {
    list: (params: UserStageListParams, TID: string) => Promise<{
        list: (import("../../types").UserStage & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        page: number;
        totalItems: number;
        totalPages: number;
    }>;
    detail: (id: string, TID: string) => Promise<import("../../types").UserStage & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    setup: (stageId: string, TID: string) => Promise<(import("../../types").UserStage & {
        _id: import("mongoose").Types.ObjectId;
    }) | (import("mongoose").Document<unknown, {}, import("../../types").UserStage> & import("../../types").UserStage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })>;
    verify: (stageId: string, TID: string) => Promise<(import("mongoose").Document<unknown, {}, import("../../types").UserStage> & import("../../types").UserStage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    submitState: (id: string, TID: string, session?: ClientSession) => Promise<import("../../types").UserStage & {
        _id: import("mongoose").Types.ObjectId;
    }>;
};
export default UserStageService;
//# sourceMappingURL=index.d.ts.map
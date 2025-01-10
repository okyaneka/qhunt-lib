import { StageListParams, StagePayload } from "~/models/StageModel";
export declare const list: (params: StageListParams) => Promise<{
    list: (import("~/models/StageModel").Stage & {
        _id: import("mongoose").Types.ObjectId;
    })[];
    page: number;
    totalItems: number;
    totalPages: number;
}>;
export declare const create: (payload: StagePayload) => Promise<import("~/models/StageModel").Stage & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const detail: (id: string) => Promise<import("~/models/StageModel").Stage & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const update: (id: string, payload: StagePayload) => Promise<import("~/models/StageModel").Stage & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const _delete: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("~/models/StageModel").Stage> & import("~/models/StageModel").Stage & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const verify: (id: string) => Promise<import("~/models/StageModel").Stage & {
    _id: import("mongoose").Types.ObjectId;
}>;
declare const StageService: {
    list: (params: StageListParams) => Promise<{
        list: (import("~/models/StageModel").Stage & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        page: number;
        totalItems: number;
        totalPages: number;
    }>;
    create: (payload: StagePayload) => Promise<import("~/models/StageModel").Stage & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    detail: (id: string) => Promise<import("~/models/StageModel").Stage & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update: (id: string, payload: StagePayload) => Promise<import("~/models/StageModel").Stage & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("~/models/StageModel").Stage> & import("~/models/StageModel").Stage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    verify: (id: string) => Promise<import("~/models/StageModel").Stage & {
        _id: import("mongoose").Types.ObjectId;
    }>;
};
export default StageService;
//# sourceMappingURL=index.d.ts.map
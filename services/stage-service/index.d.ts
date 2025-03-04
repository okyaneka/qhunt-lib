import { Challenge, StageListParams, StagePayload } from "../../index";
import { ClientSession } from "mongoose";
export declare const list: (params: Partial<StageListParams>) => Promise<{
    list: (import("../../index").Stage & {
        _id: import("mongoose").Types.ObjectId;
    })[];
    page: number;
    totalItems: number;
    totalPages: number;
}>;
export declare const create: (payload: StagePayload) => Promise<import("../../index").Stage & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const detail: (id: string, session?: ClientSession) => Promise<import("../../index").Stage & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const StageUpdate: (id: string, payload: StagePayload) => Promise<import("../../index").Stage & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const _delete: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("../../index").Stage> & import("../../index").Stage & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const verify: (id: string) => Promise<import("../../index").Stage & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const StagePublish: (id: string) => Promise<{
    stage: import("../../index").Stage & {
        _id: import("mongoose").Types.ObjectId;
    };
    challenges: (Challenge & {
        _id: import("mongoose").Types.ObjectId;
    })[];
}>;
export declare const StageDetailFull: (id: string) => Promise<{
    stage: import("../../index").Stage & {
        _id: import("mongoose").Types.ObjectId;
    };
    challenges: (Challenge & {
        _id: import("mongoose").Types.ObjectId;
    })[];
}>;
declare const StageService: {
    list: (params: Partial<StageListParams>) => Promise<{
        list: (import("../../index").Stage & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        page: number;
        totalItems: number;
        totalPages: number;
    }>;
    create: (payload: StagePayload) => Promise<import("../../index").Stage & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    detail: (id: string, session?: ClientSession) => Promise<import("../../index").Stage & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update: (id: string, payload: StagePayload) => Promise<import("../../index").Stage & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("../../index").Stage> & import("../../index").Stage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    verify: (id: string) => Promise<import("../../index").Stage & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    publish: (id: string) => Promise<{
        stage: import("../../index").Stage & {
            _id: import("mongoose").Types.ObjectId;
        };
        challenges: (Challenge & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    detailFull: (id: string) => Promise<{
        stage: import("../../index").Stage & {
            _id: import("mongoose").Types.ObjectId;
        };
        challenges: (Challenge & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
};
export default StageService;
//# sourceMappingURL=index.d.ts.map
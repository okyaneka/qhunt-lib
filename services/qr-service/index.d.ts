import { QrListParams, QrPayload, QrUpdatePayload } from "../../index";
import { ClientSession } from "mongoose";
export declare const list: (params: Partial<QrListParams>) => Promise<{
    list: (import("../../index").Qr & {
        _id: import("mongoose").Types.ObjectId;
    })[];
    page: number | undefined;
    totalItems: number;
    totalPages: number;
}>;
export declare const QrGenerate: (count: number, session?: ClientSession) => Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("../../index").Qr> & import("../../index").Qr & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Omit<QrPayload[], "_id">>[]>;
export declare const detail: (id: string) => Promise<import("../../index").Qr & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const details: (ids: string[]) => Promise<(import("../../index").Qr & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare const QrUpdate: (id: string, payload: QrUpdatePayload, session?: ClientSession) => Promise<import("../../index").Qr & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const _delete: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("../../index").Qr> & import("../../index").Qr & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const deleteMany: (ids: string[]) => Promise<import("mongoose").UpdateWriteOpResult>;
export declare const verify: (code: string, TID: string) => Promise<import("../../index").QrContent>;
declare const QrService: {
    readonly generate: (count: number, session?: ClientSession) => Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("../../index").Qr> & import("../../index").Qr & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, Omit<QrPayload[], "_id">>[]>;
    readonly list: (params: Partial<QrListParams>) => Promise<{
        list: (import("../../index").Qr & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        page: number | undefined;
        totalItems: number;
        totalPages: number;
    }>;
    readonly detail: (id: string) => Promise<import("../../index").Qr & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    readonly details: (ids: string[]) => Promise<(import("../../index").Qr & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    readonly update: (id: string, payload: QrUpdatePayload, session?: ClientSession) => Promise<import("../../index").Qr & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    readonly delete: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("../../index").Qr> & import("../../index").Qr & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly deleteMany: (ids: string[]) => Promise<import("mongoose").UpdateWriteOpResult>;
    readonly verify: (code: string, TID: string) => Promise<import("../../index").QrContent>;
};
export default QrService;
//# sourceMappingURL=index.d.ts.map
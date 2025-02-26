import { QrListParams, QrPayload, QrUpdatePayload } from "../..";
export declare const list: (params: Partial<QrListParams>) => Promise<{
    list: (import("../..").Qr & {
        _id: import("mongoose").Types.ObjectId;
    })[];
    page: number | undefined;
    totalItems: number;
    totalPages: number;
}>;
export declare const generate: (count: number) => Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("../..").Qr> & import("../..").Qr & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Omit<QrPayload, "_id">>[]>;
export declare const detail: (id: string) => Promise<import("../..").Qr & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const details: (ids: string[]) => Promise<(import("../..").Qr & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare const update: (id: string, payload: QrUpdatePayload) => Promise<import("../..").Qr & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const _delete: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("../..").Qr> & import("../..").Qr & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const deleteMany: (ids: string[]) => Promise<import("mongoose").UpdateWriteOpResult>;
export declare const verify: (code: string, TID: string) => Promise<import("../..").QrContent>;
declare const QrService: {
    generate: (count: number) => Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("../..").Qr> & import("../..").Qr & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, Omit<QrPayload, "_id">>[]>;
    list: (params: Partial<QrListParams>) => Promise<{
        list: (import("../..").Qr & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        page: number | undefined;
        totalItems: number;
        totalPages: number;
    }>;
    detail: (id: string) => Promise<import("../..").Qr & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    details: (ids: string[]) => Promise<(import("../..").Qr & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    update: (id: string, payload: QrUpdatePayload) => Promise<import("../..").Qr & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("../..").Qr> & import("../..").Qr & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteMany: (ids: string[]) => Promise<import("mongoose").UpdateWriteOpResult>;
    verify: (code: string, TID: string) => Promise<import("../..").QrContent>;
};
export default QrService;
//# sourceMappingURL=index.d.ts.map
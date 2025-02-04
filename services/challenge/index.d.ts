import { ChallengeListParams, ChallengePayload } from "../../types";
export declare const list: (params: ChallengeListParams) => Promise<{
    list: (import("../../types").Challenge & {
        _id: import("mongoose").Types.ObjectId;
    })[];
    page: number;
    totalItems: number;
    totalPages: number;
}>;
export declare const create: (payload: ChallengePayload) => Promise<import("../../types").Challenge & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const detail: (id: string) => Promise<import("../../types").Challenge & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const update: (id: string, payload: ChallengePayload) => Promise<import("../../types").Challenge & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const updateContent: (id: string, contents: string[]) => Promise<import("../../types").Challenge & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const _delete: (id: string) => Promise<import("../../types").Challenge & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const verify: (id: string) => Promise<import("../../types").Challenge & {
    _id: import("mongoose").Types.ObjectId;
}>;
declare const ChallengeService: {
    readonly list: (params: ChallengeListParams) => Promise<{
        list: (import("../../types").Challenge & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        page: number;
        totalItems: number;
        totalPages: number;
    }>;
    readonly create: (payload: ChallengePayload) => Promise<import("../../types").Challenge & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    readonly detail: (id: string) => Promise<import("../../types").Challenge & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    readonly update: (id: string, payload: ChallengePayload) => Promise<import("../../types").Challenge & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    readonly updateContent: (id: string, contents: string[]) => Promise<import("../../types").Challenge & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    readonly delete: (id: string) => Promise<import("../../types").Challenge & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    readonly verify: (id: string) => Promise<import("../../types").Challenge & {
        _id: import("mongoose").Types.ObjectId;
    }>;
};
export default ChallengeService;
//# sourceMappingURL=index.d.ts.map
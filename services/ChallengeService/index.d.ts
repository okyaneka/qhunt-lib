import { ChallengeListParams, ChallengePayload } from "../../models/ChallengeModel";
export declare const list: (params: ChallengeListParams) => Promise<{
    list: (import("../../models/ChallengeModel").Challenge & {
        _id: import("mongoose").Types.ObjectId;
    })[];
    page: number;
    totalItems: number;
    totalPages: number;
}>;
export declare const create: (payload: ChallengePayload) => Promise<import("../../models/ChallengeModel").Challenge & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const detail: (id: string) => Promise<import("../../models/ChallengeModel").Challenge & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const update: (id: string, payload: ChallengePayload) => Promise<import("../../models/ChallengeModel").Challenge & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const updateContent: (id: string, contents: string[]) => Promise<import("../../models/ChallengeModel").Challenge & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const _delete: (id: string) => Promise<import("../../models/ChallengeModel").Challenge & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const verify: (id: string) => Promise<import("../../models/ChallengeModel").Challenge & {
    _id: import("mongoose").Types.ObjectId;
}>;
declare const ChallengeService: {
    list: (params: ChallengeListParams) => Promise<{
        list: (import("../../models/ChallengeModel").Challenge & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        page: number;
        totalItems: number;
        totalPages: number;
    }>;
    create: (payload: ChallengePayload) => Promise<import("../../models/ChallengeModel").Challenge & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    detail: (id: string) => Promise<import("../../models/ChallengeModel").Challenge & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update: (id: string, payload: ChallengePayload) => Promise<import("../../models/ChallengeModel").Challenge & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateContent: (id: string, contents: string[]) => Promise<import("../../models/ChallengeModel").Challenge & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete: (id: string) => Promise<import("../../models/ChallengeModel").Challenge & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    verify: (id: string) => Promise<import("../../models/ChallengeModel").Challenge & {
        _id: import("mongoose").Types.ObjectId;
    }>;
};
export default ChallengeService;
//# sourceMappingURL=index.d.ts.map
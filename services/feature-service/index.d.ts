import { Feature, FeatureListParams, FeaturePayload } from "../../types/feature";
export declare const FeatureList: (params?: Partial<FeatureListParams>) => Promise<{
    list: (Feature & {
        _id: import("mongoose").Types.ObjectId;
    })[];
    page: number;
    totalItems: number;
    totalPages: number;
}>;
export declare const FeatureCreate: (payload: FeaturePayload) => Promise<Feature>;
export declare const FeatureDetail: (id: string) => Promise<Feature & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const FeatureUpdate: (id: string, payload: FeaturePayload) => Promise<Feature>;
export declare const FeatureDelete: (id: string) => Promise<{}>;
export declare const FeaturePublished: (type: string, slug: string) => Promise<Feature & {
    _id: import("mongoose").Types.ObjectId;
}>;
declare const FeatureService: {
    readonly list: (params?: Partial<FeatureListParams>) => Promise<{
        list: (Feature & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        page: number;
        totalItems: number;
        totalPages: number;
    }>;
    readonly create: (payload: FeaturePayload) => Promise<Feature>;
    readonly detail: (id: string) => Promise<Feature & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    readonly update: (id: string, payload: FeaturePayload) => Promise<Feature>;
    readonly delete: (id: string) => Promise<{}>;
    readonly published: (type: string, slug: string) => Promise<Feature & {
        _id: import("mongoose").Types.ObjectId;
    }>;
};
export default FeatureService;
//# sourceMappingURL=index.d.ts.map
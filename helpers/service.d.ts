import { Model } from "mongoose";
export declare const list: <T>(model: Model<T>, page: number, limit: number, filters?: Record<string, any>, sort?: any) => Promise<{
    list: import("mongoose").Require_id<T>[];
    page: number;
    totalItems: number;
    totalPages: number;
}>;
declare const service: {
    list: <T>(model: Model<T>, page: number, limit: number, filters?: Record<string, any>, sort?: any) => Promise<{
        list: import("mongoose").Require_id<T>[];
        page: number;
        totalItems: number;
        totalPages: number;
    }>;
};
export default service;
//# sourceMappingURL=service.d.ts.map
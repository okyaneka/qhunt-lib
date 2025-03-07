import { ClientSession } from "mongoose";
import { S3Payload } from "../../types/s3";
export declare const S3ServiceSet: (payload: S3Payload, userId?: string, session?: ClientSession) => Promise<import("../../types/s3").S3 & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const S3ServiceGet: (path: string) => Promise<import("../../types/s3").S3 & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const S3ServiceDelete: (key: string, session?: ClientSession) => Promise<import("../../plugins/aws-s3").DeleteObjectCommandOutput>;
declare const S3Service: {
    readonly set: (payload: S3Payload, userId?: string, session?: ClientSession) => Promise<import("../../types/s3").S3 & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    readonly get: (path: string) => Promise<import("../../types/s3").S3 & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    readonly delete: (key: string, session?: ClientSession) => Promise<import("../../plugins/aws-s3").DeleteObjectCommandOutput>;
};
export default S3Service;
//# sourceMappingURL=index.d.ts.map
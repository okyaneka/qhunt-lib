import { ClientSession } from "mongoose";
import { S3Payload } from "../../types/s3";
export declare const set: (payload: S3Payload, userId: string, session?: ClientSession) => Promise<import("../../types").S3 & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const get: (path: string) => Promise<void>;
export declare const _delete: (key: string) => Promise<import("@aws-sdk/client-s3").DeleteObjectCommandOutput | undefined>;
declare const S3Service: {
    readonly set: (payload: S3Payload, userId: string, session?: ClientSession) => Promise<import("../../types").S3 & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    readonly get: (path: string) => Promise<void>;
    readonly delete: (key: string) => Promise<import("@aws-sdk/client-s3").DeleteObjectCommandOutput | undefined>;
};
export default S3Service;
//# sourceMappingURL=index.d.ts.map
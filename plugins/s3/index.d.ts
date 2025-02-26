import { S3ClientConfig } from "@aws-sdk/client-s3";
import { S3Payload } from "../../types/s3";
export * from "@aws-sdk/client-s3";
export type S3Options = S3ClientConfig & {
    bucket: string;
};
export declare class S3Helper {
    status: number;
    private bucket;
    private client;
    constructor();
    init({ bucket, ...config }: S3Options): void;
    private initiate;
    put(payload: S3Payload): Promise<{
        fileName: string;
        size: number | undefined;
        fileUrl: string;
    } | undefined>;
    delete(key: string): Promise<import("@aws-sdk/client-s3").DeleteObjectCommandOutput | undefined>;
}
declare const _default: S3Helper;
export default _default;
//# sourceMappingURL=index.d.ts.map
import AwsS3, { S3ClientConfig } from "@aws-sdk/client-s3";
import { S3Payload } from "../../types/s3";
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
    private getClient;
    private getBucket;
    put(payload: S3Payload): Promise<{
        fileName: string;
        size: number | undefined;
        fileUrl: string;
    }>;
    delete(key: string): Promise<AwsS3.DeleteObjectCommandOutput>;
}
export * from "@aws-sdk/client-s3";
export declare const awsS3: S3Helper;
export default AwsS3;

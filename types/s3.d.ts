import { Timestamps } from "..";
import { UserForeign } from "./user";
export interface S3Payload {
    buffer: Buffer;
    mimetype: string;
    filename: string;
}
export type S3Foreign = Pick<S3, "fileName" | "fileUrl" | "fileSize">;
export interface S3 extends Timestamps {
    id: string;
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
    user: UserForeign;
}

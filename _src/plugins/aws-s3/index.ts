import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  HeadBucketCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
  S3ClientConfig,
} from "@aws-sdk/client-s3";
import { S3Payload } from "~/types/s3";
import slugify from "slugify";

const prefix = "\x1b[38;5;165mS3:\x1b[0m";

export type S3Options = S3ClientConfig & { bucket: string };

export class S3Helper {
  public status: number = 0;
  private bucket: string | null;
  private client: S3Client | null;

  constructor() {
    this.bucket = null;
    this.client = null;
  }

  init({ bucket, ...config }: S3Options) {
    this.bucket = bucket;
    this.client = new S3Client(config);
    this.initiate();
  }

  private async initiate() {
    if (!(this.client && this.bucket)) return;
    this.status = 1;
    this.client
      .send(new HeadBucketCommand({ Bucket: this.bucket }))
      .then(() => {
        console.log(prefix, "Aws S3 connected successfully!");
      })
      .catch((err) => {
        console.log(prefix, "❌ Aws S3 Error:", err.message);
      });
  }

  private getClient() {
    if (!this.client) throw new Error("Aws S3 has not been setup yet");
    return this.client;
  }

  private getBucket() {
    if (!this.bucket) throw new Error("S3 Bucket has not been setup yet");

    return this.bucket;
  }

  async put(payload: S3Payload) {
    const client = this.getClient();
    const bucket = this.getBucket();

    const { buffer, filename, mimetype } = payload;
    const names = filename.split(".");
    const ext = names.length > 1 ? "." + names.pop() : "";
    const unique = Date.now().toString(36);
    const finalName = names
      .join(".")
      .split("/")
      .map((part) => slugify(part, { lower: true }))
      .join("/");
    const Key = `${finalName}-${unique}${ext}`;

    const config: PutObjectCommandInput = {
      Bucket: bucket,
      Key,
      Body: buffer,
      ContentType: mimetype,
      ACL: "public-read",
    };

    const command = new PutObjectCommand(config);
    const region = await client.config.region();

    const res = await client.send(command);
    console.log(prefix, `success put file`);

    return {
      fileName: Key,
      size: res.Size,
      fileUrl: `https://${bucket}.s3.${region}.amazonaws.com/${Key}`,
    };
  }

  async delete(key: string) {
    const client = this.getClient();
    const bucket = this.getBucket();

    const config: DeleteObjectCommandInput = {
      Bucket: bucket,
      Key: key,
    };

    const command = new DeleteObjectCommand(config);
    const res = await client.send(command);
    console.log(prefix, `success delete file`);
    return res;
  }
}

const globalInstance = globalThis as typeof globalThis & {
  __S3_HELPER__?: S3Helper;
};

if (!globalInstance.__S3_HELPER__)
  globalInstance.__S3_HELPER__ = new S3Helper();

export * from "@aws-sdk/client-s3";
export const awsS3 = globalInstance.__S3_HELPER__ as S3Helper;
export default S3Helper;

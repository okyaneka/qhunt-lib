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

const prefix = "\x1b[0;92mS3:\x1b[0m";

export * from "@aws-sdk/client-s3";

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

  async put(payload: S3Payload) {
    if (!(this.client && this.bucket)) return;
    const { buffer, filename, mimetype } = payload;
    const names = filename.split(".");
    const ext = names.pop();
    const Key = `${names.join(".")}-${Date.now()}.${ext}`;

    const config: PutObjectCommandInput = {
      Bucket: this.bucket,
      Key,
      Body: buffer,
      ContentType: mimetype,
      ACL: "public-read",
    };

    const command = new PutObjectCommand(config);
    const region = await this.client.config.region();

    const res = await this.client.send(command);

    return {
      fileName: Key,
      size: res.Size,
      fileUrl: `https://${this.bucket}.s3.${region}.amazonaws.com/${Key}`,
    };
  }

  async delete(key: string) {
    if (!(this.client && this.bucket)) return;
    const config: DeleteObjectCommandInput = {
      Bucket: this.bucket,
      Key: key,
    };

    const command = new DeleteObjectCommand(config);
    const res = await this.client.send(command);
    return res;
  }
}

const globalInstance = globalThis as typeof globalThis & {
  __S3_HELPER__?: S3Helper;
};

if (!globalInstance.__S3_HELPER__) {
  globalInstance.__S3_HELPER__ = new S3Helper();
}

export default globalInstance.__S3_HELPER__ as S3Helper;

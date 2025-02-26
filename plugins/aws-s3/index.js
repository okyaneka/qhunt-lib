'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var AwsS3 = require('@aws-sdk/client-s3');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var AwsS3__default = /*#__PURE__*/_interopDefault(AwsS3);

// _src/plugins/aws-s3/index.ts
var prefix = "\x1B[0;92mS3:\x1B[0m";
var S3Helper = class {
  status = 0;
  bucket;
  client;
  constructor() {
    this.bucket = null;
    this.client = null;
  }
  init({ bucket, ...config }) {
    this.bucket = bucket;
    this.client = new AwsS3.S3Client(config);
    this.initiate();
  }
  async initiate() {
    if (!(this.client && this.bucket)) return;
    this.status = 1;
    this.client.send(new AwsS3.HeadBucketCommand({ Bucket: this.bucket })).then(() => {
      console.log(prefix, "Aws S3 connected successfully!");
    }).catch((err) => {
      console.log(prefix, "\u274C Aws S3 Error:", err.message);
    });
  }
  getClient() {
    if (!this.client) throw new Error("Aws S3 has not been setup yet");
    return this.client;
  }
  getBucket() {
    if (!this.bucket) throw new Error("S3 Bucket has not been setup yet");
    return this.bucket;
  }
  async put(payload) {
    const client = this.getClient();
    const bucket = this.getBucket();
    const { buffer, filename, mimetype } = payload;
    const names = filename.split(".");
    const ext = names.pop();
    const Key = `${names.join(".")}-${Date.now()}.${ext}`;
    const config = {
      Bucket: bucket,
      Key,
      Body: buffer,
      ContentType: mimetype,
      ACL: "public-read"
    };
    const command = new AwsS3.PutObjectCommand(config);
    const region = await client.config.region();
    const res = await client.send(command);
    return {
      fileName: Key,
      size: res.Size,
      fileUrl: `https://${bucket}.s3.${region}.amazonaws.com/${Key}`
    };
  }
  async delete(key) {
    const client = this.getClient();
    const bucket = this.getBucket();
    const config = {
      Bucket: bucket,
      Key: key
    };
    const command = new AwsS3.DeleteObjectCommand(config);
    const res = await client.send(command);
    return res;
  }
};
var globalInstance = globalThis;
if (!globalInstance.__S3_HELPER__)
  globalInstance.__S3_HELPER__ = new S3Helper();
var awsS3 = globalInstance.__S3_HELPER__;
var aws_s3_default = AwsS3__default.default;

exports.S3Helper = S3Helper;
exports.awsS3 = awsS3;
exports.default = aws_s3_default;
Object.keys(AwsS3).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return AwsS3[k]; }
  });
});

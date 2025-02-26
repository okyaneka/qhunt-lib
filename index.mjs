export { default as mongoose } from 'mongoose';
import * as Redis from 'ioredis';
import Redis__default from 'ioredis';
import { randomUUID } from 'crypto';
import * as client_s3_star from '@aws-sdk/client-s3';
import { S3Client, HeadBucketCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget);

// _src/helpers/types/index.ts
var PUBLISHING_STATUS = {
  Draft: "draft",
  Publish: "publish"
};

// _src/types/challenge/index.ts
var CHALLENGE_STATUS = PUBLISHING_STATUS;
var CHALLENGE_TYPES = {
  Trivia: "trivia",
  PhotoHunt: "photohunt"
};

// _src/types/photo-hunt/index.ts
var PHOTO_HUNT_STATUS = PUBLISHING_STATUS;

// _src/types/qr/index.ts
var QR_STATUS = PUBLISHING_STATUS;
var QR_CONTENT_TYPES = {
  Stage: "stage",
  Challenge: "challenge",
  Trivia: "trivia",
  PhotoHunt: "photohunt"
};

// _src/types/stage/index.ts
var STAGE_STATUS = PUBLISHING_STATUS;

// _src/types/user/index.ts
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["Admin"] = "admin";
  UserRole2["Private"] = "private";
  UserRole2["Public"] = "public";
  return UserRole2;
})(UserRole || {});

// _src/types/user-challenge/index.ts
var USER_CHALLENGE_STATUS = {
  Undiscovered: "undiscovered",
  Discovered: "discovered",
  OnGoing: "ongoing",
  Completed: "completed",
  Failed: "failed"
};

// _src/types/user-public/index.ts
var USER_PUBLIC_GENDER = {
  Male: "male",
  Female: "female",
  Panda: "panda"
};

// _src/types/user-stage/index.ts
var UserStageStatus = /* @__PURE__ */ ((UserStageStatus2) => {
  UserStageStatus2["OnGoing"] = "ongoing";
  UserStageStatus2["Completed"] = "completed";
  UserStageStatus2["End"] = "end";
  return UserStageStatus2;
})(UserStageStatus || {});

// _src/types/leaderboard/index.ts
var LEADERBOARD_MODE = {
  Ranks: "ranks",
  Current: "current"
};

// _src/plugins/redis/index.ts
var redis_exports = {};
__export(redis_exports, {
  RedisHelper: () => RedisHelper,
  default: () => redis_default
});
__reExport(redis_exports, Redis);
var prefix = "\x1B[35mREDIS:\x1B[0m";
var RedisHelper = class {
  status = 0;
  client = null;
  subscr = null;
  messageHandlers = [];
  constructor() {
  }
  init(options) {
    this.client = new Redis__default(options);
    this.subscr = new Redis__default(options);
    this.initiate();
  }
  initiate() {
    if (!(this.client && this.subscr)) return;
    this.status = 1;
    this.client.on(
      "connect",
      () => console.log(prefix, "Redis connected successfully!")
    );
    this.client.on("error", (err) => console.error("\u274C Redis Error:", err));
    this.subscr.on("message", async (channel, message) => {
      const handlers = this.messageHandlers.filter(
        (v) => v.channel === channel
      );
      const data = await Promise.resolve().then(() => JSON.parse(message)).catch(() => message);
      handlers.forEach((handler) => {
        console.log(
          prefix,
          `message received from ${channel} to id ${handler.id}`
        );
        handler.callback(data);
      });
    });
  }
  async get(key) {
  }
  async set(key) {
  }
  async del(key) {
  }
  async pub(channel, data) {
    if (!this.client) return;
    const message = typeof data == "string" ? data : JSON.stringify(data);
    console.log(prefix, `message published to ${channel}`);
    await this.client.publish(channel, message);
  }
  async sub(channel, callback) {
    if (!this.subscr) return;
    await this.subscr.subscribe(channel);
    const handler = {
      id: randomUUID(),
      channel,
      callback
    };
    this.messageHandlers.push(handler);
    console.log(prefix, `channel ${channel} subscribed with id ${handler.id}`);
    return () => {
      const index = this.messageHandlers.findIndex(
        ({ id }) => id === handler.id
      );
      if (index !== -1) this.messageHandlers.splice(index, 1);
      console.log(
        prefix,
        `channel ${channel} with id ${handler.id} unsubscribed`
      );
    };
  }
};
var globalInstance = globalThis;
if (!globalInstance.__REDIS_HELPER__) {
  globalInstance.__REDIS_HELPER__ = new RedisHelper();
}
var redis_default = globalInstance.__REDIS_HELPER__;

// _src/plugins/s3/index.ts
var s3_exports = {};
__export(s3_exports, {
  S3Helper: () => S3Helper,
  default: () => s3_default
});
__reExport(s3_exports, client_s3_star);
var prefix2 = "\x1B[0;92mS3:\x1B[0m";
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
    this.client = new S3Client(config);
    this.initiate();
  }
  async initiate() {
    if (!(this.client && this.bucket)) return;
    this.status = 1;
    this.client.send(new HeadBucketCommand({ Bucket: this.bucket })).then(() => {
      console.log(prefix2, "Aws S3 connected successfully!");
    }).catch((err) => {
      console.log(prefix2, "\u274C Aws S3 Error:", err.message);
    });
  }
  async put(payload) {
    if (!(this.client && this.bucket)) return;
    const { buffer, filename, mimetype } = payload;
    const names = filename.split(".");
    const ext = names.pop();
    const Key = `${names.join(".")}-${Date.now()}.${ext}`;
    const config = {
      Bucket: this.bucket,
      Key,
      Body: buffer,
      ContentType: mimetype,
      ACL: "public-read"
    };
    const command = new PutObjectCommand(config);
    const region = await this.client.config.region();
    const res = await this.client.send(command);
    return {
      fileName: Key,
      size: res.Size,
      fileUrl: `https://${this.bucket}.s3.${region}.amazonaws.com/${Key}`
    };
  }
  async delete(key) {
    if (!(this.client && this.bucket)) return;
    const config = {
      Bucket: this.bucket,
      Key: key
    };
    const command = new DeleteObjectCommand(config);
    const res = await this.client.send(command);
    return res;
  }
};
var globalInstance2 = globalThis;
if (!globalInstance2.__S3_HELPER__) {
  globalInstance2.__S3_HELPER__ = new S3Helper();
}
var s3_default = globalInstance2.__S3_HELPER__;

export { CHALLENGE_STATUS, CHALLENGE_TYPES, LEADERBOARD_MODE, PHOTO_HUNT_STATUS, PUBLISHING_STATUS, QR_CONTENT_TYPES, QR_STATUS, redis_default as RedisHelper, s3_default as S3Helper, STAGE_STATUS, USER_CHALLENGE_STATUS, USER_PUBLIC_GENDER, UserRole, UserStageStatus };

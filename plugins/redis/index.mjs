import Redis__default from 'ioredis';
export * from 'ioredis';
import { randomUUID } from 'crypto';

// _src/plugins/redis/index.ts
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

export { RedisHelper, redis_default as default };

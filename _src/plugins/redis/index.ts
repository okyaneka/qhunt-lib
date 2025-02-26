import Redis, { RedisOptions } from "ioredis";
import { RedisChannel, RedisKey } from "./types";
import { randomUUID } from "crypto";

export * from "ioredis";

type Callback<T> = (data: T) => Promise<void | any> | void | any;
type MessageHandler<T = unknown> = {
  id: string;
  channel: RedisChannel;
  callback: Callback<T>;
};

const prefix = "\x1b[35mREDIS:\x1b[0m";

export class RedisHelper {
  public status: number = 0;
  private client: Redis | null = null;
  private subscr: Redis | null = null;
  private messageHandlers: MessageHandler<any>[] = [];

  constructor() {}

  init(options: RedisOptions) {
    this.client = new Redis(options);
    this.subscr = new Redis(options);
    this.initiate();
  }

  initiate() {
    if (!(this.client && this.subscr)) return;
    this.status = 1;
    this.client.on("connect", () =>
      console.log(prefix, "Redis connected successfully!")
    );
    this.client.on("error", (err) => console.error("❌ Redis Error:", err));
    this.subscr.on("message", async (channel, message) => {
      const handlers = this.messageHandlers.filter(
        (v) => v.channel === channel
      );

      const data = await Promise.resolve()
        .then(() => JSON.parse(message))
        .catch(() => message);

      handlers.forEach((handler) => {
        console.log(
          prefix,
          `message received from ${channel} to id ${handler.id}`
        );
        handler.callback(data);
      });
    });
  }

  async get(key: RedisKey) {}

  async set(key: RedisKey) {}

  async del(key: RedisKey) {}

  async pub<T>(channel: RedisChannel, data: T) {
    if (!this.client) return;
    const message = typeof data == "string" ? data : JSON.stringify(data);
    console.log(prefix, `message published to ${channel}`);
    await this.client.publish(channel, message);
  }

  async sub<T>(channel: RedisChannel, callback: Callback<T>) {
    if (!this.subscr) return;
    await this.subscr.subscribe(channel);

    const handler: MessageHandler<T> = {
      id: randomUUID(),
      channel,
      callback,
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
}

const globalInstance = globalThis as typeof globalThis & {
  __REDIS_HELPER__?: RedisHelper;
};

if (!globalInstance.__REDIS_HELPER__) {
  globalInstance.__REDIS_HELPER__ = new RedisHelper();
}

export default globalInstance.__REDIS_HELPER__ as RedisHelper;

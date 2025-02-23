import Redis, { RedisOptions } from "ioredis";
import { RedisChannel, RedisKey } from "./types";
import { randomUUID } from "crypto";

const prefix = "\x1b[35mREDIS:\x1b[0m";

export * from "ioredis";

type Callback<T> = (data: T) => Promise<void> | void;
type MessageHandler<T = unknown> = {
  id: string;
  channel: RedisChannel;
  callback: Callback<T>;
};

class RedisHelper {
  private client: Redis;
  private messageHandlers: MessageHandler<any>[] = [];

  constructor(options: RedisOptions) {
    this.client = new Redis(options);

    this.client.on("connect", () =>
      console.log(prefix, "Redis connected successfully!")
    );
    this.client.on("error", (err) => console.error("❌ Redis Error:", err));
    this.client.on("message", async (channel, message) => {
      const handlers = this.messageHandlers.filter(
        (v) => v.channel === channel
      );

      const data = await Promise.resolve()
        .then(() => JSON.parse(message))
        .catch(() => message);

      handlers.forEach((handler) => {
        // pengecekan sebelum hit, ya sebenernya ini bakal di hit ke semua
        // tapi hanya ke id yang terkait yang akan dapat datanya.
        // sekarang, gimana caranya
        // sekarang coba aja tanpa id dengan multi koneksi, apakah callback akan hit 2x atau hanya 1x

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
    const message = typeof data == "string" ? data : JSON.stringify(data);
    console.log(prefix, `message published to ${channel}`);
    await this.client.publish(channel, message);
  }

  async sub<T>(channel: RedisChannel, callback: Callback<T>) {
    await this.client.subscribe(channel);

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

export default RedisHelper;

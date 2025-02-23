import Redis, { RedisOptions } from "ioredis";

export * from "ioredis";

class RedisHelper {
  private client: Redis;

  constructor(options: RedisOptions) {
    this.client = new Redis(options);

    this.client.on("connect", () =>
      console.log("Redis connected successfully!")
    );
    this.client.on("error", (err) => console.error("❌ Redis Error:", err));
  }
}

export default RedisHelper;

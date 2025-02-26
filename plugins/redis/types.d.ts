import { ValueOf } from "../../helpers/types";
declare const REDIS_KEYS: {};
declare const REDIS_CHANNELS: {
    readonly Leaderboard: "leaderboard";
    readonly UpdateUser: "update-user";
};
export type RedisKey = ValueOf<typeof REDIS_KEYS>;
export type RedisChannel = ValueOf<typeof REDIS_CHANNELS>;
export {};
//# sourceMappingURL=types.d.ts.map
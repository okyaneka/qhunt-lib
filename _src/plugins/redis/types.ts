import { ValueOf } from "~/helpers/types";

const REDIS_KEYS = {} as const;

const REDIS_CHANNELS = { UpdateUser: "update-user" } as const;

export type RedisKey = ValueOf<typeof REDIS_KEYS>;
export type RedisChannel = ValueOf<typeof REDIS_CHANNELS>;

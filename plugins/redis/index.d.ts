import { RedisOptions } from "ioredis";
import { RedisChannel, RedisKey } from "./types";
export * from "ioredis";
type Callback<T> = (data: T) => Promise<void | any> | void | any;
export declare class RedisHelper {
    status: number;
    private client;
    private subscr;
    private messageHandlers;
    constructor();
    init(options: RedisOptions): void;
    initiate(): void;
    get(key: RedisKey): Promise<void>;
    set(key: RedisKey): Promise<void>;
    del(key: RedisKey): Promise<void>;
    pub<T>(channel: RedisChannel, data: T): Promise<void>;
    sub<T>(channel: RedisChannel, callback: Callback<T>): Promise<(() => void) | undefined>;
}
declare const _default: RedisHelper;
export default _default;
//# sourceMappingURL=index.d.ts.map
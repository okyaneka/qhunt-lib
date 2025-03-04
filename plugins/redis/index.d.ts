import { RedisOptions } from "ioredis";
import { RedisChannel, RedisKey } from "../../index";
type RedisCallback<T> = (data: T) => Promise<any> | any;
export declare class RedisHelper {
    status: number;
    private client;
    private subscr;
    private messageHandlers;
    constructor();
    init(options: RedisOptions): void;
    private getClient;
    private getSubscr;
    initiate(): void;
    get(key: RedisKey): Promise<void>;
    set(key: RedisKey): Promise<void>;
    del(key: RedisKey): Promise<void>;
    pub<T>(channel: RedisChannel, data: T): Promise<void>;
    sub<T>(channel: RedisChannel, callback: RedisCallback<T>): Promise<(() => void) | undefined>;
}
export * from "ioredis";
export declare const redis: RedisHelper;
export default RedisHelper;
//# sourceMappingURL=index.d.ts.map
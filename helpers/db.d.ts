import { ClientSession } from "mongoose";
export declare const transaction: <T>(operation: (session: ClientSession) => Promise<T>, clientSession?: ClientSession) => Promise<T>;
declare const db: {
    transaction: <T>(operation: (session: ClientSession) => Promise<T>, clientSession?: ClientSession) => Promise<T>;
};
export default db;
//# sourceMappingURL=db.d.ts.map
import { ClientSession } from "mongoose";
export declare const transaction: <T>(operation: (session: ClientSession) => Promise<T>) => Promise<T>;
declare const db: {
    transaction: <T>(operation: (session: ClientSession) => Promise<T>) => Promise<T>;
};
export default db;
//# sourceMappingURL=index.d.ts.map
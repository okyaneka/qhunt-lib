import { S3Payload } from "../types/s3";
export declare const urlToBuffer: (photoURL: string) => Promise<Pick<S3Payload, "buffer" | "mimetype">>;
export { default as bonus } from "./bonus";
export { default as db } from "./db";
export { default as model } from "./model";
export { default as qrcode } from "./qrcode";
export { default as response } from "./response";
export { default as service } from "./service";
//# sourceMappingURL=index.d.ts.map
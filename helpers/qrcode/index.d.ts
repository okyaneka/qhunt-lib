export declare const scanByStream: (stream: MediaStream, el?: HTMLVideoElement) => Promise<import("@zxing/library").Result>;
export declare const scanByFile: (file: File) => Promise<import("@zxing/library").Result>;
declare const qrcode: {
    readonly scanByStream: (stream: MediaStream, el?: HTMLVideoElement) => Promise<import("@zxing/library").Result>;
    readonly scanByFile: (file: File) => Promise<import("@zxing/library").Result>;
};
export default qrcode;
//# sourceMappingURL=index.d.ts.map
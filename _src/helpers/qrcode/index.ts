import { BrowserQRCodeReader } from "@zxing/browser";

export const scanByStream = (stream: MediaStream, el?: HTMLVideoElement) => {
  const reader = new BrowserQRCodeReader();
  return reader.decodeOnceFromStream(stream, el);
};

export const scanByFile = (file: File) => {
  const reader = new BrowserQRCodeReader();
  const url = URL.createObjectURL(file);
  return reader.decodeFromImageUrl(url);
};

const qrcode = { scanByStream, scanByFile } as const;

export default qrcode;

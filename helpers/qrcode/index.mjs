import { BrowserQRCodeReader } from '@zxing/browser';

// _src/helpers/qrcode/index.ts
var scanByStream = (stream, el) => {
  const reader = new BrowserQRCodeReader();
  return reader.decodeOnceFromStream(stream, el);
};
var scanByFile = (file) => {
  const reader = new BrowserQRCodeReader();
  const url = URL.createObjectURL(file);
  return reader.decodeFromImageUrl(url);
};
var qrcode = { scanByStream, scanByFile };
var qrcode_default = qrcode;

export { qrcode_default as default, scanByFile, scanByStream };

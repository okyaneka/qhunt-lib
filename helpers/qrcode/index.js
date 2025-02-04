'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var browser = require('@zxing/browser');

// _src/helpers/qrcode/index.ts
var scanByStream = (stream, el) => {
  const reader = new browser.BrowserQRCodeReader();
  return reader.decodeOnceFromStream(stream, el);
};
var scanByFile = (file) => {
  const reader = new browser.BrowserQRCodeReader();
  const url = URL.createObjectURL(file);
  return reader.decodeFromImageUrl(url);
};
var qrcode = { scanByStream, scanByFile };
var qrcode_default = qrcode;

exports.default = qrcode_default;
exports.scanByFile = scanByFile;
exports.scanByStream = scanByStream;

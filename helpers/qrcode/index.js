"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// _src/helpers/qrcode/index.ts
var qrcode_exports = {};
__export(qrcode_exports, {
  default: () => qrcode_default,
  scanByFile: () => scanByFile,
  scanByStream: () => scanByStream
});
module.exports = __toCommonJS(qrcode_exports);
var import_browser = require("@zxing/browser");
var scanByStream = (stream, el) => {
  const reader = new import_browser.BrowserQRCodeReader();
  return reader.decodeOnceFromStream(stream, el);
};
var scanByFile = (file) => {
  const reader = new import_browser.BrowserQRCodeReader();
  const url = URL.createObjectURL(file);
  return reader.decodeFromImageUrl(url);
};
var qrcode = { scanByStream, scanByFile };
var qrcode_default = qrcode;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  scanByFile,
  scanByStream
});

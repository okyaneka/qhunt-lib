'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mongoose = require('mongoose');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var mongoose__default = /*#__PURE__*/_interopDefault(mongoose);

// _src/plugins/mongoose/index.ts
var mongoose_default = mongoose__default.default;

exports.default = mongoose_default;
Object.keys(mongoose).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return mongoose[k]; }
  });
});

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// _src/helpers/response.ts
var success = (data = null, message = "success") => {
  return {
    code: 200,
    message,
    data: data || {},
    error: {}
  };
};
var error = (error2 = null, message = "", code = 400) => {
  return {
    code,
    message,
    data: {},
    error: error2 || {}
  };
};
var errorValidation = (error2) => {
  const validation = error2?.details.reduce((car, cur) => {
    return { ...car, [cur.context?.key]: cur.message };
  }, {});
  return response.error({ validation }, "validation_error");
};
var response = { success, error, errorValidation };
var response_default = response;

exports.default = response_default;
exports.error = error;
exports.errorValidation = errorValidation;
exports.success = success;

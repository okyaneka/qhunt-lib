var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// _src/helpers/response/index.ts
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
  const validation = error2 == null ? void 0 : error2.details.reduce((car, cur) => {
    var _a;
    return __spreadProps(__spreadValues({}, car), { [(_a = cur.context) == null ? void 0 : _a.key]: cur.message });
  }, {});
  return response.error({ validation }, "validation error");
};
var response = { success, error, errorValidation };
var response_default = response;
export {
  response_default as default,
  error,
  errorValidation,
  success
};

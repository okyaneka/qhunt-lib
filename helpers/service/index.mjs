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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// _src/helpers/service/index.ts
var list = (_0, _1, _2, ..._3) => __async(void 0, [_0, _1, _2, ..._3], function* (model, page, limit, filters = {}) {
  const skip = (page - 1) * limit;
  const filter = __spreadProps(__spreadValues({}, filters), {
    deletedAt: null
  });
  const items = yield model.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
  const totalItems = yield model.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / limit);
  return {
    list: items.map((item) => item.toObject ? item.toObject() : item),
    page,
    totalItems,
    totalPages
  };
});
var service = { list };
var service_default = service;
export {
  service_default as default,
  list
};

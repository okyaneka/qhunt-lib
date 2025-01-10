"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// _src/services/UserService/index.ts
var UserService_exports = {};
__export(UserService_exports, {
  _delete: () => _delete,
  create: () => create,
  default: () => UserService_default,
  detail: () => detail,
  list: () => list,
  login: () => login,
  profile: () => profile,
  register: () => register,
  update: () => update
});
module.exports = __toCommonJS(UserService_exports);

// _src/models/UserModel/index.ts
var import_mongoose = require("mongoose");

// _src/models/UserModel/types.ts
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["Admin"] = "admin";
  UserRole2["Private"] = "private";
  UserRole2["Public"] = "public";
  return UserRole2;
})(UserRole || {});

// _src/models/UserModel/index.ts
var ToObject = {
  transform: (doc, ret) => {
    const _a = ret, { _id, __v, password } = _a, rest = __objRest(_a, ["_id", "__v", "password"]);
    return __spreadValues({ id: _id }, rest);
  }
};
var UserSchema = new import_mongoose.Schema(
  {
    name: { type: String, default: "" },
    role: { type: String, enum: Object.values(UserRole) },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    deletedAt: { type: Date, default: null }
  },
  {
    timestamps: true
  }
);
UserSchema.set("toJSON", ToObject);
UserSchema.set("toObject", ToObject);
var UserModel = import_mongoose.models.User || (0, import_mongoose.model)("User", UserSchema);
var UserModel_default = UserModel;

// _src/services/UserService/index.ts
var import_bcryptjs = require("bcryptjs");
var import_jsonwebtoken = require("jsonwebtoken");

// _src/helpers/db/index.ts
var import_mongoose2 = require("mongoose");
var transaction = (operation) => __async(void 0, null, function* () {
  const session = yield (0, import_mongoose2.startSession)();
  session.startTransaction();
  return yield operation(session).then((res) => __async(void 0, null, function* () {
    yield session.commitTransaction();
    return res;
  })).catch((err) => __async(void 0, null, function* () {
    yield session.abortTransaction();
    throw err;
  })).finally(() => {
    session.endSession();
  });
});
var db = { transaction };
var db_default = db;

// _src/helpers/schema/index.ts
var import_joi = __toESM(require("joi"));
var import_mongoose3 = require("mongoose");
var ToObject2 = {
  transform: (doc, ret) => {
    const _a = ret, { _id, deletedAt, __v } = _a, rest = __objRest(_a, ["_id", "deletedAt", "__v"]);
    return __spreadValues({ id: _id.toString() }, rest);
  }
};
var IdNameSchema = new import_mongoose3.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);
var PeriodSchema = new import_mongoose3.Schema(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  },
  { _id: false }
);

// _src/models/UserPublicModel/index.ts
var import_mongoose4 = require("mongoose");

// _src/models/UserPublicModel/types.ts
var UserPublicGender = /* @__PURE__ */ ((UserPublicGender2) => {
  UserPublicGender2["Male"] = "male";
  UserPublicGender2["Female"] = "female";
  UserPublicGender2["Panda"] = "panda";
  return UserPublicGender2;
})(UserPublicGender || {});

// _src/models/UserPublicModel/index.ts
var UserPublicForeignSchema = new import_mongoose4.Schema(
  {
    id: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String }
  },
  { _id: false }
);
var UserPublicSchema = new import_mongoose4.Schema(
  {
    user: { type: IdNameSchema, default: null },
    code: { type: String, required: true },
    name: { type: String, default: "" },
    dob: { type: Date, default: null },
    gender: {
      type: String,
      enum: Object.values(UserPublicGender),
      default: null
    },
    phone: { type: String, default: "" },
    lastAccessedAt: { type: Date, default: Date.now() },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);
UserPublicSchema.set("toJSON", ToObject2);
UserPublicSchema.set("toObject", ToObject2);
var UserPublicModel = import_mongoose4.models.UserPublic || (0, import_mongoose4.model)("UserPublic", UserPublicSchema, "usersPublic");
var UserPublicModel_default = UserPublicModel;

// _src/services/UserService/index.ts
var register = (payload, code) => __async(void 0, null, function* () {
  return yield db_default.transaction((session) => __async(void 0, null, function* () {
    const email = payload.email;
    const userExists = yield UserModel_default.findOne({ email }).session(session);
    if (userExists) throw new Error("email taken");
    const password = yield (0, import_bcryptjs.hash)(payload.password, 10);
    const [user] = yield UserModel_default.create(
      [
        {
          email,
          password,
          role: "public" /* Public */
        }
      ],
      { session }
    );
    yield UserPublicModel_default.findOneAndUpdate(
      { code },
      { $set: { user: { id: user._id, name: user.name } } },
      { new: true, session }
    );
    return user;
  }));
});
var login = (payload, secret) => __async(void 0, null, function* () {
  const email = payload.email;
  const user = yield UserModel_default.findOne({ email });
  if (!user) throw new Error("user not found");
  const isPasswordValid = yield (0, import_bcryptjs.compare)(payload.password, user.password);
  if (!isPasswordValid) throw new Error("invalid password");
  const userPublic = yield UserPublicModel_default.findOne({ "user.id": user._id });
  if (!userPublic) throw new Error("invalid user");
  const token = (0, import_jsonwebtoken.sign)({ id: user._id }, secret, {
    expiresIn: 30 * 24 * 60 * 60
  });
  const { _id: id, name } = user;
  return { id, name, email, TID: userPublic == null ? void 0 : userPublic.code, token };
});
var profile = (bearer) => __async(void 0, null, function* () {
});
var list = (params) => __async(void 0, null, function* () {
});
var create = (payload) => __async(void 0, null, function* () {
});
var detail = (id) => __async(void 0, null, function* () {
  const user = yield UserModel_default.findOne({ _id: id, deletedAt: null }).catch(() => {
  });
  if (!user) throw new Error("user not found");
  const meta = yield UserPublicModel_default.findOne({ "user.id": user._id }).catch(
    () => null
  );
  return __spreadProps(__spreadValues({}, user.toObject()), {
    meta: meta == null ? void 0 : meta.toObject({
      transform: (doc, ret) => {
        const _a = ret, { _id, user: user2, __v } = _a, data = __objRest(_a, ["_id", "user", "__v"]);
        return __spreadValues({ id: _id }, data);
      }
    })
  });
});
var update = (id, payload) => __async(void 0, null, function* () {
});
var _delete = (id) => __async(void 0, null, function* () {
});
var UserService = {
  register,
  login,
  profile,
  list,
  create,
  detail,
  update,
  delete: _delete
};
var UserService_default = UserService;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _delete,
  create,
  detail,
  list,
  login,
  profile,
  register,
  update
});

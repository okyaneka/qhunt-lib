import { Schema, models, model } from 'mongoose';
import { randomBytes, createHash } from 'crypto';

// _src/models/user-model/index.ts
new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);
new Schema(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  },
  { _id: false }
);
new Schema(
  {
    positive: { type: String, default: "" },
    negative: { type: String, default: "" }
  },
  { _id: false }
);
var ToObject = {
  transform: (doc, ret) => {
    const { _id, deletedAt, __v, ...rest } = ret;
    return { id: _id.toString(), ...rest };
  }
};

// _src/models/s3-model/index.ts
var S3ForeignSchema = new Schema(
  {
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileSize: { type: Number, required: true }
  },
  { _id: false }
);
var S3Schema = new Schema(
  {
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileSize: { type: Number, required: true },
    fileType: { type: String, required: true },
    user: { type: UserForeignSchema, required: true }
  },
  { timestamps: true }
);
S3Schema.set("toObject", ToObject);
S3Schema.set("toJSON", ToObject);
models.S3 || model("S3", S3Schema);

// _src/constants/index.ts
var USER_PROVIDERS = {
  Email: "email",
  Google: "google",
  TikTok: "tiktok"
};
var USER_ROLES = {
  Admin: "admin",
  Private: "private",
  Public: "public"
};
var USER_PUBLIC_GENDER = {
  Male: "male",
  Female: "female",
  Panda: "panda"
};

// _src/models/user-model/index.ts
var ToObject2 = {
  transform: (doc, ret) => {
    const { _id, __v, password, ...rest } = ret;
    return { id: _id, ...rest };
  }
};
var UserForeignSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, default: "" },
    email: { type: String, required: true },
    photo: { type: String, default: null }
  },
  { _id: false }
);
var UserSchema = new Schema(
  {
    name: { type: String, default: "" },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.Public
    },
    email: { type: String, required: true, unique: true },
    photo: { type: S3ForeignSchema, default: null },
    provider: {
      type: [String],
      enum: Object.values(USER_PROVIDERS),
      default: []
    },
    password: { type: String, default: null },
    deletedAt: { type: Date, default: null }
  },
  {
    timestamps: true
  }
);
UserSchema.set("toJSON", ToObject2);
UserSchema.set("toObject", ToObject2);
var UserModel = models.User || model("User", UserSchema);
var user_model_default = UserModel;
new Schema(
  {
    id: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String }
  },
  { _id: false }
);
var UserPublicSchema = new Schema(
  {
    user: { type: UserForeignSchema, default: null },
    code: { type: String, required: true },
    name: { type: String, default: "" },
    dob: { type: Date, default: null },
    gender: {
      type: String,
      enum: Object.values(USER_PUBLIC_GENDER),
      default: null
    },
    phone: { type: String, default: "" },
    lastAccessedAt: { type: Date, default: Date.now() },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);
UserPublicSchema.set("toJSON", ToObject);
UserPublicSchema.set("toObject", ToObject);
var UserPublicModel = models.UserPublic || model("UserPublic", UserPublicSchema, "usersPublic");
var user_public_model_default = UserPublicModel;
var verify = async (value, session) => {
  if (!value) throw new Error("token is required");
  const userPublic = await user_public_model_default.findOneAndUpdate(
    {
      $or: [{ "user.id": value }, { code: value }],
      deletedAt: null
    },
    { lastAccessedAt: /* @__PURE__ */ new Date() },
    { new: true, session }
  );
  if (!userPublic) throw new Error("invalid user");
  return userPublic.toObject();
};
var setup = async (userId) => {
  const timestamp = Date.now();
  const salt = randomBytes(4).toString("hex");
  const code = createHash("sha256").update(`${timestamp}${salt}`).digest("hex");
  const payload = { code };
  if (userId) {
    const userPublic = await user_public_model_default.findOne({
      "user.id": userId,
      deletedAt: null
    });
    if (userPublic) return userPublic.toObject();
    const user2 = await user_model_default.findOne({ _id: userId, deletedAt: null });
    if (user2) payload.user = { id: user2.id, name: user2.name };
  }
  const user = await user_public_model_default.create(payload);
  return user.toObject();
};
var UserPublicService = { verify, setup };
var user_public_service_default = UserPublicService;

export { user_public_service_default as default, setup, verify };

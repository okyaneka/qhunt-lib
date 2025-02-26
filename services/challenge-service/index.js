'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mongoose = require('mongoose');

// _src/helpers/db.ts
var transaction = async (operation) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  return await operation(session).then(async (res) => {
    await session.commitTransaction();
    return res;
  }).catch(async (err) => {
    await session.abortTransaction();
    throw err;
  }).finally(() => {
    session.endSession();
  });
};
var db = { transaction };
var db_default = db;

// _src/constants/index.ts
var PUBLISHING_STATUS = {
  Draft: "draft",
  Publish: "publish"
};
var CHALLENGE_STATUS = PUBLISHING_STATUS;
var CHALLENGE_TYPES = {
  Trivia: "trivia",
  PhotoHunt: "photohunt"
};
var STAGE_STATUS = PUBLISHING_STATUS;
var IdNameSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);
var PeriodSchema = new mongoose.Schema(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  },
  { _id: false }
);
var FeedbackSchema = new mongoose.Schema(
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

// _src/models/challenge-model/index.ts
var ChallengeSettingsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: Object.values(CHALLENGE_TYPES),
      required: true
    },
    duration: { type: Number },
    clue: { type: String },
    feedback: { type: FeedbackSchema }
  },
  { _id: false, versionKey: false }
);
new mongoose.Schema(
  {
    type: {
      type: String,
      enum: Object.values(CHALLENGE_TYPES),
      required: true
    },
    duration: { type: Number }
  },
  { _id: false }
);
new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    storyline: { type: [String], required: true },
    order: { type: Number, default: null }
  },
  { _id: false }
);
var ChallengeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    stage: { type: IdNameSchema, default: null },
    storyline: { type: [String] },
    status: {
      type: String,
      enum: Object.values(CHALLENGE_STATUS),
      default: CHALLENGE_STATUS.Draft
    },
    order: { type: Number, default: null },
    settings: { type: ChallengeSettingsSchema, default: null },
    contents: { type: [String] },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);
ChallengeSchema.set("toJSON", ToObject);
ChallengeSchema.set("toObject", ToObject);
var ChallengeModel = mongoose.models.Challenge || mongoose.model("Challenge", ChallengeSchema);
var challenge_model_default = ChallengeModel;
var StageSettingsSchema = new mongoose.Schema(
  {
    canDoRandomChallenges: { type: Boolean, default: false },
    canStartFromChallenges: { type: Boolean, default: false },
    periode: { type: PeriodSchema, default: null }
  },
  { _id: false }
);
var StageSettingsForeignSchema = new mongoose.Schema(
  {
    periode: { type: PeriodSchema, required: true }
  },
  { _id: false }
);
new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    storyline: { type: [String], required: true },
    settings: { type: StageSettingsForeignSchema, required: true }
  },
  { _id: false }
);
var StageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    storyline: { type: [String], default: [] },
    status: {
      type: String,
      enum: Object.values(STAGE_STATUS),
      default: STAGE_STATUS.Draft
    },
    settings: { type: StageSettingsSchema, required: true },
    contents: { type: [String], default: [] },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);
StageSchema.set("toObject", ToObject);
StageSchema.set("toJSON", ToObject);
var StageModel = mongoose.models.Stage || mongoose.model("Stage", StageSchema);
var stage_model_default = StageModel;

// _src/services/stage-service/index.ts
var detail = async (id) => {
  const item = await stage_model_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("stage not found");
  return item.toObject();
};

// _src/services/challenge-service/index.ts
var list = async (params) => {
  const skip = (params.page - 1) * params.limit;
  const filter = { deletedAt: null };
  if (params.stageId === "null") filter["stage"] = null;
  else if (params.stageId) filter["stage.id"] = params.stageId;
  if (params.type) filter["settings.type"] = params.type;
  const list2 = await challenge_model_default.find(filter).skip(skip).limit(params.limit).sort({ createdAt: -1 });
  const totalItems = await challenge_model_default.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / params.limit);
  return {
    list: list2.map((item) => item.toObject()),
    page: params.page,
    totalItems,
    totalPages
  };
};
var create = async (payload) => {
  return db_default.transaction(async (session) => {
    const { stageId, ...value } = payload;
    const stageData = stageId ? await detail(stageId) : null;
    const stage = stageData ? { id: stageData.id, name: stageData.name } : null;
    const [item] = await challenge_model_default.create([{ ...value, stage }], {
      session
    });
    if (stage) {
      const contents = stageData?.contents || [];
      contents.push(item.id);
      item.order = contents.length;
      await Promise.all([
        stage_model_default.findOneAndUpdate(
          { _id: stageId },
          { $set: { contents } },
          { session }
        ),
        item.save({ session })
      ]);
    }
    return item.toObject();
  });
};
var detail2 = async (id) => {
  const item = await challenge_model_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("challenge not found");
  return item.toObject();
};
var update = async (id, payload) => {
  return await db_default.transaction(async (session) => {
    const { stageId, ...value } = payload;
    const item = await challenge_model_default.findOne({ _id: id, deletedAt: null });
    if (!item) throw new Error("challenge not found");
    const newStage = stageId ? await detail(stageId) : null;
    const oldStage = item.stage?.id ? await detail(item.stage.id) : null;
    const newContent = newStage?.contents || [];
    const oldContent = oldStage?.contents || [];
    if (!newContent.includes(id)) newContent.push(id);
    if (oldContent.includes(id)) oldContent.splice(oldContent.indexOf(id), 1);
    await stage_model_default.findOneAndUpdate(
      { _id: newStage?.id },
      { $set: { contents: newContent } },
      { session }
    );
    await stage_model_default.findOneAndUpdate(
      { _id: oldStage?.id },
      { $set: { contents: oldContent } },
      { session }
    );
    const stage = newStage ? { id: newStage.id, name: newStage.name } : null;
    Object.assign(item, value, { stage });
    await item.save({ session });
    return item.toObject();
  });
};
var updateContent = async (id, contents) => {
  const item = await challenge_model_default.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { contents } },
    { new: true }
  );
  if (!item) throw new Error("challenge not found");
  return item.toObject();
};
var _delete = async (id) => {
  const item = await challenge_model_default.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { deletedAt: Date.now() } },
    { new: true }
  );
  if (!item) throw new Error("challenge not found");
  return item.toObject();
};
var verify = async (id) => {
  const item = await challenge_model_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("challenge not found");
  if (item.status !== CHALLENGE_STATUS.Publish)
    throw new Error("challenge not published yet");
  return item.toObject();
};
var ChallengeService = {
  list,
  create,
  detail: detail2,
  // detailContent,
  update,
  updateContent,
  delete: _delete,
  verify
};
var challenge_service_default = ChallengeService;

exports._delete = _delete;
exports.create = create;
exports.default = challenge_service_default;
exports.detail = detail2;
exports.list = list;
exports.update = update;
exports.updateContent = updateContent;
exports.verify = verify;

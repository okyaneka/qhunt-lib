'use strict';

var mongoose = require('mongoose');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var mongoose__default = /*#__PURE__*/_interopDefault(mongoose);

// _src/helpers/types/index.ts
var PUBLISHING_STATUS = {
  Draft: "draft",
  Publish: "publish"
};

// _src/types/challenge/index.ts
var CHALLENGE_STATUS = PUBLISHING_STATUS;
var CHALLENGE_TYPES = {
  Trivia: "trivia",
  PhotoHunt: "photohunt"
};

// _src/types/photo-hunt/index.ts
var PHOTO_HUNT_STATUS = PUBLISHING_STATUS;

// _src/types/qr/index.ts
var QR_STATUS = PUBLISHING_STATUS;
var QR_CONTENT_TYPES = {
  Stage: "stage",
  Challenge: "challenge",
  Trivia: "trivia",
  PhotoHunt: "photohunt"
};

// _src/types/stage/index.ts
var STAGE_STATUS = PUBLISHING_STATUS;

// _src/types/user/index.ts
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["Admin"] = "admin";
  UserRole2["Private"] = "private";
  UserRole2["Public"] = "public";
  return UserRole2;
})(UserRole || {});

// _src/types/user-challenge/index.ts
var USER_CHALLENGE_STATUS = {
  Undiscovered: "undiscovered",
  Discovered: "discovered",
  OnGoing: "ongoing",
  Completed: "completed",
  Failed: "failed"
};

// _src/types/user-public/index.ts
var UserPublicGender = /* @__PURE__ */ ((UserPublicGender2) => {
  UserPublicGender2["Male"] = "male";
  UserPublicGender2["Female"] = "female";
  UserPublicGender2["Panda"] = "panda";
  return UserPublicGender2;
})(UserPublicGender || {});

// _src/types/user-stage/index.ts
var UserStageStatus = /* @__PURE__ */ ((UserStageStatus2) => {
  UserStageStatus2["OnGoing"] = "ongoing";
  UserStageStatus2["Completed"] = "completed";
  UserStageStatus2["End"] = "end";
  return UserStageStatus2;
})(UserStageStatus || {});

Object.defineProperty(exports, "mongoose", {
  enumerable: true,
  get: function () { return mongoose__default.default; }
});
exports.CHALLENGE_STATUS = CHALLENGE_STATUS;
exports.CHALLENGE_TYPES = CHALLENGE_TYPES;
exports.PHOTO_HUNT_STATUS = PHOTO_HUNT_STATUS;
exports.PUBLISHING_STATUS = PUBLISHING_STATUS;
exports.QR_CONTENT_TYPES = QR_CONTENT_TYPES;
exports.QR_STATUS = QR_STATUS;
exports.STAGE_STATUS = STAGE_STATUS;
exports.USER_CHALLENGE_STATUS = USER_CHALLENGE_STATUS;
exports.UserPublicGender = UserPublicGender;
exports.UserRole = UserRole;
exports.UserStageStatus = UserStageStatus;

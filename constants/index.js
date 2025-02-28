'use strict';

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
var LEADERBOARD_MODE = { Ranks: "ranks", Current: "current" };
var PHOTO_HUNT_STATUS = PUBLISHING_STATUS;
var QR_CONTENT_TYPES = {
  Stage: "stage",
  Challenge: "challenge",
  Trivia: "trivia",
  PhotoHunt: "photohunt"
};
var QR_STATUS = PUBLISHING_STATUS;
var STAGE_STATUS = PUBLISHING_STATUS;
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
var USER_CHALLENGE_STATUS = {
  Undiscovered: "undiscovered",
  Discovered: "discovered",
  OnGoing: "ongoing",
  Completed: "completed",
  Failed: "failed"
};
var USER_PUBLIC_GENDER = {
  Male: "male",
  Female: "female",
  Panda: "panda"
};
var REDIS_KEYS = {};
var REDIS_CHANNELS = {
  Leaderboard: "leaderboard",
  UpdateUser: "update-user"
};

exports.CHALLENGE_STATUS = CHALLENGE_STATUS;
exports.CHALLENGE_TYPES = CHALLENGE_TYPES;
exports.LEADERBOARD_MODE = LEADERBOARD_MODE;
exports.PHOTO_HUNT_STATUS = PHOTO_HUNT_STATUS;
exports.PUBLISHING_STATUS = PUBLISHING_STATUS;
exports.QR_CONTENT_TYPES = QR_CONTENT_TYPES;
exports.QR_STATUS = QR_STATUS;
exports.REDIS_CHANNELS = REDIS_CHANNELS;
exports.REDIS_KEYS = REDIS_KEYS;
exports.STAGE_STATUS = STAGE_STATUS;
exports.USER_CHALLENGE_STATUS = USER_CHALLENGE_STATUS;
exports.USER_PROVIDERS = USER_PROVIDERS;
exports.USER_PUBLIC_GENDER = USER_PUBLIC_GENDER;
exports.USER_ROLES = USER_ROLES;

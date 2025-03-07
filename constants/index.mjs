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
var FEATURE_STATUS = PUBLISHING_STATUS;
var FEATURE_TYPES = {
  Event: "event",
  Patch: "patch",
  Info: "info"
};

export { CHALLENGE_STATUS, CHALLENGE_TYPES, FEATURE_STATUS, FEATURE_TYPES, LEADERBOARD_MODE, PHOTO_HUNT_STATUS, PUBLISHING_STATUS, QR_CONTENT_TYPES, QR_STATUS, REDIS_CHANNELS, REDIS_KEYS, STAGE_STATUS, USER_CHALLENGE_STATUS, USER_PROVIDERS, USER_PUBLIC_GENDER, USER_ROLES };

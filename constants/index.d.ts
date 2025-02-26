export declare const PUBLISHING_STATUS: {
    readonly Draft: "draft";
    readonly Publish: "publish";
};
export declare const CHALLENGE_STATUS: {
    readonly Draft: "draft";
    readonly Publish: "publish";
};
export declare const CHALLENGE_TYPES: {
    readonly Trivia: "trivia";
    readonly PhotoHunt: "photohunt";
};
export declare const LEADERBOARD_MODE: {
    readonly Ranks: "ranks";
    readonly Current: "current";
};
export declare const PHOTO_HUNT_STATUS: {
    readonly Draft: "draft";
    readonly Publish: "publish";
};
export declare const QR_CONTENT_TYPES: {
    readonly Stage: "stage";
    readonly Challenge: "challenge";
    readonly Trivia: "trivia";
    readonly PhotoHunt: "photohunt";
};
export declare const QR_STATUS: {
    readonly Draft: "draft";
    readonly Publish: "publish";
};
export declare const STAGE_STATUS: {
    readonly Draft: "draft";
    readonly Publish: "publish";
};
/**
 * Status description
 *
 * Undiscovered  : when challenge not discovered yet
 * Discovered    : when challenge discovered
 * Ongoing       : when user start doing the challenge
 * Completed     : when user complete the challenge
 * Failed        : when user fail the challenge
 */
export declare const USER_CHALLENGE_STATUS: {
    readonly Undiscovered: "undiscovered";
    readonly Discovered: "discovered";
    readonly OnGoing: "ongoing";
    readonly Completed: "completed";
    readonly Failed: "failed";
};
export declare const USER_PUBLIC_GENDER: {
    readonly Male: "male";
    readonly Female: "female";
    readonly Panda: "panda";
};
export declare const REDIS_KEYS: {};
export declare const REDIS_CHANNELS: {
    readonly Leaderboard: "leaderboard";
    readonly UpdateUser: "update-user";
};

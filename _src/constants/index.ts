export const PUBLISHING_STATUS = {
  Draft: "draft",
  Publish: "publish",
} as const;

export const CHALLENGE_STATUS = PUBLISHING_STATUS;

export const CHALLENGE_TYPES = {
  Trivia: "trivia",
  PhotoHunt: "photohunt",
} as const;

export const LEADERBOARD_MODE = { Ranks: "ranks", Current: "current" } as const;

export const PHOTO_HUNT_STATUS = PUBLISHING_STATUS;

export const QR_CONTENT_TYPES = {
  Stage: "stage",
  Challenge: "challenge",
  Trivia: "trivia",
  PhotoHunt: "photohunt",
} as const;

export const QR_STATUS = PUBLISHING_STATUS;

export const STAGE_STATUS = PUBLISHING_STATUS;

/**
 * Status description
 *
 * Undiscovered  : when challenge not discovered yet
 * Discovered    : when challenge discovered
 * Ongoing       : when user start doing the challenge
 * Completed     : when user complete the challenge
 * Failed        : when user fail the challenge
 */
export const USER_CHALLENGE_STATUS = {
  Undiscovered: "undiscovered",
  Discovered: "discovered",
  OnGoing: "ongoing",
  Completed: "completed",
  Failed: "failed",
} as const;

export const USER_PUBLIC_GENDER = {
  Male: "male",
  Female: "female",
  Panda: "panda",
} as const;

export const REDIS_KEYS = {} as const;

export const REDIS_CHANNELS = {
  Leaderboard: "leaderboard",
  UpdateUser: "update-user",
} as const;

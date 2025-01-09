import { Schema } from "mongoose";

import Challenge from "./Challenge";
import Qr from "./Qr";
import Stage from "./Stage";
import Trivia from "./Trivia";
import User from "./User";
import UserChallenge from "./UserChallenge";
import UserPublic from "./UserPublic";
import UserStage from "./UserStage";
import UserTrivia from "./UserTrivia";

const models = {
  Challenge,
  Qr,
  Stage,
  Trivia,
  User,
  UserChallenge,
  UserPublic,
  UserStage,
  UserTrivia,
} as const;

export {
  Challenge,
  Qr,
  Stage,
  Trivia,
  User,
  UserChallenge,
  UserPublic,
  UserStage,
  UserTrivia,
};

export default models;

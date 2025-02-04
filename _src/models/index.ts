import ChallengeModel from "./challenge";
import QrModel from "./qr";
import StageModel from "./stage";
import TriviaModel from "./trivia";
import UserModel from "./user";
import UserChallengeModel from "./user-challenge";
import UserPublicModel from "./user-public";
import UserStageModel from "./user-stage";
import UserTriviaModel from "./user-trivia";
import PhotoHuntModel from "./photo-hunt";

const models = {
  ChallengeModel,
  QrModel,
  StageModel,
  TriviaModel,
  PhotoHuntModel,
  UserModel,
  UserChallengeModel,
  UserPublicModel,
  UserStageModel,
  UserTriviaModel,
} as const;

export {
  ChallengeModel,
  QrModel,
  StageModel,
  TriviaModel,
  PhotoHuntModel,
  UserModel,
  UserChallengeModel,
  UserPublicModel,
  UserStageModel,
  UserTriviaModel,
};

export default models;

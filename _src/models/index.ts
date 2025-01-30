import ChallengeModel from "./ChallengeModel";
import QrModel from "./QrModel";
import StageModel from "./StageModel";
import TriviaModel from "./TriviaModel";
import UserModel from "./UserModel";
import UserChallengeModel from "./UserChallengeModel";
import UserPublicModel from "./UserPublicModel";
import UserStageModel from "./UserStageModel";
import UserTriviaModel from "./UserTriviaModel";
import PhotoHuntModel from "./PhotoHuntModel";

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

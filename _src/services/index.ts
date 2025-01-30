import ChallengeService from "./ChallengeService";
import PhotoHuntService from "./PhotoHuntService";
import QrService from "./QrService";
import StageService from "./StageService";
import TriviaService from "./TriviaService";
import UserChallengeService from "./UserChallengeService";
import UserPublicService from "./UserPublicService";
import UserService from "./UserService";
import UserStageService from "./UserStageService";
import UserTriviaService from "./UserTriviaService";

const services = {
  ChallengeService,
  PhotoHuntService,
  QrService,
  StageService,
  TriviaService,
  UserChallengeService,
  UserPublicService,
  UserService,
  UserStageService,
  UserTriviaService,
} as const;

export {
  ChallengeService,
  PhotoHuntService,
  QrService,
  StageService,
  TriviaService,
  UserChallengeService,
  UserPublicService,
  UserService,
  UserStageService,
  UserTriviaService,
};

export default services;

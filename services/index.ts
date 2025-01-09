import ChallengeService from "./ChallengeService";
import QrService from "./QrService";
import StageService from "./StageService";
import TriviaService from "./TriviaService";
import UserChallengeService from "./UserChallengeService";
import UserPublicService from "./UserPublicService";
import UserService from "./UserService";
// import UserStage from './UserStage'
import UserStageService from "./UserStageService";
import UserTriviaService from "./UserTriviaService";

const services = {
  ChallengeService,
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

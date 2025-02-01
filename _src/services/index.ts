import ChallengeService from "./ChallengeService";
import PhotoHuntService from "./PhotoHuntService";
import QrService from "./QrService";
import StageService from "./StageService";
import TriviaService from "./TriviaService";
import UserChallengeService from "./UserChallengeService";
import UserPhotoHuntService from "./UserPhotoHuntService";
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
  UserPhotoHuntService,
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
  UserPhotoHuntService,
};

export default services;

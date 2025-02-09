import ChallengeService from "./challenge";
import PhotoHuntService from "./photo-hunt";
import QrService from "./qr";
import StageService from "./stage";
import TriviaService from "./trivia";
import UserChallengeService from "./user-challenge";
import UserPhotoHuntService from "./user-photo-hunt";
import UserPublicService from "./user-public";
import UserService from "./user";
import UserStageService from "./user-stage";
import UserTriviaService from "./user-trivia";
import LeaderboardService from "./leaderboard";

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
  LeaderboardService,
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
  LeaderboardService,
};

export default services;

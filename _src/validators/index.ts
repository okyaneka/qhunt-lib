import ChallengeValidator from "./challenge";
import QrValidator from "./qr";
import StageValidator from "./stage";
import TriviaValidator from "./trivia";
import UserChallengeValidator from "./user-challenge";
import UserPublicValidator from "./user-public";
import UserStageValidator from "./user-stage";
import UserValidator from "./user";
import LeaderboardValidator from "./leaderboard";

const validators = {
  ChallengeValidator,
  QrValidator,
  StageValidator,
  TriviaValidator,
  UserChallengeValidator,
  UserPublicValidator,
  UserStageValidator,
  UserValidator,
  LeaderboardValidator,
} as const;

export {
  ChallengeValidator,
  QrValidator,
  StageValidator,
  TriviaValidator,
  UserChallengeValidator,
  UserPublicValidator,
  UserStageValidator,
  UserValidator,
  LeaderboardValidator,
};

export default validators;

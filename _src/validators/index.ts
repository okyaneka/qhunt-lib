import ChallengeValidator from "./ChallengeValidator";
import QrValidator from "./QrValidator";
import StageValidator from "./StageValidator";
import TriviaValidator from "./TriviaValidator";
import UserChallengeValidator from "./UserChallengeValidator";
import UserPublicValidator from "./UserPublicValidator";
import UserStageValidator from "./UserStageValidator";
import UserValidator from "./UserValidator";

const validators = {
  ChallengeValidator,
  QrValidator,
  StageValidator,
  TriviaValidator,
  UserChallengeValidator,
  UserPublicValidator,
  UserStageValidator,
  UserValidator,
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
};

export default validators;

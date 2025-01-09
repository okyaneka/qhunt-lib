import Joi from "joi";
import schema from "~/helpers/schema";
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

export interface DefaultListParams {
  page: number;
  limit: number;
  search: string;
}

export const DefaultListParamsFields = {
  page: Joi.number().default(1),
  limit: Joi.number().default(10),
  search: Joi.string().allow("").default(""),
};

export const DefaultListQueryFields = {
  page: schema.number({ defaultValue: 1 }),
  limit: schema.number({ defaultValue: 1 }),
  search: schema.string({ defaultValue: "", allow: "" }),
};

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

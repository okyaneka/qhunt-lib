import schema from "~/helpers/schema";
import { DefaultListParamsFields } from "~/helpers/validator";
import {
  UserChallengeForeign,
  UserChallengeParams,
  UserChallengeStatus,
} from "~/models/UserChallengeModel";

export const UserChallengeForeignValidator =
  schema.generate<UserChallengeForeign>({
    id: schema.string({ required: true }),
    challengeId: schema.string({ required: true }),
    name: schema.string({ required: true }),
  });

export const UserChallengeParamsValidator =
  schema.generate<UserChallengeParams>({
    ...DefaultListParamsFields,
    userStageId: schema.string({ allow: "" }),
    status: schema
      .string({ allow: "" })
      .valid(...Object.values(UserChallengeStatus)),
  });

const UserChallengeValidator = {
  UserChallengeForeignValidator,
  UserChallengeParamsValidator,
};

export default UserChallengeValidator;

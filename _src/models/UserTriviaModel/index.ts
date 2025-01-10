import { Model, model, models, Schema } from "mongoose";
import { UserTrivia, UserTriviaResult } from "./types";
import { ToObject } from "../../helpers/schema";
import { UserPublicForeignSchema } from "../UserPublicModel";
import { UserChallengeForeignSchema } from "../UserChallengeModel";
import { TriviaForeignSchema } from "../TriviaModel";

const UserTriviaResultSchema = new Schema<UserTriviaResult>(
  {
    answer: { type: String, required: true },
    feedback: { type: String, default: "" },
    isCorrect: { type: Boolean, required: true },
    score: { type: Number, required: true },
  },
  { _id: false }
);

const UserTriviaSchema = new Schema<UserTrivia>(
  {
    userPublic: { type: UserPublicForeignSchema, required: true },
    userChallenge: { type: UserChallengeForeignSchema, required: true },
    trivia: { type: TriviaForeignSchema, required: true },
    results: { type: UserTriviaResultSchema, default: null },
  },
  { timestamps: true }
);

UserTriviaSchema.set("toJSON", ToObject);
UserTriviaSchema.set("toObject", ToObject);

export * from "./types";

const UserTriviaModel =
  (models.UserTrivia as Model<UserTrivia>) ||
  model("UserTrivia", UserTriviaSchema, "usersTrivia");

export default UserTriviaModel;

import { Model, model, models, Schema, ToObjectOptions } from "mongoose";
import { UserTrivia, UserTriviaResult } from "./types";
import { UserPublicForeignSchema } from "../UserPublicModel";
import { UserChallengeForeignSchema } from "../UserChallengeModel";
import { TriviaForeignSchema } from "../TriviaModel";

const ToObject: ToObjectOptions = {
  transform: (doc, ret) => {
    const { _id, __v, userPublic, ...rest } = ret;
    return { id: _id.toString(), ...rest };
  },
};

const UserTriviaResultSchema = new Schema<UserTriviaResult>(
  {
    answer: { type: String, default: null },
    feedback: { type: String, default: null },
    isCorrect: { type: Boolean, required: true },
    baseScore: { type: Number, required: true },
    bonus: { type: Number, required: true },
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

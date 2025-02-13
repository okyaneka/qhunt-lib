import { model, Model, models, Schema } from "mongoose";
import { UserPhotoHunt, UserPhotoHuntResult } from "~/types";
import { PhotoHuntForeignSchema } from "../photo-hunt";
import { UserChallengeForeignSchema } from "../user-challenge";
import { UserPublicForeignSchema } from "../user-public";
import { ToObject } from "~/helpers/model";

const UserPhotoHuntResultSchema = new Schema<UserPhotoHuntResult>(
  {
    feedback: { type: String, default: null },
    foundAt: { type: Date, default: Date.now() },
    score: { type: Number, default: 0 },
  },
  { _id: false }
);

const UserPhotoHuntSchema = new Schema<UserPhotoHunt>({
  photoHunt: { type: PhotoHuntForeignSchema, required: true },
  results: { type: UserPhotoHuntResultSchema, default: null },
  userChallenge: { type: UserChallengeForeignSchema, required: true },
  userPublic: { type: UserPublicForeignSchema, required: true },
});

UserPhotoHuntSchema.set("toObject", ToObject);
UserPhotoHuntSchema.set("toJSON", ToObject);

const UserPhotoHuntModel =
  (models.UserPhotoHunt as Model<UserPhotoHunt>) ||
  model("UserPhotoHunt", UserPhotoHuntSchema, "usersPhotoHunt");

export default UserPhotoHuntModel;

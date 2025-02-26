import UserPhotoHuntModel from "~/models/user-photo-hunt-model";
import {
  UserChallengeForeign,
  UserPhotoHuntResult,
  UserPhotoHuntSummary,
  UserPublicForeign,
} from "~";
import {
  details as PhotoHuntDetails,
  verifyCode as PhotoHuntVerifyCode,
} from "../photo-hunt-service";
import { ClientSession } from "mongoose";
import {
  submit as UserChallengeSubmit,
  detail as UserChallengeDetail,
} from "../user-challenge-service";
import db from "~/helpers/db";
import { CHALLENGE_TYPES } from "~/helpers/contants";

export const setup = async (
  userPublic: UserPublicForeign,
  userChallenge: UserChallengeForeign,
  session?: ClientSession
) => {
  const items = await PhotoHuntDetails(userChallenge.challengeId);

  const payload = items.map(({ id, hint }) => {
    return {
      userPublic,
      userChallenge,
      photoHunt: { id, hint },
    };
  });

  return await UserPhotoHuntModel.insertMany(payload, { session });
};

export const details = async (
  ids: string[],
  TID: string,
  hasResult?: boolean,
  session?: ClientSession
) => {
  const filter: any = {};
  if (hasResult !== undefined)
    filter.results = hasResult ? { $ne: null } : null;

  const data = await UserPhotoHuntModel.find(
    {
      ...filter,
      _id: { $in: ids },
      "userPublic.code": TID,
    },
    null,
    { session }
  );

  return data.map((item) => item.toObject());
};

export const submit = async (
  userChallengeId: string,
  TID: string,
  code: string,
  bonus?: number
) => {
  return db.transaction(async (session) => {
    const userChallenge = await UserChallengeDetail(userChallengeId, TID);

    const {
      challenge: { id: challengeId },
    } = userChallenge;

    const photoHunt = await PhotoHuntVerifyCode(challengeId, code);
    const userPhotoHunt = await UserPhotoHuntModel.findOne({
      "photoHunt.id": photoHunt.id,
      "userPublic.code": TID,
    });
    if (!userPhotoHunt) throw new Error("user_photohunt.not_found");
    if (userPhotoHunt.results) throw new Error("user_photohunt.submitted");

    userPhotoHunt.results = {
      score: photoHunt.score,
      foundAt: new Date(),
      feedback: photoHunt.feedback,
    };
    await userPhotoHunt.save({ session });

    await UserChallengeSubmit(userChallengeId, TID, session);

    return userPhotoHunt.toObject();
  });
};

export const submitEmpties = async (
  userChallengeId: string,
  TID: string,
  session?: ClientSession
) => {
  const results: UserPhotoHuntResult = {
    feedback: null,
    foundAt: null,
    score: 0,
  };
  return await UserPhotoHuntModel.updateMany(
    {
      "userChallenge.id": userChallengeId,
      "userPublic.code": TID,
      results: null,
    },
    { $set: { results } },
    { session }
  );
};

export const summary = async (
  userChallengeId: string,
  TID: string,
  session?: ClientSession
): Promise<UserPhotoHuntSummary> => {
  const [summary] = await UserPhotoHuntModel.aggregate()
    .match({
      "userChallenge.id": userChallengeId,
      "userPublic.code": TID,
    })
    .group({
      _id: {
        userChallenge: "$userChallenge.id",
        userPublic: "$userPublic.code",
      },
      type: { $first: CHALLENGE_TYPES.PhotoHunt },
      userPublic: { $first: "$userPublic" },
      userChallenge: { $first: "$userChallenge" },
      totalItem: {
        $sum: {
          $cond: {
            if: { $ne: ["$results.foundAt", null] },
            then: 1,
            else: 0,
          },
        },
      },
      totalBaseScore: { $sum: "$results.score" },
      totalBonus: { $first: 0 },
      totalScore: { $sum: "$results.score" },
    })
    .session(session || null);
  return summary;
};

const UserPhotoHuntService = {
  setup,
  details,
  submit,
  submitEmpties,
  summary,
} as const;

export default UserPhotoHuntService;

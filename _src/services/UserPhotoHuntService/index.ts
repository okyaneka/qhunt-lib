import { UserChallengeForeign } from "~/models/UserChallengeModel";
import UserPhotoHuntModel, {
  UserPhotoHuntResult,
  UserPhotoHuntSummary,
} from "~/models/UserPhotoHuntModel";
import { UserPublicForeign } from "~/models/UserPublicModel";
import {
  details as PhotoHuntServiceDetails,
  detail as PhotoHuntServiceDetail,
} from "../PhotoHuntService";
import { ChallengeTypeValues } from "~/models/ChallengeModel";

export const setup = async (
  userPublic: UserPublicForeign,
  userChallenge: UserChallengeForeign
): Promise<string[]> => {
  const items = await PhotoHuntServiceDetails(userChallenge.challengeId);

  const payload = items.map(({ id, hint }) => {
    return {
      userPublic,
      userChallenge,
      photoHunt: { id, hint },
    };
  });
  const created = await UserPhotoHuntModel.insertMany(payload);

  return created.map((item) => item._id.toString());
};

export const details = async (
  ids: string[],
  TID: string,
  hasResult?: boolean
) => {
  const filter: any = {};
  if (hasResult !== undefined)
    filter.results = hasResult ? { $ne: null } : null;

  const data = await UserPhotoHuntModel.find({
    ...filter,
    _id: { $in: ids },
    "userPublic.code": TID,
  });

  return data.map((item) => item.toObject());
};

export const submit = async (
  id: string,
  TID: string,
  isFound: boolean,
  bonus?: number
) => {
  const userPhotoHunt = await UserPhotoHuntModel.findOne({
    _id: id,
    "userPublic.code": TID,
  });
  if (!userPhotoHunt) throw new Error("user photo hunt not found");
  if (userPhotoHunt.results) return userPhotoHunt.toObject();

  const photoHunt = await PhotoHuntServiceDetail(userPhotoHunt.photoHunt.id);
  const results: UserPhotoHuntResult = {
    score: isFound ? photoHunt.score : 0,
    foundAt: new Date(),
    feedback: isFound ? photoHunt.feedback : null,
  };
  userPhotoHunt.results = results;
  await userPhotoHunt.save();
  return userPhotoHunt.toObject();
};

export const submitEmpties = async (userChallengeId: string, TID: string) => {
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
    { $set: { results } }
  );
};

export const summary = async (
  userChallengeId: string,
  TID: string
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
      userPublic: { $first: "$userPublic" },
      userChallenge: { $first: "$userChallenge" },
      totalFound: {
        $sum: {
          $cond: {
            if: { $eq: ["$results.isCorrect", true] },
            then: 1,
            else: 0,
          },
        },
      },
      totalScore: { $sum: "$results.score" },
    })
    .addFields({ type: ChallengeTypeValues.PhotoHunt });
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

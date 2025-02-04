import { ScoreSummary } from "~/helpers/types";
import { PhotoHuntForeign } from "../photo-hunt";
import { UserChallengeForeign } from "../user-challenge";
import { UserPublicForeign } from "../user-public";
import { CHALLENGE_TYPES } from "../challenge";

export interface UserPhotoHuntSummary extends ScoreSummary {
  type: typeof CHALLENGE_TYPES.PhotoHunt;
  userPublic: UserPublicForeign;
  userChallenge: UserChallengeForeign;
  totalFound: number;
}

export interface UserPhotoHuntResult {
  score: number;
  foundAt: Date | null;
  feedback: string | null;
}

export interface UserPhotoHunt {
  id: string;
  userPublic: UserPublicForeign;
  userChallenge: UserChallengeForeign;
  photoHunt: PhotoHuntForeign;
  results: UserPhotoHuntResult | null;
}

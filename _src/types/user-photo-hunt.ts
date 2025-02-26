import { ScoreSummary } from "~";
import { PhotoHuntForeign } from "./photo-hunt";
import { UserChallengeForeign } from "./user-challenge";
import { UserPublicForeign } from "./user-public";
import { CHALLENGE_TYPES } from "~/constants";

export interface UserPhotoHuntSummary extends ScoreSummary {
  type: typeof CHALLENGE_TYPES.PhotoHunt;
  userPublic: UserPublicForeign;
  userChallenge: UserChallengeForeign;
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

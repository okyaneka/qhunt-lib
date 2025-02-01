import { ScoreSummary } from "../../helpers";
import { PhotoHuntForeign } from "../PhotoHuntModel";
import { UserChallengeForeign } from "../UserChallengeModel";
import { UserPublicForeign } from "../UserPublicModel";
import { ChallengeTypeValues } from "../ChallengeModel";
export interface UserPhotoHuntSummary extends ScoreSummary {
    type: typeof ChallengeTypeValues.PhotoHunt;
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
//# sourceMappingURL=types.d.ts.map
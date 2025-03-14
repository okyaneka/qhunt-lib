import { IdName, Timestamps, ValueOf } from "../index";
import { QrForeign } from "./qr";
import { PHOTO_HUNT_STATUS } from "../constants";
export type PhotoHuntStatus = ValueOf<typeof PHOTO_HUNT_STATUS>;
export type PhotoHuntForeign = Pick<PhotoHunt, "id" | "hint">;
export type PhotoHuntPayload = {
    id?: string;
} & Pick<PhotoHunt, "hint" | "feedback" | "score">;
export interface PhotoHunt extends Timestamps {
    id: string;
    hint: string;
    challenge: IdName | null;
    score: number;
    feedback: string;
    qr: QrForeign | null;
    status: PhotoHuntStatus;
}
//# sourceMappingURL=photohunt.d.ts.map
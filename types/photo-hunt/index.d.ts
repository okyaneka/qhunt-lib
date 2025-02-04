import { IdName, Timestamps, ValueOf } from "../../helpers/types";
import { QrForeign } from "../qr";
export declare const PHOTO_HUNT_STATUS: {
    readonly Draft: "draft";
    readonly Publish: "publish";
};
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
//# sourceMappingURL=index.d.ts.map
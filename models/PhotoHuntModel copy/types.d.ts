import { IdName, PublishingStatus, Timestamps } from "../../helpers";
import { QrForeign } from "../QrModel";
export declare const PhotoHuntStatusValues: {
    readonly Draft: "draft";
    readonly Publish: "publish";
};
export type PhotoHuntStatus = PublishingStatus;
export type PhotoHuntForeign = Pick<PhotoHunt, "id" | "hint">;
export type PhotoHuntPayload = {
    id?: string;
} & Pick<PhotoHunt, "hint" | "feedback">;
export interface PhotoHunt extends Timestamps {
    id: string;
    hint: string;
    challenge: IdName | null;
    feedback: string;
    qr: QrForeign | null;
    status: PhotoHuntStatus;
}
//# sourceMappingURL=types.d.ts.map
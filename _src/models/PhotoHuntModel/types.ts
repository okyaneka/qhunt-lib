import {
  IdName,
  PublishingStatus,
  PublishingStatusValues,
  Timestamps,
} from "~/helpers";
import { QrForeign } from "../QrModel";

export const PhotoHuntStatusValues = PublishingStatusValues;
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

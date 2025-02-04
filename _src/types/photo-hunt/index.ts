import {
  IdName,
  PUBLISHING_STATUS,
  Timestamps,
  ValueOf,
} from "~/helpers/types";
import { QrForeign } from "../qr";

export const PHOTO_HUNT_STATUS = PUBLISHING_STATUS;

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

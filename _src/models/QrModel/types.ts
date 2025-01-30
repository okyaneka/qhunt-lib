import {
  DefaultListParams,
  PublishingStatus,
  PublishingStatusValues,
  Timestamps,
} from "~/helpers";

export const QrStatusValues = PublishingStatusValues;
export type QrStatus = PublishingStatus;

export enum QrContentType {
  Stage = "stage",
  Challenge = "challenge",
  Trivia = "trivia",
}

export interface QrContent {
  type: QrContentType;
  refId: string;
}

export interface QrLocation {
  label: string;
  longitude: number;
  latitude: number;
}

export interface QrListParams extends DefaultListParams {
  code: string;
  status: QrStatus | null;
  hasContent: boolean | null;
}

export interface QrPayload {
  code: string;
  status: QrStatus;
}

export interface QrUpdatePayload {
  status: QrStatus;
  content: QrContent | null;
  location: QrLocation | null;
}

export interface QrGeneratePayload {
  amount: number;
}

export interface QrDeleteBulkPayload {
  ids: string[];
}

export interface QrForeign {
  id: string;
  code: string;
}

export interface Qr extends Timestamps {
  id: string;
  code: string;
  status: QrStatus;
  content: QrContent | null;
  location: QrLocation | null;
  accessCount: number | null;
}

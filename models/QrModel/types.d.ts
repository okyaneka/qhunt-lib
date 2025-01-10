import { DefaultListParams, Timestamps } from "~/helpers";
export declare enum QrStatus {
    Draft = "draft",
    Publish = "publish"
}
export declare enum QrContentType {
    Stage = "stage",
    Challenge = "challenge",
    Trivia = "trivia"
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
export interface Qr extends Timestamps {
    id: string;
    code: string;
    status: QrStatus;
    content: QrContent | null;
    location: QrLocation | null;
    accessCount: number | null;
}
//# sourceMappingURL=types.d.ts.map
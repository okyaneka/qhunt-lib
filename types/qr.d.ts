import { QR_CONTENT_TYPES, QR_STATUS } from "../constants";
import { DefaultListParams, Timestamps, ValueOf } from "../index";
export type QrStatus = ValueOf<typeof QR_STATUS>;
export type QrContentType = ValueOf<typeof QR_CONTENT_TYPES>;
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
export type QrForeign = Pick<Qr, "id" | "code" | "location">;
export interface Qr extends Timestamps {
    id: string;
    code: string;
    status: QrStatus;
    content: QrContent | null;
    location: QrLocation | null;
    accessCount: number | null;
}
//# sourceMappingURL=qr.d.ts.map
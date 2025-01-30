export declare const PublishingStatusValues: {
    readonly Draft: "draft";
    readonly Publish: "publish";
};
export type PublishingStatus = (typeof PublishingStatusValues)[keyof typeof PublishingStatusValues];
export interface Timestamps {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
export interface IdName {
    id: string;
    name: string;
}
export interface Periode {
    startDate: Date;
    endDate: Date;
}
export interface DefaultListParams {
    page: number;
    limit: number;
    search: string;
}
export interface Feedback {
    positive: string;
    negative: string;
}
//# sourceMappingURL=index.d.ts.map
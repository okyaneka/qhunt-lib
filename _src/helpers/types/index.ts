export const PublishingStatusValues = {
  Draft: "draft",
  Publish: "publish",
} as const;

export type PublishingStatus =
  (typeof PublishingStatusValues)[keyof typeof PublishingStatusValues];

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

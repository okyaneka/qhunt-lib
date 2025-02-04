export type ValueOf<T> = T[keyof T];

export const PUBLISHING_STATUS = {
  Draft: "draft",
  Publish: "publish",
} as const;

export type PublishingStatus = ValueOf<typeof PUBLISHING_STATUS>;

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

export interface ScoreSummary {
  totalBaseScore: number;
  totalBonus: number;
  totalScore: number;
}

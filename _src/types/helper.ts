import { PUBLISHING_STATUS } from "~/helpers/contants";

export type ValueOf<T> = T[keyof T];

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
  totalItem: number;
  totalBaseScore: number;
  totalBonus: number;
  totalScore: number;
}

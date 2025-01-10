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

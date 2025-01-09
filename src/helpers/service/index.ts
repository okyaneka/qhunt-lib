import { Model } from "mongoose";

export const list = async <T>(
  model: Model<T>,
  page: number,
  limit: number,
  filters: Record<string, any> = {}
) => {
  const skip = (page - 1) * limit;
  const filter = {
    ...filters,
    deletedAt: null,
  };

  const items = await model
    .find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalItems = await model.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / limit);

  return {
    list: items.map((item) => (item.toObject ? item.toObject() : item)),
    page,
    totalItems,
    totalPages,
  };
};

const service = { list };

export default service;

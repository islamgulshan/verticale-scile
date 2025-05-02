import { PaginatedResponseType } from './types';

export function getPagination(page = 1, limit = 10) {
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);
  const skip = (safePage - 1) * safeLimit;

  return {
    skip,
    page: safePage,
    limit: safeLimit,
  };
}

export function PaginatedResponse<T>(
  data: T[],
  total: number,
  page = 1,
  limit = 10,
): PaginatedResponseType<T> {
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);
  const totalPages = Math.ceil(total / safeLimit);

  return {
    data,
    meta: {
      total,
      page: safePage,
      limit: safeLimit,
      totalPages,
    },
  };
}

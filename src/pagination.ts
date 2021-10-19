export type MonicaPagination = {
  page?: number;
  limit?: number;
};

export interface MonicaPaginationOptionsAll {
  pagination?: MonicaPagination;
}

export interface MonicaPaginationOptionsID extends MonicaPaginationOptionsAll {
  id: number;
}

export type PaginationOptions = MonicaPaginationOptionsAll | MonicaPaginationOptionsID;

export function applyPagination(pagination?: MonicaPagination) {
  return {
    page: pagination?.page ?? 1,
    limit: pagination?.limit ?? 10,
  };
}

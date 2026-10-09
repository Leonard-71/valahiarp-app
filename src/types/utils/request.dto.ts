import { FilterCondition } from "@/lib/filters/filter-types";

type PaginationInput = {
  pageIndex: number;
  pageSize: number;
};

type RequestInput = {
  pagination: PaginationInput;
  search?: string;
  filters?: FilterCondition[];
};

export type { PaginationInput, RequestInput };

"use server";

import { EqualityOperators } from "@/lib/filters/filter-types";
import { findAll } from "@/service/category";
import {
  PaginatedResponseDto,
  ResponseDto,
  SingleCategoryResponseDto,
} from "@/types";

const findAllLeafletCategories = async (): Promise<
  ResponseDto<PaginatedResponseDto<SingleCategoryResponseDto>>
> => {
  return await findAll({
    pagination: { pageIndex: 0, pageSize: 10000 },
    filters: [
      {
        field: "hasLeaflet",
        operator: EqualityOperators.EQUALS,
        value: true,
      },
      {
        field: "isArchived",
        operator: EqualityOperators.EQUALS,
        value: false,
      },
    ],
  });
};

const findAllStoreCategories = async (): Promise<
  ResponseDto<PaginatedResponseDto<SingleCategoryResponseDto>>
> => {
  return await findAll({
    pagination: { pageIndex: 0, pageSize: 10000 },
    filters: [
      {
        field: "isArchived",
        operator: EqualityOperators.EQUALS,
        value: false,
      },
    ],
  });
};

export { findAllLeafletCategories, findAllStoreCategories };

import { array, number, object, string } from "zod";

import { createFilterConditionValidator } from "./filter/filter.validator";

const paginationValidator = object({
  pageIndex: number().int("Indexul paginii trebuie să fie un număr întreg").nonnegative("Indexul paginii trebuie să fie pozitiv sau zero"),
  pageSize: number().int("Dimensiunea paginii trebuie să fie un număr întreg").positive("Dimensiunea paginii trebuie să fie pozitivă"),
});

const searchValidator = string().optional();

const filtersValidator = array(createFilterConditionValidator()).optional();

const requestValidator = object({
  pagination: paginationValidator,
  search: searchValidator,
  filters: filtersValidator,
});

export {
  paginationValidator,
  searchValidator,
  filtersValidator,
  requestValidator,
};

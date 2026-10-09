import { Prisma } from "@/generated/prisma";
import { createNestedObject } from "@/lib/create-nested-object";
import { StringPaths } from "@/types/utils";

const searchBuilder = <T extends object>(
  search: string,
  fields: StringPaths<T>[],
): Prisma.JsonObject => {
  if (fields.length === 0) {
    return {};
  }

  const normalizedSearch = search
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const searchConditions = fields.map((field) => {
    const searchCondition = {
      contains: normalizedSearch,
      mode: "insensitive",
    };
    return createNestedObject(field, searchCondition);
  });

  return {
    OR: searchConditions,
  };
};

export { searchBuilder };

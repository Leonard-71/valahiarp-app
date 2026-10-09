import { Prisma } from "@/generated/prisma";
import { createNestedObject } from "@/lib/create-nested-object";

import {
  BetweenOperators,
  ComparisonOperators,
  DateOperators,
  EqualityOperators,
  FilterableField,
  FilterCondition,
  FilterOperator,
  ListOperators,
  NullaryOperators,
  StringContainmentOperators,
} from "./filter-types";

function applyGenericFilters(
  spec: FilterableField[],
  filters: FilterCondition[],
): Prisma.JsonObject {
  const conditions: Prisma.JsonObject[] = [];

  const sorted = [...filters].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  for (const filter of sorted) {
    const def = spec.find((f) => f.field === filter.field);
    if (
      !def ||
      !(def.allowedOperators as FilterOperator[]).includes(filter.operator)
    )
      continue;

    let operatorValue: any;

    switch (filter.operator) {
      case EqualityOperators.EQUALS:
        operatorValue = { equals: filter.value };
        break;
      case EqualityOperators.NOT_EQUALS:
        operatorValue = { not: filter.value };
        break;
      case ComparisonOperators.GREATER_THAN:
        operatorValue = { gt: Number(filter.value) };
        break;
      case ComparisonOperators.LESS_THAN:
        operatorValue = { lt: Number(filter.value) };
        break;
      case StringContainmentOperators.CONTAINS:
        operatorValue = {
          contains: filter.value,
          mode: "insensitive",
        };
        break;
      case StringContainmentOperators.DOES_NOT_CONTAIN:
        conditions.push({
          NOT: createNestedObject(filter.field, {
            contains: filter.value,
            mode: "insensitive",
          }),
        });
        continue;
      case NullaryOperators.IS_EMPTY:
        operatorValue = { equals: null };
        break;
      case NullaryOperators.IS_NOT_EMPTY:
        operatorValue = { not: null };
        break;
      case ListOperators.IN_LIST:
        operatorValue = {
          in: Array.isArray(filter.value)
            ? filter.value
            : String(filter.value).split(","),
        };
        break;
      case ListOperators.NOT_IN_LIST:
        operatorValue = {
          notIn: Array.isArray(filter.value)
            ? filter.value
            : String(filter.value).split(","),
        };
        break;
      case DateOperators.IS_AFTER:
        operatorValue = { gt: filter.value };
        break;
      case DateOperators.IS_BEFORE:
        operatorValue = { lt: filter.value };
        break;
      case BetweenOperators.BETWEEN:
        if (
          typeof filter.value === "object" &&
          filter.value !== null &&
          "min" in filter.value &&
          "max" in filter.value
        ) {
          operatorValue = {
            gte: filter.value.min,
            lte: filter.value.max,
          };
        }
        break;
      case BetweenOperators.NOT_BETWEEN:
        if (
          typeof filter.value === "object" &&
          filter.value !== null &&
          "min" in filter.value &&
          "max" in filter.value
        ) {
          conditions.push({
            OR: [
              createNestedObject(filter.field, { lt: filter.value.min }),
              createNestedObject(filter.field, { gt: filter.value.max }),
            ],
          });
        }
        continue;
      case BetweenOperators.BETWEEN:
        if (
          typeof filter.value === "object" &&
          filter.value !== null &&
          "min" in filter.value &&
          "max" in filter.value
        ) {
          operatorValue = {
            gte: filter.value.min,
            lte: filter.value.max,
          };
        }
        break;
      case BetweenOperators.NOT_BETWEEN:
        if (
          typeof filter.value === "object" &&
          filter.value !== null &&
          "min" in filter.value &&
          "max" in filter.value
        ) {
          conditions.push({
            OR: [
              createNestedObject(filter.field, { lt: filter.value.min }),
              createNestedObject(filter.field, { gt: filter.value.max }),
            ],
          });
        }
        continue;
    }

    if (operatorValue !== undefined) {
      conditions.push(createNestedObject(filter.field, operatorValue));
    }
  }

  return conditions.length > 0 ? { AND: conditions } : {};
}

export { applyGenericFilters };

import {
  BetweenOperators,
  ComparisonOperators,
  DateOperators,
  EqualityOperators,
  FilterOperator,
  FilterType,
  ListOperators,
  NullaryOperators,
  StringContainmentOperators,
} from "@/lib/filters/filter-types";

const operatorsByFilterType: Record<FilterType, FilterOperator[]> = {
  [FilterType.TEXT]: [
    StringContainmentOperators.CONTAINS,
    StringContainmentOperators.DOES_NOT_CONTAIN,
    EqualityOperators.EQUALS,
    EqualityOperators.NOT_EQUALS,
    NullaryOperators.IS_EMPTY,
    NullaryOperators.IS_NOT_EMPTY,
  ],
  [FilterType.NUMBER]: [
    ComparisonOperators.GREATER_THAN,
    ComparisonOperators.LESS_THAN,
    EqualityOperators.EQUALS,
    EqualityOperators.NOT_EQUALS,
    NullaryOperators.IS_EMPTY,
    NullaryOperators.IS_NOT_EMPTY,
    BetweenOperators.BETWEEN,
    BetweenOperators.NOT_BETWEEN,
  ],
  [FilterType.BOOLEAN]: [
    EqualityOperators.EQUALS,
    EqualityOperators.NOT_EQUALS,
  ],
  [FilterType.MULTISELECT_NUMBER]: [
    ListOperators.IN_LIST,
    ListOperators.NOT_IN_LIST,
    NullaryOperators.IS_EMPTY,
    NullaryOperators.IS_NOT_EMPTY,
  ],
  [FilterType.MULTISELECT_STRING]: [
    ListOperators.IN_LIST,
    ListOperators.NOT_IN_LIST,
    NullaryOperators.IS_EMPTY,
    NullaryOperators.IS_NOT_EMPTY,
  ],
  [FilterType.DATE]: [
    DateOperators.IS_AFTER,
    DateOperators.IS_BEFORE,
    EqualityOperators.EQUALS,
    EqualityOperators.NOT_EQUALS,
    NullaryOperators.IS_EMPTY,
    NullaryOperators.IS_NOT_EMPTY,
    BetweenOperators.BETWEEN,
    BetweenOperators.NOT_BETWEEN,
  ],
};

export { operatorsByFilterType };

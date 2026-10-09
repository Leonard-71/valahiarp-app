import {
  BetweenOperators,
  ComparisonOperators,
  DateOperators,
  EqualityOperators,
  FilterOperator,
  ListOperators,
  NullaryOperators,
  StringContainmentOperators,
} from "@/lib/filters/filter-types";

export const filterOperatorLabels: Record<FilterOperator, string> = {
  // Nullary
  [NullaryOperators.IS_EMPTY]: "Este gol",
  [NullaryOperators.IS_NOT_EMPTY]: "Nu este gol",

  // Equality
  [EqualityOperators.EQUALS]: "Este egal cu",
  [EqualityOperators.NOT_EQUALS]: "Nu este egal cu",

  // Comparison
  [ComparisonOperators.GREATER_THAN]: "Mai mare decât",
  [ComparisonOperators.LESS_THAN]: "Mai mic decât",

  // String Containment
  [StringContainmentOperators.CONTAINS]: "Conține",
  [StringContainmentOperators.DOES_NOT_CONTAIN]: "Nu conține",

  // List
  [ListOperators.IN_LIST]: "Este în listă",
  [ListOperators.NOT_IN_LIST]: "Nu este în listă",

  // Date
  [DateOperators.IS_AFTER]: "După",
  [DateOperators.IS_BEFORE]: "Înainte",

  // Between (These keys are identical, but the context of the field type will differentiate them)
  [BetweenOperators.BETWEEN]: "Între",
  [BetweenOperators.NOT_BETWEEN]: "Nu este între",
};

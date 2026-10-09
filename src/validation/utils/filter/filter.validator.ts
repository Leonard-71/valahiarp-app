import {
  array,
  boolean,
  date,
  literal,
  number,
  object,
  string,
  union,
} from "zod";

import {
  BetweenOperators,
  ComparisonOperators,
  DateOperators,
  EqualityOperators,
  ListOperators,
  NullaryOperators,
  StringContainmentOperators,
} from "@/lib/filters/filter-types";

function createFilterConditionValidator() {
  const base = object({
    field: string().nonempty("Câmpul este obligatoriu"),
    order: number().optional(),
  });

  const nullaryFilterValidator = base.extend({
    operator: union([
      literal(NullaryOperators.IS_EMPTY),
      literal(NullaryOperators.IS_NOT_EMPTY),
    ]),
  });

  const booleanFilterValidator = base.extend({
    operator: union([
      literal(EqualityOperators.EQUALS),
      literal(EqualityOperators.NOT_EQUALS),
    ]),
    value: boolean({ invalid_type_error: "Valoarea trebuie să fie adevărat sau fals" }),
  });

  const numberFilterValidator = base.extend({
    operator: union([
      literal(ComparisonOperators.GREATER_THAN),
      literal(ComparisonOperators.LESS_THAN),
    ]),
    value: number({ invalid_type_error: "Valoarea trebuie să fie un număr" }),
  });

  const numberBetweenValidator = base.extend({
    operator: union([
      literal(BetweenOperators.BETWEEN),
      literal(BetweenOperators.NOT_BETWEEN),
    ]),
    value: object({ min: number({ invalid_type_error: "Valoarea minimă trebuie să fie un număr" }), max: number({ invalid_type_error: "Valoarea maximă trebuie să fie un număr" }) }).strict(),
  });

  const stringFilterValidator = base.extend({
    operator: union([
      literal(StringContainmentOperators.CONTAINS),
      literal(StringContainmentOperators.DOES_NOT_CONTAIN),
    ]),
    value: string({ invalid_type_error: "Valoarea trebuie să fie text" }),
  });

  const arrayFilterValidator = base.extend({
    operator: union([
      literal(ListOperators.IN_LIST),
      literal(ListOperators.NOT_IN_LIST),
    ]),
    value: array(union([string(), number()]), { invalid_type_error: "Valoarea trebuie să fie o listă" }),
  });

  const dateFilterValidator = base.extend({
    operator: union([
      literal(DateOperators.IS_AFTER),
      literal(DateOperators.IS_BEFORE),
    ]),
    value: date({ invalid_type_error: "Valoarea trebuie să fie o dată validă" }),
  });

  const dateBetweenValidator = base.extend({
    operator: union([
      literal(BetweenOperators.BETWEEN),
      literal(BetweenOperators.NOT_BETWEEN),
    ]),
    value: object({ min: date({ invalid_type_error: "Data minimă trebuie să fie validă" }), max: date({ invalid_type_error: "Data maximă trebuie să fie validă" }) }).strict(),
  });

  return union([
    nullaryFilterValidator,
    booleanFilterValidator,
    numberFilterValidator,
    numberBetweenValidator,
    stringFilterValidator,
    arrayFilterValidator,
    dateFilterValidator,
    dateBetweenValidator,
  ]);
}

export { createFilterConditionValidator };

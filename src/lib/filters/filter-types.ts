import type {
  GenericSelectDataDto,
  PaginatedResponseDto,
  RequestInput,
  ResponseDto,
} from "@/types";

enum FilterType {
  TEXT = "TEXT",
  NUMBER = "NUMBER",
  BOOLEAN = "BOOLEAN",
  MULTISELECT_NUMBER = "MULTISELECT_NUMBER",
  MULTISELECT_STRING = "MULTISELECT_STRING",
  DATE = "DATE",
}

enum NullaryOperators {
  IS_EMPTY = "IS_EMPTY",
  IS_NOT_EMPTY = "IS_NOT_EMPTY",
}

enum EqualityOperators {
  EQUALS = "EQUALS",
  NOT_EQUALS = "NOT_EQUALS",
}

enum ComparisonOperators {
  GREATER_THAN = "GREATER_THAN",
  LESS_THAN = "LESS_THAN",
}

enum StringContainmentOperators {
  CONTAINS = "CONTAINS",
  DOES_NOT_CONTAIN = "DOES_NOT_CONTAIN",
}

enum BetweenOperators {
  BETWEEN = "BETWEEN",
  NOT_BETWEEN = "NOT_BETWEEN",
}

enum ListOperators {
  IN_LIST = "IN_LIST",
  NOT_IN_LIST = "NOT_IN_LIST",
}

enum DateOperators {
  IS_AFTER = "IS_AFTER",
  IS_BEFORE = "IS_BEFORE",
}

type FilterOperator =
  | NullaryOperators
  | EqualityOperators
  | ComparisonOperators
  | StringContainmentOperators
  | ListOperators
  | DateOperators
  | BetweenOperators;

interface BaseFilterableField {
  field: string;
  label: string;
}
interface TextFilterableField extends BaseFilterableField {
  type: FilterType.TEXT;
  allowedOperators: (
    | EqualityOperators
    | StringContainmentOperators
    | NullaryOperators
  )[];
}

interface NumberFilterableField extends BaseFilterableField {
  type: FilterType.NUMBER;
  allowedOperators: (
    | EqualityOperators
    | ComparisonOperators
    | NullaryOperators
    | BetweenOperators
  )[];
}

interface BooleanFilterableField extends BaseFilterableField {
  type: FilterType.BOOLEAN;
  allowedOperators: EqualityOperators[];
}

type MultiselectStringFilterableField = BaseFilterableField & {
  type: FilterType.MULTISELECT_STRING;
  allowedOperators: (ListOperators | NullaryOperators)[];
} & (
    | {
        options: { label: string; value: string }[];
        getData?: never;
      }
    | {
        options?: never;
        getData: (
          input: RequestInput,
        ) => Promise<ResponseDto<PaginatedResponseDto<GenericSelectDataDto>>>;
      }
  );

type MultiselectNumberFilterableField = BaseFilterableField & {
  type: FilterType.MULTISELECT_NUMBER;
  allowedOperators: (ListOperators | NullaryOperators)[];
} & (
    | {
        options: { label: string; value: number }[];
        getData?: never;
      }
    | {
        options?: never;
        getData: (
          input: RequestInput,
        ) => Promise<ResponseDto<PaginatedResponseDto<GenericSelectDataDto>>>;
      }
  );

interface DateFilterableField extends BaseFilterableField {
  type: FilterType.DATE;
  allowedOperators: (
    | DateOperators
    | EqualityOperators
    | NullaryOperators
    | BetweenOperators
  )[];
}

type FilterableField =
  | TextFilterableField
  | NumberFilterableField
  | BooleanFilterableField
  | MultiselectStringFilterableField
  | MultiselectNumberFilterableField
  | DateFilterableField;

interface FilterConditionBase {
  field: string;
  order?: number;
  meta?: any; // For storing additional data like labels for async multiselect
}

interface FilterConditionNullary extends FilterConditionBase {
  operator: NullaryOperators;
}

interface FilterConditionBoolean extends FilterConditionBase {
  operator: EqualityOperators;
  value: boolean;
}

interface FilterConditionNumber extends FilterConditionBase {
  operator: ComparisonOperators | EqualityOperators | BetweenOperators;
  value: number | { min: number; max: number };
}

interface FilterConditionString extends FilterConditionBase {
  operator: StringContainmentOperators | EqualityOperators;
  value: string;
}

interface FilterConditionArray extends FilterConditionBase {
  operator: ListOperators;
  value: (string | number)[];
}

interface FilterConditionDate extends FilterConditionBase {
  operator:
    | DateOperators
    | EqualityOperators
    | NullaryOperators
    | BetweenOperators;
  value: Date | { min: Date; max: Date };
}

type FilterCondition =
  | FilterConditionNullary
  | FilterConditionBoolean
  | FilterConditionNumber
  | FilterConditionString
  | FilterConditionArray
  | FilterConditionDate;

type MultiselectPropsString =
  | {
      options: { label: string; value: string }[];
      getData?: never;
    }
  | {
      options?: never;
      getData: (
        input: RequestInput,
      ) => Promise<ResponseDto<PaginatedResponseDto<GenericSelectDataDto>>>;
    };

type MultiselectPropsNumber =
  | {
      options: { label: string; value: number }[];
      getData?: never;
    }
  | {
      options?: never;
      getData: (
        input: RequestInput,
      ) => Promise<ResponseDto<PaginatedResponseDto<GenericSelectDataDto>>>;
    };

type SimpleField<P extends string> =
  | {
      field: P;
      type: FilterType.TEXT;
      label: string;
    }
  | {
      field: P;
      type: FilterType.NUMBER;
      label: string;
    }
  | {
      field: P;
      type: FilterType.BOOLEAN;
      label: string;
    }
  | {
      field: P;
      type: FilterType.DATE;
      label: string;
    }
  | ({
      field: P;
      type: FilterType.MULTISELECT_STRING;
      label: string;
    } & MultiselectPropsString)
  | ({
      field: P;
      type: FilterType.MULTISELECT_NUMBER;
      label: string;
    } & MultiselectPropsNumber);

type FilterValidationError = {
  field: string;
  operator: FilterOperator;
  reason: string;
};

export {
  FilterType,
  NullaryOperators,
  EqualityOperators,
  ComparisonOperators,
  StringContainmentOperators,
  ListOperators,
  DateOperators,
  BetweenOperators,
};

export type {
  FilterOperator,
  FilterableField,
  FilterConditionBase,
  FilterConditionNullary,
  FilterConditionBoolean,
  FilterConditionNumber,
  FilterConditionString,
  FilterConditionArray,
  FilterCondition,
  SimpleField,
  FilterValidationError,
  TextFilterableField,
  NumberFilterableField,
  BooleanFilterableField,
  MultiselectStringFilterableField,
  MultiselectNumberFilterableField,
  DateFilterableField,
};

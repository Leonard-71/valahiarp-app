import { ReactNode } from "react";

import { PaginatedResponseDto, RequestInput, ResponseDto } from "@/types";

export type AsyncMultiSelectOption = {
  value: string | number;
  label: string;
};

export interface InteriorDataType {
  lastSearch: string | null;
  page: number;
}

export interface AsyncMultiSelectProps<T extends AsyncMultiSelectOption> {
  className?: string;
  remove?: boolean;
  // Apel direct către controller-ul de backend.
  getData: (
    input: RequestInput,
  ) => Promise<ResponseDto<PaginatedResponseDto<T>>>;
  debounceTimeout?: number;
  onValueChange: (value: T[] | null) => void;
  value: T[] | null;
  minQueryLength?: number;
  isDisabled?: boolean;
  formatLabel?: (data: T) => ReactNode;
  placeholder?: string;
  isClearable?: boolean;
  isLoading?: boolean;
  instanceId?: string;
}

export type TAsyncMultiSelectReturn<T extends AsyncMultiSelectOption> =
  ResponseDto<PaginatedResponseDto<T>>;

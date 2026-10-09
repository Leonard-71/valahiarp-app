import { ReactElement } from "react";

import { PaginatedResponseDto, RequestInput, ResponseDto } from "@/types";

// O opțiune standard pentru componentele select.
export type OptionType = {
  value: number | string;
  label: string;
};

// Permite extinderea opțiunilor cu câmpuri suplimentare, fără a folosi `any`.
export type ExtendedOptionType = OptionType &
  Record<string, string | number | unknown>;

// Proprietățile acceptate de componentele AsyncSelect.
export interface AsyncSelectProps<T extends OptionType> {
  className?: string;
  remove?: boolean;
  // Apel direct către controller-ul de backend (ex: asyncSelectUsers).
  getData: (
    input: RequestInput,
  ) => Promise<ResponseDto<PaginatedResponseDto<T>>>;
  debounceTimeout?: number;
  onValueChange: (value: T | null) => void;
  value: T | null;
  minQueryLength?: number;
  isDisabled?: boolean;
  label?: string;
  requiredLabel?: boolean;
  description?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  formatLabel?: (data: T) => ReactElement;
  placeholder?: string;
  isClearable?: boolean;
  isLoading?: boolean;
  instanceId?: string;
  filters?: any[];
}

export interface InteriorDataType {
  lastSearch: string | null;
  page: number;
}

// Tipul răspunsului așteptat de la getData.
export type TAsyncSelectReturn<T extends OptionType> = ResponseDto<
  PaginatedResponseDto<T>
>;

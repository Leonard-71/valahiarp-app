import { Session } from "next-auth";

enum Reason {
  DATABASE_ERROR = "DATABASE_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  EXTERNAL_API_ERROR = "EXTERNAL_API_ERROR",
  UNAUTHORIZED_ERROR = "UNAUTHORIZED_ERROR",
  NOT_FOUND_ERROR = "NOT_FOUND_ERROR",
  TOO_MANY_REQUESTS_ERROR = "TOO_MANY_REQUESTS_ERROR",
  BUCKET_ERROR = "BUCKET_ERROR",
  EMAIL_CONFIG_ERROR = "EMAIL_CONFIG_ERROR",
  EMAIL_SEND_ERROR = "EMAIL_SEND_ERROR",
  STRIPE_ERROR = "STRIPE_ERROR",
  ONE_PER_MONTH = "ONE_PER_MONTH",
  ONE_PER_CATEGORY = "ONE_PER_CATEGORY",
  EXCLUSIVE_TO_OWNER = "EXCLUSIVE_TO_OWNER",
  REQUIRES_CODE = "REQUIRES_CODE",
  DEPENDS_ON_PARENT = "DEPENDS_ON_PARENT",
  NOT_AUTHENTICATED = "NOT_AUTHENTICATED",
  NO_USER_DETAILS = "NO_USER_DETAILS",
  CURRENCY_CONVERSION_FAILED = "CURRENCY_CONVERSION_FAILED",
}

type DataResponseDto<T> = {
  data: T;
  error: null;
};

type ErrorResponseDto = {
  data: null;
  error: {
    message: string;
    reason: Reason;
  };
};

type ResponseDto<T> = DataResponseDto<T> | ErrorResponseDto;

type HandlerDto<TArgs extends any[], TReturn> = (
  session: Session,
  ...args: TArgs
) => Promise<ResponseDto<TReturn>>;

type PaginatedResponseDto<T> = {
  content: T[];
  totalCount: number;
  pageCount: number;
  hasMore: boolean;
};

type GenericSelectDataDto = {
  label: string;
  value: string | number;
  meta?: any;
};

export { Reason };

export type {
  GenericSelectDataDto,
  DataResponseDto,
  ErrorResponseDto,
  ResponseDto,
  HandlerDto,
  PaginatedResponseDto,
};

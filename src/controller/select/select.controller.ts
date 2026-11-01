"use server";

import { Session } from "next-auth";

import { authGuard } from "@/guards";
import {
  selectCategories,
  selectSubscriptions,
  selectUsers,
} from "@/service/select";
import {
  GenericSelectDataDto,
  PaginatedResponseDto,
  Reason,
  RequestInput,
  ResponseDto,
} from "@/types";
import { requestValidator } from "@/validation";

const asyncSelectUsers = authGuard(
  async (
    session: Session,
    input: RequestInput,
  ): Promise<ResponseDto<PaginatedResponseDto<GenericSelectDataDto>>> => {
    const validatedInput = requestValidator.safeParse(input);

    if (!validatedInput.success) {
      return {
        data: null,
        error: {
          message: validatedInput.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };
    }

    return await selectUsers(validatedInput.data);
  },
);

const asyncSelectCategories = authGuard(
  async (
    session: Session,
    input: RequestInput,
  ): Promise<ResponseDto<PaginatedResponseDto<GenericSelectDataDto>>> => {
    const validatedInput = requestValidator.safeParse(input);

    if (!validatedInput.success) {
      return {
        data: null,
        error: {
          message: validatedInput.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };
    }

    return await selectCategories(validatedInput.data);
  },
);

const asyncSelectSubscriptions = authGuard(
  async (
    session: Session,
    input: RequestInput,
  ): Promise<ResponseDto<PaginatedResponseDto<GenericSelectDataDto>>> => {
    const validatedInput = requestValidator.safeParse(input);

    if (!validatedInput.success) {
      return {
        data: null,
        error: {
          message: validatedInput.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };
    }

    return await selectSubscriptions(validatedInput.data);
  },
);

export {
  asyncSelectUsers,
  asyncSelectCategories,
  asyncSelectSubscriptions,
};

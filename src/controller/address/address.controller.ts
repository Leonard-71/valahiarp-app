"use server";

import { Session } from "next-auth";

import { authGuard } from "@/guards";
import {
  findOrCreateAddressByQuery,
  findOrCreateByPlaceId,
} from "@/service/address";
import { SingleAddressResponseDto } from "@/types/address";
import { Reason, ResponseDto } from "@/types/utils";
import { addressQueryValidator, uuidValidator } from "@/validation";

const resolveAddressByQuery = authGuard(
  async (
    session: Session,
    input: string,
  ): Promise<ResponseDto<SingleAddressResponseDto | null>> => {
    const validated = addressQueryValidator.safeParse(input);

    if (!validated.success) {
      return {
        data: null,
        error: {
          message: validated.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };
    }

    return await findOrCreateAddressByQuery(validated.data);
  },
);

const resolveAddressByPlaceId = authGuard(
  async (
    session: Session,
    input: string,
  ): Promise<ResponseDto<SingleAddressResponseDto | null>> => {
 
    const validated = uuidValidator.safeParse(input);

    if (!validated.success) {
      return {
        data: null,
        error: {
          message: validated.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };
    }

    return await findOrCreateByPlaceId(validated.data);
  },
);

export { resolveAddressByQuery, resolveAddressByPlaceId };

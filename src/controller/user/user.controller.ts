"use server";

import { Session } from "next-auth";

import { authGuard } from "@/guards";
import { findOrCreateByPlaceId } from "@/service/address";
import { anonymize, findById, update } from "@/service/user";
import { SingleUserResponseDto, UpdateUserInput } from "@/types/user";
import { Reason, ResponseDto } from "@/types/utils";
import { updateUserValidator, uuidValidator } from "@/validation";

const findUserById = authGuard(
  async (
    session: Session,
    id: string,
  ): Promise<ResponseDto<SingleUserResponseDto>> => {
    const validatedId = uuidValidator.safeParse(id);

    if (!validatedId.success)
      return {
        data: null,
        error: {
          message: validatedId.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };

    return await findById(validatedId.data);
  },
);

const updateUser = authGuard(
  async (
    session: Session,
    id: string,
    input: UpdateUserInput,
  ): Promise<ResponseDto<SingleUserResponseDto>> => {
    const validatedInput = updateUserValidator.safeParse({
      id,
      ...input,
    });

    if (!validatedInput.success) {
      return {
        data: null,
        error: {
          message: validatedInput.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };
    }

    const address = await findOrCreateByPlaceId(input.addressId);

    if (address.error) {
      return address;
    }

    const { id: validatedId, ...rest } = validatedInput.data;

    return await update(validatedId, rest);
  },
);

const anonymizeUser = authGuard(
  async (
    session: Session,
    id: string,
  ): Promise<ResponseDto<SingleUserResponseDto>> => {
    const validatedId = uuidValidator.safeParse(id);

    if (!validatedId.success)
      return {
        data: null,
        error: {
          message: validatedId.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };

    return await anonymize(session, validatedId.data);
  },
);

export { findUserById, updateUser, anonymizeUser };

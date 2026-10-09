"use server";

import { Session } from "next-auth";

import { UserRole } from "@/generated/prisma";
import { authGuard } from "@/guards";
import {
  archive as archiveHouseService,
  checkNameExists as checkNameExistsService,
  create as createHouseService,
  findAll as findAllHousesService,
  findById as findHouseByIdService,
  recover as recoverHouseService,
  update as updateHouseService,
} from "@/service/house";
import {
  CreateHouseInput,
  PaginatedResponseDto,
  Reason,
  RequestInput,
  ResponseDto,
  SingleHouseResponseDto,
  UpdateHouseInput,
} from "@/types";
import { createHouseValidator, idValidator, requestValidator, updateHouseValidator } from "@/validation";

const createHouse = authGuard(
  async (
    session: Session,
    data: CreateHouseInput,
  ): Promise<ResponseDto<SingleHouseResponseDto>> => {
    const validatedData = createHouseValidator.safeParse(data);

    if (!validatedData.success) {
      return {
        data: null,
        error: {
          message: validatedData.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };
    }

    return await createHouseService(validatedData.data, session);
  },
  [UserRole.ADMIN],
);

const findAllHouses = authGuard(
  async (
    session: Session,
    input: RequestInput,
  ): Promise<ResponseDto<PaginatedResponseDto<SingleHouseResponseDto>>> => {
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

    return await findAllHousesService(validatedInput.data);
  },
);

const findHouseById = authGuard(
  async (
    session: Session,
    id: number,
  ): Promise<ResponseDto<SingleHouseResponseDto>> => {
    const validatedId = idValidator.safeParse(id);

    if (!validatedId.success) {
      return {
        data: null,
        error: {
          message: validatedId.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };
    }

    return await findHouseByIdService(validatedId.data);
  },
);

const updateHouse = authGuard(
  async (
    session: Session,
    id: number,
    data: UpdateHouseInput,
  ): Promise<ResponseDto<SingleHouseResponseDto>> => {
    const validatedId = idValidator.safeParse(id);
    const validatedData = updateHouseValidator.safeParse(data);

    if (!validatedId.success) {
      return {
        data: null,
        error: {
          message: validatedId.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };
    }

    if (!validatedData.success) {
      return {
        data: null,
        error: {
          message: validatedData.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };
    }

    return await updateHouseService(validatedId.data, validatedData.data, session);
  },
  [UserRole.ADMIN],
);

const archiveHouse = authGuard(
  async (
    session: Session,
    id: number,
  ): Promise<ResponseDto<SingleHouseResponseDto>> => {
    const validatedId = idValidator.safeParse(id);

    if (!validatedId.success) {
      return {
        data: null,
        error: {
          message: validatedId.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };
    }

    return await archiveHouseService(validatedId.data, session);
  },
  [UserRole.ADMIN],
);

const recoverHouse = authGuard(
  async (
    session: Session,
    id: number,
  ): Promise<ResponseDto<SingleHouseResponseDto>> => {
    const validatedId = idValidator.safeParse(id);

    if (!validatedId.success) {
      return {
        data: null,
        error: {
          message: validatedId.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };
    }

    return await recoverHouseService(validatedId.data, session);
  },
  [UserRole.ADMIN],
);

const checkHouseNameExists = authGuard(
  async (
    session: Session,
    name: string,
    excludeId?: number,
  ): Promise<ResponseDto<boolean>> => {
    if (!name || name.trim().length === 0) {
      return {
        data: false,
        error: null,
      };
    }

    return await checkNameExistsService(name.trim(), excludeId);
  },
);

export {
  archiveHouse,
  checkHouseNameExists,
  createHouse,
  findAllHouses,
  findHouseById,
  recoverHouse,
  updateHouse,
};

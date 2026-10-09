import { Decimal } from "@prisma/client/runtime/library";

import { Address } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { CreateAddressInput, SingleAddressResponseDto } from "@/types/address";
import { Reason, ResponseDto } from "@/types/utils";

import {
  findGoogleLocationByPlaceId,
  findGoogleLocationByQuery,
} from "./google-location.service";

const mapAddressToResponse = (address: Address): SingleAddressResponseDto => ({
  ...address,
  latitude: address.latitude?.toNumber(),
  longitude: address.longitude?.toNumber(),
});

const createAddress = async (
  input: CreateAddressInput,
): Promise<ResponseDto<SingleAddressResponseDto>> => {
  try {
    const created = await prisma.address.create({
      data: {
        ...input,
        latitude: new Decimal(input.latitude || 0),
        longitude: new Decimal(input.longitude || 0),
      },
    });

    return { data: mapAddressToResponse(created), error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : "Database error",
        reason: Reason.DATABASE_ERROR,
      },
    };
  }
};

const findAddressByQuery = async (
  query: string,
): Promise<ResponseDto<Address | null>> => {
  try {
    const address = await prisma.address.findFirst({
      where: {
        displayName: {
          contains: query,
          mode: "insensitive",
        },
      },
    });

    return { data: address, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : "Database error",
        reason: Reason.DATABASE_ERROR,
      },
    };
  }
};

const findOrCreateAddressByQuery = async (
  query: string,
): Promise<ResponseDto<SingleAddressResponseDto | null>> => {
  const localResult = await findAddressByQuery(query);

  if (localResult.data) {
    return { data: mapAddressToResponse(localResult.data), error: null };
  }

  const googleResponse = await findGoogleLocationByQuery(query);

  if (!googleResponse.data) {
    return {
      data: null,
      error: googleResponse.error,
    };
  }

  const existing = await findAddressByPlaceId(googleResponse.data.placeId);

  if (existing.data) {
    return { data: mapAddressToResponse(existing.data), error: null };
  }

  return await createAddress(googleResponse.data);
};

const findOrCreateByPlaceId = async (
  placeId: string,
): Promise<ResponseDto<SingleAddressResponseDto | null>> => {
  const localResult = await findAddressByPlaceId(placeId);

  if (localResult.data) {
    return { data: mapAddressToResponse(localResult.data), error: null };
  }

  const googleResponse = await findGoogleLocationByPlaceId(placeId);

  if (!googleResponse.data) {
    return {
      data: null,
      error: googleResponse.error,
    };
  }

  return await createAddress(googleResponse.data);
};

const findAddressByPlaceId = async (
  placeId: string,
): Promise<ResponseDto<Address | null>> => {
  try {
    const address = await prisma.address.findUnique({
      where: { placeId },
    });

    return { data: address, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : "Database error",
        reason: Reason.DATABASE_ERROR,
      },
    };
  }
};

export {
  createAddress,
  findAddressByQuery,
  findOrCreateByPlaceId,
  findOrCreateAddressByQuery,
  mapAddressToResponse,
  findAddressByPlaceId,
};

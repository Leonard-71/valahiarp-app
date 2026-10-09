import { Session } from "next-auth";

import { Prisma } from "@/generated/prisma";
import { decimalToNumber } from "@/lib/decimal-to-number";
import { applyGenericFilters } from "@/lib/filters/filter-apply";
import { houseFilterSpec } from "@/lib/filters/specs/house-filter-spec";
import prisma from "@/lib/prisma";
import { revalidateHousePaths } from "@/lib/revalidate";
import { searchBuilder } from "@/lib/search-builder";
import {
  CreateHouseInput,
  PaginatedResponseDto,
  Reason,
  RequestInput,
  ResponseDto,
  SingleHouseResponseDto,
  UpdateHouseInput,
} from "@/types";
import { validateFiltersDetailed } from "@/validation";

type HousePayload = Prisma.HouseGetPayload<{
  include: {
    createdBy: true;
    archivedBy: true;
  };
}>;

const transformHouseToDto = (house: HousePayload): SingleHouseResponseDto => {
  return {
    ...house,
    taxPrice: decimalToNumber(house.taxPrice),
    price: decimalToNumber(house.price),
  };
};

const checkNameExists = async (
  name: string,
  excludeId?: number,
): Promise<ResponseDto<boolean>> => {
  try {
    const existingHouse = await prisma.house.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
        isArchived: false,
        ...(excludeId && { id: { not: excludeId } }),
      },
    });

    return {
      data: !!existingHouse,
      error: null,
    };
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

const create = async (
  data: CreateHouseInput,
  session: Session,
): Promise<ResponseDto<SingleHouseResponseDto>> => {
  try {
    // Check if name already exists
    const nameExistsResult = await checkNameExists(data.name);
    if (nameExistsResult.error) {
      return {
        data: null,
        error: nameExistsResult.error,
      };
    }

    if (nameExistsResult.data) {
      return {
        data: null,
        error: {
          message: "O casă cu acest nume există deja",
          reason: Reason.VALIDATION_ERROR,
        },
      };
    }

    const house = await prisma.house.create({
      data: {
        ...data,
        createdById: session.user.id,
      },
      include: {
        createdBy: true,
        archivedBy: true,
      },
    });
    revalidateHousePaths();

    return {
      data: transformHouseToDto(house),
      error: null,
    };
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

const findById = async (
  id: number,
): Promise<ResponseDto<SingleHouseResponseDto>> => {
  try {
    const house = await prisma.house.findUnique({
      where: { id, isArchived: false },
      include: {
        createdBy: true,
        archivedBy: true,
      },
    });

    if (!house) {
      return {
        data: null,
        error: {
          message: "House not found",
          reason: Reason.NOT_FOUND_ERROR,
        },
      };
    }

    return {
      data: transformHouseToDto(house),
      error: null,
    };
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

const findAll = async (
  input: RequestInput,
): Promise<ResponseDto<PaginatedResponseDto<SingleHouseResponseDto>>> => {
  try {
    const { pagination, search, filters } = input;

    const orderBy: Prisma.HouseOrderByWithRelationInput = {
      sortOrder: "asc",
    };

    let where: Prisma.HouseWhereInput = {
      isArchived: false,
    };

    if (search) {
      where = searchBuilder<SingleHouseResponseDto>(search, ["name"]);
    }

    if (filters) {
      const { isValid, errors } = validateFiltersDetailed(
        filters,
        houseFilterSpec,
      );

      if (!isValid) {
        return {
          data: null,
          error: {
            message: `Invalid filters: ${errors.map((e) => `${e.field}: ${e.reason}`).join("; ")}`,
            reason: Reason.VALIDATION_ERROR,
          },
        };
      }

      const prismaFilters = applyGenericFilters(houseFilterSpec, filters);
      Object.assign(where, prismaFilters);
    }

    const { pageIndex, pageSize } = pagination;

    const [houses, totalCount] = await prisma.$transaction([
      prisma.house.findMany({
        where,
        skip: pageIndex * pageSize,
        take: pageSize,
        orderBy,
        include: {
          createdBy: true,
          archivedBy: true,
        },
      }),
      prisma.house.count({ where }),
    ]);

    const hasMore = (pageIndex + 1) * pageSize < totalCount;
    const content = houses.map(transformHouseToDto);
    const pageCount = Math.ceil(totalCount / pageSize);

    return {
      data: {
        content,
        totalCount,
        pageCount,
        hasMore,
      },
      error: null,
    };
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

const update = async (
  id: number,
  data: UpdateHouseInput,
  _session: Session,
): Promise<ResponseDto<SingleHouseResponseDto>> => {
  try {
    if (data.name) {
      const nameExistsResult = await checkNameExists(data.name, id);
      if (nameExistsResult.error) {
        return {
          data: null,
          error: nameExistsResult.error,
        };
      }

      if (nameExistsResult.data) {
        return {
          data: null,
          error: {
            message: "O casă cu acest nume există deja",
            reason: Reason.VALIDATION_ERROR,
          },
        };
      }
    }

    const house = await prisma.house.update({
      where: { id, isArchived: false },
      data,
      include: {
        createdBy: true,
        archivedBy: true,
      },
    });
    revalidateHousePaths();

    return {
      data: transformHouseToDto(house),
      error: null,
    };
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

const archive = async (
  id: number,
  session: Session,
): Promise<ResponseDto<SingleHouseResponseDto>> => {
  try {
    const house = await prisma.house.update({
      where: { id, isArchived: false },
      data: {
        isArchived: true,
        archivedAt: new Date(),
        archivedById: session.user.id,
      },
      include: {
        createdBy: true,
        archivedBy: true,
      },
    });
    revalidateHousePaths();

    return {
      data: transformHouseToDto(house),
      error: null,
    };
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

const recover = async (
  id: number,
  _session: Session,
): Promise<ResponseDto<SingleHouseResponseDto>> => {
  try {
    const house = await prisma.house.update({
      where: { id, isArchived: true },
      data: {
        isArchived: false,
        archivedAt: null,
        archivedById: null,
      },
      include: {
        createdBy: true,
        archivedBy: true,
      },
    });
    revalidateHousePaths();

    return {
      data: transformHouseToDto(house),
      error: null,
    };
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

export { archive, checkNameExists, create, findAll, findById, recover, update };

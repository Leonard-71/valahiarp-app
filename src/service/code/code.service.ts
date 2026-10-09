import { Session } from "next-auth";

import { DAY_IN_MS } from "@/constants/utils/day-in-ms";
import { Prisma } from "@/generated/prisma";
import { decimalToNumber } from "@/lib/decimal-to-number";
import { applyGenericFilters } from "@/lib/filters/filter-apply";
import { codeFilterSpec } from "@/lib/filters/specs/code-filter-spec";
import prisma from "@/lib/prisma";
import { revalidateCodePaths } from "@/lib/revalidate";
import { searchBuilder } from "@/lib/search-builder";
import {
  CodeWithRelationsDto,
  CreateCodeInput,
  SingleCodeResponseDto,
} from "@/types";
import {
  PaginatedResponseDto,
  Reason,
  RequestInput,
  ResponseDto,
} from "@/types/utils";
import { validateFiltersDetailed } from "@/validation";

type CodePayload = Prisma.CodeGetPayload<{
  include: { createdBy: true; user: true; subscription: true };
}>;

const transformCodeToDto = async (
  code: CodePayload,
): Promise<CodeWithRelationsDto> => {
  return {
    ...code,
    subscription: code.subscription
      ? {
          ...code.subscription,
          price: decimalToNumber(code.subscription.price),
        }
      : null,
  };
};

const create = async (
  session: Session,
  data: CreateCodeInput,
): Promise<ResponseDto<SingleCodeResponseDto>> => {
  try {
    const { activeFor, ...rest } = data;
    const code = await prisma.code.create({
      data: {
        ...rest,
        createdById: session.user.id,
        expiresAt: new Date(Date.now() + activeFor * DAY_IN_MS),
      },
    });
    revalidateCodePaths();

    return {
      data: code,
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
  session: Session,
  id: number,
): Promise<ResponseDto<void>> => {
  try {
    await prisma.code.update({
      where: { id },
      data: {
        isArchived: true,
        archivedAt: new Date(),
        archivedById: session.user.id!,
      },
    });
    revalidateCodePaths();

    return {
      data: undefined,
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
): Promise<ResponseDto<PaginatedResponseDto<CodeWithRelationsDto>>> => {
  try {
    const { pagination, search, filters } = input;

    const orderBy: Prisma.CodeOrderByWithRelationInput = {
      createdAt: "desc",
    };

    let where: Prisma.CodeWhereInput = {};

    if (search) {
      where = searchBuilder<CodeWithRelationsDto>(search, [
        "user.email",
        "subscription.name",
      ]);
    }

    if (filters) {
      const { isValid, errors } = validateFiltersDetailed(
        filters,
        codeFilterSpec,
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

      const prismaFilters = applyGenericFilters(codeFilterSpec, filters);
      Object.assign(where, prismaFilters);
    }

    if (pagination) {
      const { pageIndex, pageSize } = pagination;

      const [codes, totalCount] = await prisma.$transaction([
        prisma.code.findMany({
          where,
          skip: pageIndex * pageSize,
          take: pageSize,
          orderBy,
          include: {
            createdBy: true,
            user: true,
            subscription: true,
          },
        }),
        prisma.code.count({ where }),
      ]);

      const hasMore = totalCount > pageIndex * pageSize;

      const content = await Promise.all(codes.map(transformCodeToDto));

      return {
        data: {
          content,
          totalCount,
          pageCount: Math.ceil(totalCount / pageSize),
          hasMore,
        },
        error: null,
      };
    } else {
      const codes = await prisma.code.findMany({
        where,
        orderBy,
        include: {
          createdBy: true,
          user: true,
          subscription: true,
        },
      });

      const content = await Promise.all(codes.map(transformCodeToDto));

      return {
        data: {
          content,
          totalCount: codes.length,
          pageCount: 1,
          hasMore: false,
        },
        error: null,
      };
    }
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

const findCodePresenceOnSubscriptions = async (
  session: Session,
  subscriptionIds: number[],
): Promise<ResponseDto<SingleCodeResponseDto[]>> => {
  try {
    const codes = await prisma.code.findMany({
      where: {
        userId: session.user.id,
        subscriptionId: { in: subscriptionIds },
        isArchived: false,
        expiresAt: { gte: new Date() },
      },
      orderBy: {
        expiresAt: "desc",
      },
      distinct: ["subscriptionId"],
    });

    return {
      data: codes,
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

const findCodePresenceOnSubscription = async (
  session: Session,
  subscriptionId: number,
): Promise<ResponseDto<SingleCodeResponseDto | null>> => {
  try {
    const code = await prisma.code.findFirst({
      where: {
        userId: session.user.id,
        subscriptionId,
        isArchived: false,
        expiresAt: { gte: new Date() },
      },
      orderBy: {
        expiresAt: "desc",
      },
    });

    return {
      data: code,
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

export {
  create,
  findAll,
  archive,
  findCodePresenceOnSubscriptions,
  findCodePresenceOnSubscription,
};

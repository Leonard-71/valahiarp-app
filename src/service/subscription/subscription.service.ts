import { Session } from "next-auth";

import { Prisma } from "@/generated/prisma";
import { decimalToNumber } from "@/lib/decimal-to-number";
import { documentToDocumentWithUrl } from "@/lib/document-to-document-with-url";
import { applyGenericFilters } from "@/lib/filters/filter-apply";
import { subscriptionFilterSpec } from "@/lib/filters/specs/subscription-filter-spec";
import prisma from "@/lib/prisma";
import { revalidateSubscriptionPaths } from "@/lib/revalidate";
import { searchBuilder } from "@/lib/search-builder";
import {
  CreateSubscriptionInput,
  PaginatedResponseDto,
  Reason,
  RequestInput,
  ResponseDto,
  SingleSubscriptionResponseDto,
  UpdateSubscriptionInput,
} from "@/types";
import { validateFiltersDetailed } from "@/validation";

type SubscriptionPayload = Prisma.SubscriptionGetPayload<{
  include: {
    location: true;
    documents: true;
    category: {
      include: {
        configuration: true;
      };
    };
    dependsOnParent: true;
    createdBy: true;
  };
}>;

const transformSubscriptionToDto = async (
  subscription: SubscriptionPayload,
): Promise<SingleSubscriptionResponseDto> => {
  return {
    ...subscription,
    price: decimalToNumber(subscription.price),
    documents: await Promise.all(
      subscription.documents.map(documentToDocumentWithUrl),
    ),
    dependsOnParent: subscription.dependsOnParent
      ? {
          ...subscription.dependsOnParent,
          price: decimalToNumber(subscription.dependsOnParent.price),
        }
      : null,
  };
};

const create = async (
  session: Session,
  data: CreateSubscriptionInput,
): Promise<ResponseDto<SingleSubscriptionResponseDto>> => {
  try {
    const { location, ...fields } = data;
    const subscription = await prisma.subscription.create({
      data: {
        ...fields,
        createdById: session.user.id,
        location: {
          create: location,
        },
      },
      include: {
        location: true,
        documents: true,
        category: {
          include: {
            configuration: true,
          },
        },
        dependsOnParent: true,
        createdBy: true,
      },
    });
    revalidateSubscriptionPaths();

    return {
      data: await transformSubscriptionToDto(subscription),
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
): Promise<ResponseDto<SingleSubscriptionResponseDto>> => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { id },
      include: {
        location: true,
        documents: true,
        category: {
          include: {
            configuration: true,
          },
        },
        dependsOnParent: true,
        createdBy: true,
      },
    });

    if (!subscription) {
      return {
        data: null,
        error: {
          message: "Subscription not found",
          reason: Reason.NOT_FOUND_ERROR,
        },
      };
    }

    return {
      data: await transformSubscriptionToDto(subscription),
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
): Promise<
  ResponseDto<PaginatedResponseDto<SingleSubscriptionResponseDto>>
> => {
  try {
    const { pagination, search, filters } = input;

    const orderBy: Prisma.SubscriptionOrderByWithRelationInput = {
      createdAt: "desc",
    };

    let where: Prisma.SubscriptionWhereInput = {};

    if (search) {
      where = searchBuilder<SingleSubscriptionResponseDto>(search, [
        "name",
        "category.name",
        "dependsOnParent.name",
      ]);
    }

    if (filters) {
      const { isValid, errors } = validateFiltersDetailed(
        filters,
        subscriptionFilterSpec,
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

      const prismaFilters = applyGenericFilters(
        subscriptionFilterSpec,
        filters,
      );
      Object.assign(where, prismaFilters);
    }

    const { pageIndex, pageSize } = pagination;

    const [subscriptions, totalCount] = await prisma.$transaction([
      prisma.subscription.findMany({
        where,
        skip: pageIndex * pageSize,
        take: pageSize,
        orderBy,
        include: {
          location: true,
          documents: true,
          category: {
            include: {
              configuration: true,
            },
          },
          dependsOnParent: true,
          createdBy: true,
        },
      }),
      prisma.subscription.count({ where }),
    ]);

    const hasMore = (pageIndex + 1) * pageSize < totalCount;
    const content = await Promise.all(
      subscriptions.map(transformSubscriptionToDto),
    );

    return {
      data: {
        content,
        totalCount,
        pageCount: Math.ceil(totalCount / pageSize),
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
  data: UpdateSubscriptionInput,
): Promise<ResponseDto<SingleSubscriptionResponseDto>> => {
  try {
    const { location, ...fields } = data;

    const locationAction: Prisma.SubscriptionUpdateInput["location"] = location
      ? {
          upsert: {
            create: location,
            update: location,
          },
        }
      : undefined;

    const subscription = await prisma.subscription.update({
      where: { id },
      data: {
        ...fields,
        location: locationAction,
      },
      include: {
        location: true,
        documents: true,
        category: {
          include: {
            configuration: true,
          },
        },
        dependsOnParent: true,
        createdBy: true,
      },
    });
    revalidateSubscriptionPaths();

    return {
      data: await transformSubscriptionToDto(subscription),
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
    await prisma.subscription.update({
      where: { id },
      data: {
        isArchived: true,
        archivedAt: new Date(),
        archivedById: session.user.id!,
      },
    });
    revalidateSubscriptionPaths();

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

const recover = async (id: number): Promise<ResponseDto<void>> => {
  try {
    await prisma.subscription.update({
      where: { id },
      data: {
        isArchived: false,
        archivedAt: null,
        archivedById: null,
      },
    });
    revalidateSubscriptionPaths();

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

export { create, findById, findAll, update, archive, recover };

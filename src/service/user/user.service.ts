import { Session } from "next-auth";

import { LOCALE } from "@/constants/order/locale";
import { Prisma, UserRole } from "@/generated/prisma";
import { applyGenericFilters } from "@/lib/filters/filter-apply";
import { userFilterSpec } from "@/lib/filters/specs/user-filter-spec";
import { stripeAddressFromManual } from "@/lib/manual-address";
import prisma from "@/lib/prisma";
import { revalidateUserPaths } from "@/lib/revalidate";
import { searchBuilder } from "@/lib/search-builder";
import { getStripe, isMissingStripeCustomer } from "@/lib/stripe";
import {
  CreateUserInput,
  SingleUserResponseDto,
  UpdateUserByAdminInput,
  UpdateUserInput,
} from "@/types/user";
import { UserWithRelationsDto } from "@/types/user/dto/user-with-relations.dto";
import {
  PaginatedResponseDto,
  Reason,
  RequestInput,
  ResponseDto,
} from "@/types/utils";
import { validateFiltersDetailed } from "@/validation/utils/filter";

const userInclude = {
  manualAddress: true,
} as const;

const create = async (
  data: CreateUserInput,
): Promise<ResponseDto<SingleUserResponseDto>> => {
  try {
    const user = await prisma.user.create({
      data,
      include: userInclude,
    });
    revalidateUserPaths();

    return {
      data: user,
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
  id: string,
): Promise<ResponseDto<SingleUserResponseDto>> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: userInclude,
    });

    if (!user) {
      return {
        data: null,
        error: {
          message: "User not found",
          reason: Reason.NOT_FOUND_ERROR,
        },
      };
    }

    return {
      data: user,
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

const findByEmail = async (
  email: string,
): Promise<ResponseDto<SingleUserResponseDto | null>> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: userInclude,
    });

    return {
      data: user,
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
): Promise<ResponseDto<PaginatedResponseDto<SingleUserResponseDto>>> => {
  try {
    const { pagination, search, filters } = input;

    const orderBy: Prisma.UserOrderByWithRelationInput = {
      createdAt: "desc",
    };

    let where: Prisma.UserWhereInput = {};

    if (search) {
      where = searchBuilder<UserWithRelationsDto>(search, [
        "name",
        "email",
        "username",
        "manualAddress.country",
        "manualAddress.county",
        "manualAddress.locality",
        "manualAddress.street",
      ]);
    }

    if (filters) {
      const { isValid, errors } = validateFiltersDetailed(
        filters,
        userFilterSpec,
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

      const prismaFilters = applyGenericFilters(userFilterSpec, filters);
      Object.assign(where, prismaFilters);
    }

    const { pageIndex, pageSize } = pagination;

    const [users, totalCount] = await prisma.$transaction([
      prisma.user.findMany({
        where,
        skip: pageIndex * pageSize,
        take: pageSize,
        orderBy,
        include: userInclude,
      }),
      prisma.user.count({ where }),
    ]);

    const hasMore = (pageIndex + 1) * pageSize < totalCount;

    return {
      data: {
        content: users,
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

const getAdminEmails = async (): Promise<ResponseDto<string[]>> => {
  try {
    const emails = await prisma.user.findMany({
      where: { role: UserRole.ADMIN },
      select: { email: true },
    });

    return {
      data: emails.map((e) => e.email),
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
  id: string,
  data: UpdateUserByAdminInput,
): Promise<ResponseDto<SingleUserResponseDto>> => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data,
      include: userInclude,
    });
    revalidateUserPaths();

    if (!user) {
      return {
        data: null,
        error: {
          message: "User not found",
          reason: Reason.NOT_FOUND_ERROR,
        },
      };
    }

    if (user.stripeCustomerId) {
      const stripe = getStripe();

      try {
        await stripe.customers.update(user.stripeCustomerId, {
          name: user.name ?? "",
          email: user.email,
          phone: user.phone ?? "",
          address: stripeAddressFromManual(user.manualAddress),
          preferred_locales: [LOCALE],
        });
      } catch (error) {
        if (!isMissingStripeCustomer(error)) {
          throw error;
        }

        await prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: null },
        });
      }
    }

    return {
      data: user,
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

const updateProfile = async (
  id: string,
  data: UpdateUserInput,
): Promise<ResponseDto<SingleUserResponseDto>> => {
  try {
    const street = data.street?.trim() || null;
    const user = await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        manualAddress: {
          upsert: {
            create: {
              country: data.country,
              county: data.county,
              locality: data.locality,
              street,
            },
            update: {
              country: data.country,
              county: data.county,
              locality: data.locality,
              street,
            },
          },
        },
      },
      include: userInclude,
    });
    revalidateUserPaths();

    if (user.stripeCustomerId) {
      const stripe = getStripe();

      try {
        await stripe.customers.update(user.stripeCustomerId, {
          name: user.name ?? "",
          email: user.email,
          phone: user.phone ?? "",
          address: stripeAddressFromManual(user.manualAddress),
          preferred_locales: [LOCALE],
        });
      } catch (error) {
        if (!isMissingStripeCustomer(error)) {
          throw error;
        }

        await prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: null },
        });
      }
    }

    return {
      data: user,
      error: null,
    };
  } catch (error) {
    const isEmailTaken =
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002";

    return {
      data: null,
      error: {
        message: isEmailTaken
          ? "Există deja un cont cu acest email."
          : error instanceof Error
            ? error.message
            : "Database error",
        reason: Reason.DATABASE_ERROR,
      },
    };
  }
};

const updateCustomerId = async (
  id: string,
  stripeCustomerId: string,
): Promise<ResponseDto<SingleUserResponseDto>> => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { stripeCustomerId },
      include: userInclude,
    });
    revalidateUserPaths();

    return {
      data: user,
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

const anonymize = async (
  session: Session,
  id: string,
): Promise<ResponseDto<SingleUserResponseDto>> => {
  try {
    const anonymizedEmail = `anonymized_${id}@anonymized.local`;

    await prisma.manualAddress.deleteMany({ where: { userId: id } });

    const user = await prisma.user.update({
      where: { id },
      data: {
        email: anonymizedEmail,
        name: null,
        phone: null,
        username: null,
        imageUrl: null,
        isArchived: true,
        archivedAt: new Date(),
        archivedById: session.user.id,
      },
      include: userInclude,
    });
    revalidateUserPaths();

    if (user.stripeCustomerId) {
      const stripe = getStripe();

      await stripe.customers.update(user.stripeCustomerId, {
        email: anonymizedEmail,
        name: "",
        phone: "",
        address: {
          line1: "",
          city: "",
          state: "",
          country: "",
          postal_code: "",
        },
      });
    }

    return {
      data: user,
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
  findById,
  findByEmail,
  findAll,
  update,
  updateProfile,
  updateCustomerId,
  anonymize,
  getAdminEmails,
};

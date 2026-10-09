"use server";

import { auth } from "@/auth";
import { UserRole } from "@/generated/prisma";
import { HandlerDto, Reason, ResponseDto } from "@/types/utils";

const authGuard = <TArgs extends any[], TReturn>(
  handler: HandlerDto<TArgs, TReturn>,
  roles: UserRole[] = [],
): ((...args: TArgs) => Promise<ResponseDto<TReturn>>) => {
  return async (...args: TArgs) => {
    const session = await auth();

    if (!session?.user) {
      return {
        data: null,
        error: {
          message: "Unauthorized error",
          reason: Reason.UNAUTHORIZED_ERROR,
        },
      };
    }

    if (roles.length > 0 && !roles.includes(session.user.role)) {
      return {
        data: null,
        error: {
          message: "Unauthorized error",
          reason: Reason.UNAUTHORIZED_ERROR,
        },
      };
    }

    return handler(session, ...args);
  };
};

export { authGuard };

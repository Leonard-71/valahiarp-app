"use server";

import { Session } from "next-auth";

import { authGuard } from "@/guards";
import { ListOperators } from "@/lib/filters/filter-types";
import { checkout, findAll as findAllOrderService } from "@/service/order";
import { SingleOrderWithInvoiceLinksResponseDto } from "@/types";
import {
  PaginatedResponseDto,
  Reason,
  RequestInput,
  ResponseDto,
} from "@/types/utils";
import { idValidator, requestValidator } from "@/validation";

const checkoutOrder = authGuard(
  async (
    session: Session,
    subscriptionId: number,
  ): Promise<ResponseDto<null>> => {
    const validatedSubscriptionId = idValidator.safeParse(subscriptionId);

    if (!validatedSubscriptionId.success)
      return {
        data: null,
        error: {
          message: validatedSubscriptionId.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };

    return await checkout(session, subscriptionId);
  },
);

const findAllUserOrders = authGuard(
  async (
    session: Session,
    input: RequestInput,
  ): Promise<
    ResponseDto<PaginatedResponseDto<SingleOrderWithInvoiceLinksResponseDto>>
  > => {
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

    const userIdFilter = {
      field: "userId",
      operator: ListOperators.IN_LIST,
      value: [session.user.id!],
    };

    const inputWithUserFilter = {
      ...validatedInput.data,
      filters: [...(validatedInput.data.filters || []), userIdFilter],
    };

    return await findAllOrderService(inputWithUserFilter);
  },
);

export { checkoutOrder, findAllUserOrders };

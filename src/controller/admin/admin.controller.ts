"use server";

import { Session } from "next-auth";

import DOMPurify from "isomorphic-dompurify";

import { UserRole } from "@/generated/prisma";
import { authGuard } from "@/guards";
import {
  archive as archiveCategoryService,
  create as createCategoryService,
  findAll as findAllCategoriesService,
  findById as findCategoryByIdService,
  recover as recoverCategoryService,
  update as updateCategoryService,
} from "@/service/category";
import {
  archive as archiveCode,
  create as createCodeService,
  findAll as findAllCodesService,
} from "@/service/code";
import {
  create as createDocumentService,
  createSignedUrl,
  remove as removeDocumentService,
} from "@/service/document";
import {
  findAll as findAllOrderService,
  generateOrderReport as generateOrderReportService,
  refund as refundOrderService,
  revoke as revokeOrderService,
} from "@/service/order";
import {
  archive as archiveSubscriptionService,
  create as createSubscriptionService,
  findAll as findAllSubscriptionsService,
  findById as findSubscriptionByIdService,
  recover as recoverSubscriptionService,
  update as updateSubscriptionService,
} from "@/service/subscription";
import {
  findAll as findAllUsersService,
  update as updateUserService,
} from "@/service/user";
import {
  CreateCategoryInput,
  CreateCodeInput,
  CreateDocumentInput,
  CreateSubscriptionInput,
  PaginatedResponseDto,
  Reason,
  RequestInput,
  ResponseDto,
  SingleCategoryResponseDto,
  SingleCodeResponseDto,
  SingleDocumentResponseDto,
  SingleOrderResponseDto,
  SingleOrderWithInvoiceLinksResponseDto,
  SingleSubscriptionResponseDto,
  SingleUrlResponseDto,
  SingleUserResponseDto,
  UpdateCategoryInput,
  UpdateSubscriptionInput,
} from "@/types";
import { CodeWithRelationsDto } from "@/types/code";
import {
  OrderReportRequestDto,
  OrderReportResponseDto,
} from "@/types/order/dto";
import { UpdateUserByAdminInput } from "@/types/user";
import {
  createCategoryValidator,
  createCodeValidator,
  createDocumentValidator,
  createSubscriptionValidator,
  idValidator,
  keyValidator,
  orderReportValidator,
  requestValidator,
  updateCategoryValidator,
  updateSubscriptionValidator,
  updateUserByAdminValidator,
} from "@/validation";

const findAllUsers = authGuard(
  async (
    session: Session,
    input: RequestInput,
  ): Promise<ResponseDto<PaginatedResponseDto<SingleUserResponseDto>>> => {
    const validatedQuery = requestValidator.safeParse(input);

    if (!validatedQuery.success) {
      return {
        data: null,
        error: {
          message: validatedQuery.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };
    }

    return await findAllUsersService(validatedQuery.data);
  },
  [UserRole.ADMIN],
);

const updateUserByAdmin = authGuard(
  async (
    session: Session,
    id: string,
    input: UpdateUserByAdminInput,
  ): Promise<ResponseDto<SingleUserResponseDto>> => {
    if (session.user.id === id) {
      return {
        data: null,
        error: {
          message: "Nu poți actualiza propriul tău utilizator.",
          reason: Reason.UNAUTHORIZED_ERROR,
        },
      };
    }

    const validatedInput = updateUserByAdminValidator.safeParse({
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

    const { id: validatedId, ...rest } = validatedInput.data;

    return await updateUserService(validatedId, rest);
  },
  [UserRole.ADMIN],
);

const findAllCategories = authGuard(
  async (
    session: Session,
    input: RequestInput,
  ): Promise<ResponseDto<PaginatedResponseDto<SingleCategoryResponseDto>>> => {
    const validatedQuery = requestValidator.safeParse(input);

    if (!validatedQuery.success) {
      return {
        data: null,
        error: {
          message: validatedQuery.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };
    }

    return await findAllCategoriesService(validatedQuery.data);
  },
  [UserRole.ADMIN],
);

const findAllCodes = authGuard(
  async (
    session: Session,
    input: RequestInput,
  ): Promise<ResponseDto<PaginatedResponseDto<CodeWithRelationsDto>>> => {
    const validatedQuery = requestValidator.safeParse(input);

    if (!validatedQuery.success) {
      return {
        data: null,
        error: {
          message: validatedQuery.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };
    }

    return await findAllCodesService(validatedQuery.data);
  },
  [UserRole.ADMIN],
);

const createCode = authGuard(
  async (
    session: Session,
    data: CreateCodeInput,
  ): Promise<ResponseDto<SingleCodeResponseDto>> => {
    const validatedData = createCodeValidator.safeParse(data);

    if (!validatedData.success)
      return {
        data: null,
        error: {
          message: validatedData.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };

    return await createCodeService(session, validatedData.data);
  },
  [UserRole.ADMIN],
);

const deactivateCode = authGuard(
  async (session: Session, id: number): Promise<ResponseDto<void>> => {
    const validatedData = idValidator.safeParse(id);

    if (!validatedData.success)
      return {
        data: null,
        error: {
          message: validatedData.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };

    return await archiveCode(session, validatedData.data);
  },
  [UserRole.ADMIN],
);

const findCategoryById = authGuard(
  async (
    session: Session,
    id: number,
  ): Promise<ResponseDto<SingleCategoryResponseDto>> => {
    const validatedId = idValidator.safeParse(id);

    if (!validatedId.success)
      return {
        data: null,
        error: {
          message: validatedId.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };

    return await findCategoryByIdService(validatedId.data);
  },
  [UserRole.ADMIN],
);

const createCategory = authGuard(
  async (
    session: Session,
    input: CreateCategoryInput,
  ): Promise<ResponseDto<SingleCategoryResponseDto>> => {
    const validatedInput = createCategoryValidator.safeParse(input);

    if (!validatedInput.success)
      return {
        data: null,
        error: {
          message: validatedInput.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };

    return await createCategoryService(session, input);
  },
  [UserRole.ADMIN],
);

const updateCategory = authGuard(
  async (
    session: Session,
    id: number,
    input: UpdateCategoryInput,
  ): Promise<ResponseDto<SingleCategoryResponseDto>> => {
    const validatedInput = updateCategoryValidator.safeParse({
      ...input,
      id,
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

    const { id: validatedId, ...rest } = validatedInput.data;

    return await updateCategoryService(validatedId, rest);
  },
  [UserRole.ADMIN],
);

const createDocument = authGuard(
  async (
    session: Session,
    input: CreateDocumentInput,
  ): Promise<ResponseDto<SingleDocumentResponseDto>> => {
    const validatedInput = createDocumentValidator.safeParse(input);

    if (!validatedInput.success) {
      return {
        data: null,
        error: {
          message: validatedInput.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };
    }

    return await createDocumentService(session, validatedInput.data);
  },
  [UserRole.ADMIN],
);

const createDocumentSignedUrl = authGuard(
  async (
    session: Session,
    key: string,
  ): Promise<ResponseDto<SingleUrlResponseDto>> => {
    const validatedKey = keyValidator.safeParse(key);

    if (!validatedKey.success) {
      return {
        data: null,
        error: {
          message: validatedKey.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };
    }

    return await createSignedUrl(validatedKey.data);
  },
  [UserRole.ADMIN],
);

const removeDocument = authGuard(
  async (session: Session, key: string): Promise<ResponseDto<null>> => {
    const validatedKey = keyValidator.safeParse(key);

    if (!validatedKey.success) {
      return {
        data: null,
        error: {
          message: validatedKey.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };
    }

    return await removeDocumentService(validatedKey.data);
  },
  [UserRole.ADMIN],
);

const findSubscriptionById = authGuard(
  async (
    session: Session,
    id: number,
  ): Promise<ResponseDto<SingleSubscriptionResponseDto>> => {
    const validatedId = idValidator.safeParse(id);

    if (!validatedId.success)
      return {
        data: null,
        error: {
          message: validatedId.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };

    return await findSubscriptionByIdService(validatedId.data);
  },
  [UserRole.ADMIN],
);

const findAllSubscriptions = authGuard(
  async (
    session: Session,
    input: RequestInput,
  ): Promise<
    ResponseDto<PaginatedResponseDto<SingleSubscriptionResponseDto>>
  > => {
    const validatedQuery = requestValidator.safeParse(input);

    if (!validatedQuery.success) {
      return {
        data: null,
        error: {
          message: validatedQuery.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };
    }

    return await findAllSubscriptionsService(validatedQuery.data);
  },
  [UserRole.ADMIN],
);

const createSubscription = authGuard(
  async (
    session: Session,
    input: CreateSubscriptionInput,
  ): Promise<ResponseDto<SingleSubscriptionResponseDto>> => {
    const validatedInput = createSubscriptionValidator.safeParse(input);

    if (!validatedInput.success) {
      return {
        data: null,
        error: {
          message: validatedInput.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };
    }

    const { description, ...rest } = validatedInput.data;

    const sanitizedDescription = description
      ? DOMPurify.sanitize(description)
      : description;

    return await createSubscriptionService(session, {
      ...rest,
      description: sanitizedDescription,
    });
  },
  [UserRole.ADMIN],
);

const updateSubscription = authGuard(
  async (
    session: Session,
    id: number,
    input: UpdateSubscriptionInput,
  ): Promise<ResponseDto<SingleSubscriptionResponseDto>> => {
    const validatedInput = updateSubscriptionValidator.safeParse({
      ...input,
      id,
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

    const { id: validatedId, description, ...rest } = validatedInput.data;

    const sanitizedDescription = description
      ? DOMPurify.sanitize(description)
      : description;

    return await updateSubscriptionService(validatedId, {
      ...rest,
      description: sanitizedDescription,
    });
  },
  [UserRole.ADMIN],
);

const archiveSubscription = authGuard(
  async (session: Session, id: number): Promise<ResponseDto<void>> => {
    const validatedData = idValidator.safeParse(id);

    if (!validatedData.success)
      return {
        data: null,
        error: {
          message: validatedData.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };

    return await archiveSubscriptionService(session, validatedData.data);
  },
  [UserRole.ADMIN],
);

const recoverSubscription = authGuard(
  async (session: Session, id: number): Promise<ResponseDto<void>> => {
    const validatedData = idValidator.safeParse(id);

    if (!validatedData.success)
      return {
        data: null,
        error: {
          message: validatedData.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };

    return await recoverSubscriptionService(validatedData.data);
  },
  [UserRole.ADMIN],
);

const archiveCategory = authGuard(
  async (session: Session, id: number): Promise<ResponseDto<void>> => {
    const validatedId = idValidator.safeParse(id);
    if (!validatedId.success)
      return {
        data: null,
        error: {
          message: validatedId.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };
    return await archiveCategoryService(session, validatedId.data);
  },
  [UserRole.ADMIN],
);

const recoverCategory = authGuard(
  async (
    session: Session,
    id: number,
  ): Promise<ResponseDto<SingleCategoryResponseDto>> => {
    const validatedId = idValidator.safeParse(id);
    if (!validatedId.success)
      return {
        data: null,
        error: {
          message: validatedId.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };
    return await recoverCategoryService(validatedId.data);
  },
  [UserRole.ADMIN],
);

const findAllOrders = authGuard(
  async (
    session: Session,
    input: RequestInput,
  ): Promise<
    ResponseDto<PaginatedResponseDto<SingleOrderWithInvoiceLinksResponseDto>>
  > => {
    const validatedQuery = requestValidator.safeParse(input);

    if (!validatedQuery.success) {
      return {
        data: null,
        error: {
          message: validatedQuery.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };
    }

    return await findAllOrderService(validatedQuery.data);
  },
  [UserRole.ADMIN],
);

const revokeOrder = authGuard(
  async (
    session: Session,
    id: number,
  ): Promise<ResponseDto<SingleOrderResponseDto>> => {
    const validatedData = idValidator.safeParse(id);

    if (!validatedData.success)
      return {
        data: null,
        error: {
          message: validatedData.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };

    return await revokeOrderService(validatedData.data);
  },
  [UserRole.ADMIN],
);

const refundOrder = authGuard(
  async (
    session: Session,
    id: number,
  ): Promise<ResponseDto<SingleOrderResponseDto>> => {
    const validatedData = idValidator.safeParse(id);

    if (!validatedData.success)
      return {
        data: null,
        error: {
          message: validatedData.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };

    return await refundOrderService(validatedData.data);
  },
  [UserRole.ADMIN],
);

const exportOrderReport = authGuard(
  async (
    session: Session,
    input: OrderReportRequestDto,
  ): Promise<ResponseDto<OrderReportResponseDto>> => {
    const validatedData = orderReportValidator.safeParse(input);

    if (!validatedData.success)
      return {
        data: null,
        error: {
          message: validatedData.error.message,
          reason: Reason.VALIDATION_ERROR,
        },
      };

    return await generateOrderReportService(validatedData.data);
  },
  [UserRole.ADMIN],
);

export {
  findAllUsers,
  updateUserByAdmin,
  findAllCategories,
  findAllCodes,
  createCode,
  deactivateCode,
  findCategoryById,
  createCategory,
  updateCategory,
  createDocument,
  createDocumentSignedUrl,
  removeDocument,
  findSubscriptionById,
  findAllSubscriptions,
  createSubscription,
  updateSubscription,
  archiveSubscription,
  recoverSubscription,
  archiveCategory,
  recoverCategory,
  findAllOrders,
  revokeOrder,
  refundOrder,
  exportOrderReport,
};

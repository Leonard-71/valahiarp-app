"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Session } from "next-auth";

import * as XLSX from "xlsx";

import {
  CURRENCY,
  CURRENCY_LABELS,
  DAY_IN_MS,
  PRODUCT_CURRENCY,
} from "@/constants";
import { LOCALE } from "@/constants/order/locale";
import { InvoiceStatus, Prisma } from "@/generated/prisma";
import { handleSubscriptionAvailability } from "@/lib/checkout-order-logic";
import { decimalToNumber } from "@/lib/decimal-to-number";
import { applyGenericFilters } from "@/lib/filters/filter-apply";
import {
  orderFilterSpec,
  orderStatusLabels,
} from "@/lib/filters/specs/order-filter-spec";
import prisma from "@/lib/prisma";
import { revalidateOrderPaths } from "@/lib/revalidate";
import { searchBuilder } from "@/lib/search-builder";
import { getStripe } from "@/lib/stripe";
import {
  OrderPayload,
  SingleOrderResponseDto,
  SingleOrderWithInvoiceLinksResponseDto,
} from "@/types/order";
import { OrderReportRequestDto } from "@/types/order/dto/order-report-request.dto";
import { OrderReportResponseDto } from "@/types/order/dto/order-report-response.dto";
import {
  PaginatedResponseDto,
  Reason,
  RequestInput,
  ResponseDto,
} from "@/types/utils";
import { validateFiltersDetailed } from "@/validation";

import { findById as findSubscriptionById } from "../subscription";
import { findById as findUserById, updateCustomerId } from "../user";

async function getBNRExchangeRate(): Promise<number> {
  try {
    const response = await fetch("https://curs.bnr.ro/nbrfxrates.xml");
    if (!response.ok) {
      throw new Error(`Failed to fetch BNR rates: ${response.statusText}`);
    }
    const xmlText = await response.text();

    const eurMatch = xmlText.match(/<Rate currency="EUR"[^>]*>([^<]+)<\/Rate>/);

    if (eurMatch && eurMatch[1]) {
      const rate = parseFloat(eurMatch[1]);
      console.log(`BNR EUR/RON exchange rate: ${rate}`);
      return rate;
    }

    throw new Error("Could not extract the exchange rate from the XML");
  } catch (error) {
    console.error("Error fetching BNR rate:", error);
    throw error;
  }
}

const transformOrderToDto = (order: OrderPayload): SingleOrderResponseDto => {
  return {
    ...order,
    invoice: {
      ...order.invoice,
      total: decimalToNumber(order.invoice.total),
      productsTotal: decimalToNumber(order.invoice.productsTotal),
    },
    subscription: {
      ...order.subscription,
      price: decimalToNumber(order.subscription.price),
    },
    user: {
      ...order.user,
      address: order.user.address
        ? {
            ...order.user.address,
            latitude: order.user.address.latitude
              ? decimalToNumber(order.user.address.latitude)
              : null,
            longitude: order.user.address.longitude
              ? decimalToNumber(order.user.address.longitude)
              : null,
          }
        : null,
    },
  };
};

const transformOrderWithInvoiceLinksToDto = async (
  order: OrderPayload,
): Promise<SingleOrderWithInvoiceLinksResponseDto> => {
  const stripe = getStripe();

  const invoice = await stripe.invoices.retrieve(order.invoice.stripeInvoiceId);

  const transformedOrder = transformOrderToDto(order);

  return {
    ...transformedOrder,
    invoice: {
      ...transformedOrder.invoice,
      hostedInvoiceUrl: invoice.hosted_invoice_url as string,
      invoicePdfUrl: invoice.invoice_pdf as string,
    },
  };
};

async function checkout(
  session: Session,
  subscriptionId: number,
): Promise<ResponseDto<null>> {
  const headersList = await headers();
  const origin = headersList.get("origin");

  const [
    { error: subscriptionError, data: subscription },
    { error: userError, data: user },
  ] = await Promise.all([
    findSubscriptionById(subscriptionId),
    findUserById(session.user.id!),
  ]);

  if (subscriptionError || userError) {
    return {
      data: null,
      error: {
        message: "Subscription or user not found",
        reason: Reason.NOT_FOUND_ERROR,
      },
    };
  }

  if (!user.addressId || !user.name) {
    return {
      data: null,
      error: {
        message: "User does not have all details",
        reason: Reason.NO_USER_DETAILS,
      },
    };
  }

  let exchangeRate;
  try {
    exchangeRate = await getBNRExchangeRate();
  } catch {
    return {
      data: null,
      error: {
        message: "Failed to retrieve currency exchange rate from BNR.",
        reason: Reason.CURRENCY_CONVERSION_FAILED,
      },
    };
  }

  const result = await handleSubscriptionAvailability(session, subscription);

  if (result.error) {
    return {
      data: null,
      error: result.error,
    };
  }

  let customer: string;

  const stripe = getStripe();

  if (user.stripeCustomerId) {
    customer = user.stripeCustomerId;
  } else {
    const customerObject = await stripe.customers.create({
      email: user.email,
      name: user.name ?? "",
      address: {
        line1: user.address?.street ?? "",
        city: user.address?.city ?? "",
        state: user.address?.county ?? "",
        country: user.address?.country ?? "",
        postal_code: user.address?.postalCode ?? "",
      },
      preferred_locales: [LOCALE],
      invoice_settings: {
        rendering_options: {
          template: process.env.TEMPLATE_INVOICE_ID,
        },
      },
      metadata: {
        userId: user.id,
      },
    });

    const updatedUser = await updateCustomerId(user.id, customerObject.id);

    if (updatedUser.error) {
      return updatedUser;
    }

    customer = customerObject.id;
  }

  const { startsAt, codeId } = result.meta;

  const paymentSession = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: CURRENCY,
          product_data: {
            name: subscription.name,
            description: `Plata se efectuează în RON la cursul BNR din ziua tranzacției (1 EUR = ${exchangeRate.toFixed(4)} RON).\nPreț: ${subscription.price} EUR / ${(subscription.price * exchangeRate).toFixed(2)} RON.`,
            images: subscription.documents
              .map((doc) => doc.url)
              .filter((url) => url !== null)
              .slice(0, 8),
          },
          unit_amount: Math.round(subscription.price * exchangeRate * 100),
        },
        quantity: 1,
      },
    ],
    locale: LOCALE,
    metadata: {
      userId: user.id,
      subscriptionId: subscription.id,
      startsAt: JSON.stringify(startsAt),
      codeId: JSON.stringify(codeId),
      productsTotal: subscription.price,
      productsCurrency: PRODUCT_CURRENCY,
    },
    customer,
    mode: "payment",
    success_url: `${origin}/checkout/success`,
    cancel_url: `${origin}/checkout/cancel`,
    invoice_creation: {
      enabled: true,
    },
  });

  if (!paymentSession.url) {
    return {
      data: null,
      error: {
        message: "Something went wrong!",
        reason: Reason.STRIPE_ERROR,
      },
    };
  }

  redirect(paymentSession.url);
}

const findOrderPresenceOnCategory = async (
  session: Session,
  categoryId: number,
): Promise<ResponseDto<SingleOrderResponseDto | null>> => {
  try {
    const order = await prisma.order.findFirst({
      where: {
        userId: session.user.id,
        subscription: {
          categoryId,
        },
        invoice: {
          status: InvoiceStatus.PAID,
        },
        OR: [
          {
            expiresAt: {
              gte: new Date(),
            },
          },
          {
            expiresAt: null,
          },
        ],
      },
      orderBy: {
        invoice: {
          issuedAt: "desc",
        },
      },
      include: {
        invoice: true,
        subscription: {
          include: {
            category: true,
          },
        },
        user: {
          include: {
            address: true,
          },
        },
      },
    });

    return {
      data: order ? transformOrderToDto(order) : null,
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

const findOrderPresenceOnSubscriptions = async (
  subscriptionIds: number[],
): Promise<ResponseDto<SingleOrderResponseDto[]>> => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        subscriptionId: {
          in: subscriptionIds,
        },
        invoice: {
          status: InvoiceStatus.PAID,
        },
        OR: [
          {
            expiresAt: {
              gte: new Date(),
            },
          },
          {
            expiresAt: null,
          },
        ],
      },
      orderBy: {
        invoice: {
          issuedAt: "desc",
        },
      },
      distinct: ["subscriptionId"],
      include: {
        invoice: true,
        subscription: {
          include: {
            category: true,
          },
        },
        user: {
          include: {
            address: true,
          },
        },
      },
    });

    return {
      data: orders.map(transformOrderToDto),
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

const findUserOrderPresenceOnSubscriptions = async (
  session: Session,
  subscriptionIds: number[],
): Promise<ResponseDto<SingleOrderResponseDto[]>> => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
        subscriptionId: {
          in: subscriptionIds,
        },
        invoice: {
          status: InvoiceStatus.PAID,
        },
        OR: [
          {
            expiresAt: {
              gte: new Date(),
            },
          },
          {
            expiresAt: null,
          },
        ],
      },
      orderBy: {
        invoice: {
          issuedAt: "desc",
        },
      },
      distinct: ["subscriptionId"],
      include: {
        invoice: true,
        subscription: {
          include: {
            category: true,
          },
        },
        user: {
          include: {
            address: true,
          },
        },
      },
    });

    return {
      data: orders.map(transformOrderToDto),
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

const findOrderPresenceOnSubscription = async (
  subscriptionId: number,
): Promise<ResponseDto<SingleOrderResponseDto | null>> => {
  try {
    const order = await prisma.order.findFirst({
      where: {
        subscriptionId,
        invoice: {
          status: InvoiceStatus.PAID,
        },
        OR: [
          {
            expiresAt: {
              gte: new Date(),
            },
          },
          {
            expiresAt: null,
          },
        ],
      },
      orderBy: {
        invoice: {
          issuedAt: "desc",
        },
      },
      include: {
        invoice: true,
        subscription: {
          include: {
            category: true,
          },
        },
        user: {
          include: {
            address: true,
          },
        },
      },
    });

    return {
      data: order ? transformOrderToDto(order) : null,
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

const findUserOrderPresenceOnSubscription = async (
  session: Session,
  subscriptionId: number,
): Promise<ResponseDto<SingleOrderResponseDto | null>> => {
  try {
    const order = await prisma.order.findFirst({
      where: {
        userId: session.user.id,
        subscriptionId,
        invoice: {
          status: InvoiceStatus.PAID,
        },
        OR: [
          {
            expiresAt: {
              gte: new Date(),
            },
          },
          {
            expiresAt: null,
          },
        ],
      },
      orderBy: {
        invoice: {
          issuedAt: "desc",
        },
      },
      include: {
        invoice: true,
        subscription: {
          include: {
            category: true,
          },
        },
        user: {
          include: {
            address: true,
          },
        },
      },
    });

    return {
      data: order ? transformOrderToDto(order) : null,
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

const findExpiring = async (): Promise<
  ResponseDto<SingleOrderResponseDto[]>
> => {
  try {
    const currentTime = new Date();
    const fourDaysFromNow = new Date(currentTime.getTime() + 4 * DAY_IN_MS);

    const orders = await prisma.order.findMany({
      where: {
        expiresAt: {
          gte: currentTime,
          lte: fourDaysFromNow,
        },
        expirationEmailSentAt: null,
        invoice: {
          status: InvoiceStatus.PAID,
        },
      },
      include: {
        invoice: true,
        subscription: {
          include: {
            category: true,
          },
        },
        user: {
          include: {
            address: true,
          },
        },
      },
    });

    return {
      data: orders.map(transformOrderToDto),
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

const markExpirationEmailSent = async (
  orderIds: number[],
): Promise<ResponseDto<number>> => {
  try {
    const result = await prisma.order.updateMany({
      where: {
        id: {
          in: orderIds,
        },
      },
      data: {
        expirationEmailSentAt: new Date(),
      },
    });

    revalidateOrderPaths();

    return {
      data: result.count,
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
): Promise<ResponseDto<SingleOrderResponseDto>> => {
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        invoice: true,
        subscription: {
          include: {
            category: true,
          },
        },
        user: {
          include: {
            address: true,
          },
        },
      },
    });

    if (!order) {
      return {
        data: null,
        error: {
          message: "Order not found",
          reason: Reason.NOT_FOUND_ERROR,
        },
      };
    }

    return {
      data: transformOrderToDto(order),
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

const refund = async (
  orderId: number,
): Promise<ResponseDto<SingleOrderResponseDto>> => {
  try {
    const order = await findById(orderId);
    if (order.error) {
      return order;
    }

    if (order.data.invoice.status !== InvoiceStatus.PAID) {
      return {
        data: null,
        error: {
          message: "Invoice is not paid",
          reason: Reason.VALIDATION_ERROR,
        },
      };
    }

    const stripe = getStripe();
    await stripe.refunds.create({
      payment_intent: order.data.invoice.stripePaymentIntentId,
    });

    await prisma.invoice.update({
      where: {
        stripePaymentIntentId: order.data.invoice.stripePaymentIntentId,
      },
      data: { status: InvoiceStatus.REFUNDED },
    });
    revalidateOrderPaths();

    return await findById(orderId);
  } catch (error) {
    return {
      data: null,
      error: {
        message:
          error instanceof Error ? error.message : "Stripe or database error",
        reason: Reason.DATABASE_ERROR,
      },
    };
  }
};

const revoke = async (
  id: number,
): Promise<ResponseDto<SingleOrderResponseDto>> => {
  try {
    const order = await findById(id);
    if (order.error) {
      return order;
    }

    if (order.data.invoice.status !== InvoiceStatus.PAID) {
      return {
        data: null,
        error: {
          message: "Invoice is not paid",
          reason: Reason.VALIDATION_ERROR,
        },
      };
    }

    await prisma.invoice.update({
      where: { id },
      data: { status: InvoiceStatus.REVOKED },
    });
    revalidateOrderPaths();

    return await findById(id);
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
  ResponseDto<PaginatedResponseDto<SingleOrderWithInvoiceLinksResponseDto>>
> => {
  try {
    const { pagination, search, filters } = input;
    const orderBy: Prisma.OrderOrderByWithRelationInput = {
      invoice: {
        issuedAt: "desc",
      },
    };

    let where: Prisma.OrderWhereInput = {};

    if (search) {
      where = searchBuilder<SingleOrderWithInvoiceLinksResponseDto>(search, [
        "user.name",
        "user.username",
        "user.email",
        "user.address.displayName",
        "subscription.name",
        "subscription.category.name",
      ]);
    }

    if (filters) {
      const { isValid, errors } = validateFiltersDetailed(
        filters,
        orderFilterSpec,
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

      const prismaFilters = applyGenericFilters(orderFilterSpec, filters);
      Object.assign(where, prismaFilters);
    }

    const { pageIndex, pageSize } = pagination;

    const [orders, totalCount] = await prisma.$transaction([
      prisma.order.findMany({
        where,
        skip: pageIndex * pageSize,
        take: pageSize,
        orderBy,
        include: {
          invoice: true,
          subscription: {
            include: {
              category: true,
            },
          },
          user: {
            include: {
              address: true,
            },
          },
        },
      }),
      prisma.order.count({ where }),
    ]);

    const hasMore = (pageIndex + 1) * pageSize < totalCount;

    return {
      data: {
        content: await Promise.all(
          orders.map((order) => transformOrderWithInvoiceLinksToDto(order)),
        ),
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

const generateOrderReport = async (
  input: OrderReportRequestDto,
): Promise<ResponseDto<OrderReportResponseDto>> => {
  try {
    const { startDate, endDate } = input;

    const orders = await prisma.order.findMany({
      where: {
        invoice: {
          issuedAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      },
      include: {
        invoice: true,
        subscription: {
          include: {
            category: true,
          },
        },
        user: {
          include: {
            address: true,
          },
        },
      },
      orderBy: {
        invoice: {
          issuedAt: "desc",
        },
      },
    });

    const transformedOrders: SingleOrderResponseDto[] = orders.map((order) =>
      transformOrderToDto(order),
    );

    const headers = [
      "ID Comandă",
      "Nume utilizator",
      "Username utilizator",
      "Email utilizator",
      "Nume abonament",
      "Nume categorie",
      "Adresă utilizator",
      "Total factură",
      "Moneda",
      "Prețul de bază",
      "Moneda prețului de bază",
      "Status factură",
      "Data achiziționare",
      "Data expirare",
    ];

    const data = transformedOrders.map((order) => [
      order.id,
      order.user.name || "",
      order.user.username || "",
      order.user.email || "",
      order.subscription.name || "",
      order.subscription.category?.name || "",
      order.user.address?.displayName || "",
      order.invoice.total,
      CURRENCY_LABELS[order.invoice.currency as keyof typeof CURRENCY_LABELS],
      order.invoice.productsTotal,
      CURRENCY_LABELS[
        order.invoice.productsCurrency as keyof typeof CURRENCY_LABELS
      ],
      orderStatusLabels[order.invoice.status],
      order.invoice.issuedAt
        ? new Date(order.invoice.issuedAt).toLocaleDateString("ro-RO")
        : "",
      order.expiresAt
        ? new Date(order.expiresAt).toLocaleDateString("ro-RO")
        : "",
    ]);

    const worksheetData = [headers, ...data];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    worksheet["!cols"] = [
      { wch: 15 }, // ID Comandă
      { wch: 20 }, // Nume utilizator
      { wch: 20 }, // Username utilizator
      { wch: 25 }, // Email utilizator
      { wch: 25 }, // Nume abonament
      { wch: 20 }, // Nume categorie
      { wch: 40 }, // Adresă utilizator
      { wch: 15 }, // Total factură
      { wch: 10 }, // Moneda
      { wch: 15 }, // Prețul de bază
      { wch: 10 }, // Moneda prețului de bază
      { wch: 15 }, // Status factură
      { wch: 18 }, // Data achiziționare
      { wch: 18 }, // Data expirare
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, "Raport Comenzi");

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    const base64Content = Buffer.from(buffer).toString("base64");

    const fileName = `raport-comenzi-${startDate.toISOString().split("T")[0]}-${endDate.toISOString().split("T")[0]}.xlsx`;

    return {
      error: null,
      data: {
        fileName,
        fileContent: base64Content,
        mimeType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
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
  checkout,
  findOrderPresenceOnCategory,
  findOrderPresenceOnSubscriptions,
  findUserOrderPresenceOnSubscriptions,
  findUserOrderPresenceOnSubscription,
  findOrderPresenceOnSubscription,
  findExpiring,
  markExpirationEmailSent,
  findAll,
  findById,
  refund,
  revoke,
  generateOrderReport,
};

import { Invoice, Prisma } from "@/generated/prisma";

export type OrderPayload = Prisma.OrderGetPayload<{
  include: {
    invoice: true;
    subscription: {
      include: {
        category: true;
      };
    };
    user: {
      include: {
        manualAddress: true;
      };
    };
  };
}>;

type SingleOrderResponseDto = Omit<
  OrderPayload,
  "invoice" | "subscription"
> & {
  invoice: Omit<Invoice, "total" | "productsTotal"> & {
    total: number;
    productsTotal: number;
  };
  subscription: Omit<OrderPayload["subscription"], "price"> & { price: number };
};

type SingleOrderWithInvoiceLinksResponseDto = SingleOrderResponseDto & {
  invoice: SingleOrderResponseDto["invoice"] & {
    hostedInvoiceUrl: string;
    invoicePdfUrl: string;
  };
};

export type { SingleOrderResponseDto, SingleOrderWithInvoiceLinksResponseDto };

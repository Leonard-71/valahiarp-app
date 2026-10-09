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
        address: true;
      };
    };
  };
}>;

type TransformedAddress = Omit<
  NonNullable<OrderPayload["user"]["address"]>,
  "latitude" | "longitude"
> & {
  latitude: number | null;
  longitude: number | null;
};

type SingleOrderResponseDto = Omit<
  OrderPayload,
  "invoice" | "subscription" | "user"
> & {
  invoice: Omit<Invoice, "total" | "productsTotal"> & {
    total: number;
    productsTotal: number;
  };
  subscription: Omit<OrderPayload["subscription"], "price"> & { price: number };
  user: Omit<OrderPayload["user"], "address"> & {
    address: TransformedAddress | null;
  };
};

type SingleOrderWithInvoiceLinksResponseDto = SingleOrderResponseDto & {
  invoice: SingleOrderResponseDto["invoice"] & {
    hostedInvoiceUrl: string;
    invoicePdfUrl: string;
  };
};

export type { SingleOrderResponseDto, SingleOrderWithInvoiceLinksResponseDto };

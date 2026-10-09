import { InvoiceStatus } from "@/generated/prisma";

type CreateInvoiceInput = {
  stripePaymentIntentId: string;
  stripeInvoiceId: string;
  total: number;
  currency: string;
  productsTotal: number;
  productsCurrency: string;
  issuedAt: Date;
  status: InvoiceStatus;
  order: {
    userId: string;
    subscriptionId: number;
    expiresAt?: Date;
  };
  codeId?: number;
};

export type { CreateInvoiceInput };

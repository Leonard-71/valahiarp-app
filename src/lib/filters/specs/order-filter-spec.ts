import { asyncSelectUsers } from "@/controller/select";
import { InvoiceStatus } from "@/generated/prisma";
import { SingleOrderResponseDto } from "@/types";

import { generateFilterSpec } from "../filter-spec-generator";
import { FilterType } from "../filter-types";

export const orderStatusLabels: Record<InvoiceStatus, string> = {
  [InvoiceStatus.PAID]: "Plătită",
  [InvoiceStatus.REFUNDED]: "Rambursată",
  [InvoiceStatus.REVOKED]: "Revocată",
};

const commonOrderFilterFields = [
  {
    field: "subscription.name",
    type: FilterType.TEXT,
    label: "Nume abonament",
  },
  {
    field: "subscription.category.name",
    type: FilterType.TEXT,
    label: "Nume categorie",
  },
  { field: "invoice.total", type: FilterType.NUMBER, label: "Total factura" },
  { field: "invoice.currency", type: FilterType.TEXT, label: "Moneda factura" },
  {
    field: "invoice.issuedAt",
    type: FilterType.DATE,
    label: "Data achizitionare",
  },
] as const;

const orderFilterSpec = generateFilterSpec<SingleOrderResponseDto>([
  {
    field: "userId",
    type: FilterType.MULTISELECT_STRING,
    label: "Utilizator",
    getData: asyncSelectUsers,
  },
  { field: "user.name", type: FilterType.TEXT, label: "Nume utilizator" },
  {
    field: "user.username",
    type: FilterType.TEXT,
    label: "Username utilizator",
  },
  { field: "user.email", type: FilterType.TEXT, label: "Email utilizator" },
  { field: "user.address.displayName", type: FilterType.TEXT, label: "Adresă" },
  {
    field: "invoice.status",
    type: FilterType.MULTISELECT_STRING,
    label: "Status factura",
    options: Object.entries(orderStatusLabels).map(([value, label]) => ({
      value,
      label,
    })),
  },
  ...commonOrderFilterFields,
]);

const userOrderFilterSpec = generateFilterSpec<SingleOrderResponseDto>([
  ...commonOrderFilterFields,
]);

export { orderFilterSpec, userOrderFilterSpec };

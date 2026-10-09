"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Download, FileText } from "lucide-react";

import { ActionItem, ActionsMenu } from "@/components/custom/actions-menu";
import { TableWrapper } from "@/components/custom/table";
import { CURRENCY_LABELS } from "@/constants";
import { findAllUserOrders } from "@/controller/order";
import {
  orderStatusLabels,
  userOrderFilterSpec,
} from "@/lib/filters/specs/order-filter-spec";
import { SingleOrderWithInvoiceLinksResponseDto } from "@/types";

export function UserOrdersTable() {
  const orderActions = (
    order: SingleOrderWithInvoiceLinksResponseDto,
  ): ActionItem[] => {
    return [
      {
        icon: <FileText className="h-4 w-4" />,
        label: "Vezi factura și chitanța",
        action: () => window.open(order.invoice.hostedInvoiceUrl, "_blank"),
      },
      {
        icon: <Download className="h-4 w-4" />,
        label: "Descarcă factura",
        action: () => window.open(order.invoice.invoicePdfUrl, "_blank"),
      },
    ];
  };

  const columns: ColumnDef<SingleOrderWithInvoiceLinksResponseDto>[] = [
    {
      accessorKey: "subscription.name",
      header: "Nume abonament",
    },
    {
      accessorKey: "subscription.category.name",
      header: "Nume categorie",
    },
    {
      accessorKey: "invoice.total",
      header: "Total factura",
      cell: ({ row }) => {
        const total = row.original.invoice.total;
        const currency = row.original.invoice.currency;
        return `${total} ${CURRENCY_LABELS[currency as keyof typeof CURRENCY_LABELS]}`;
      },
    },
    {
      accessorKey: "invoice.productsTotal",
      header: "Prețul de bază",
      cell: ({ row }) => {
        console.log(row.original);

        const total = row.original.invoice.productsTotal;
        const currency = row.original.invoice.productsCurrency;
        return `${total} ${CURRENCY_LABELS[currency as keyof typeof CURRENCY_LABELS]}`;
      },
    },
    {
      accessorKey: "invoice.status",
      header: "Status factura",
      cell: ({ row }) => {
        const status = row.original.invoice.status;
        return orderStatusLabels[status] ?? status;
      },
    },
    {
      accessorKey: "invoice.issuedAt",
      header: "Data achiziționare",
      cell: ({ row }) =>
        new Date(row.original.invoice.issuedAt).toLocaleDateString("ro-RO"),
    },
    {
      accessorKey: "expiresAt",
      header: "Expiră la",
      cell: ({ row }) => {
        const value = row.original.expiresAt;
        return value ? new Date(value).toLocaleDateString() : "-";
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acțiuni</div>,
      cell: ({ row }) => (
        <ActionsMenu
          className="ml-auto flex"
          actions={orderActions(row.original)}
        />
      ),
    },
  ];

  return (
    <TableWrapper<SingleOrderWithInvoiceLinksResponseDto>
      columns={columns}
      filterSpec={userOrderFilterSpec}
      getData={findAllUserOrders}
    />
  );
}

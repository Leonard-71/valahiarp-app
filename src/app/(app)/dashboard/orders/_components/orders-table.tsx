"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Ban, Banknote, Download, FileText } from "lucide-react";

import { ActionItem, ActionsMenu } from "@/components/custom/actions-menu";
import { TableWrapper } from "@/components/custom/table";
import { CURRENCY_LABELS } from "@/constants";
import { findAllOrders } from "@/controller/admin";
import { InvoiceStatus } from "@/generated/prisma";
import {
  orderFilterSpec,
  orderStatusLabels,
} from "@/lib/filters/specs/order-filter-spec";
import {
  SingleOrderResponseDto,
  SingleOrderWithInvoiceLinksResponseDto,
} from "@/types";

interface OrdersTableProps {
  onRefund: (order: SingleOrderResponseDto) => void;
  onRevoke: (order: SingleOrderResponseDto) => void;
  refreshCounter: number;
}

export function OrdersTable({
  onRefund,
  onRevoke,
  refreshCounter,
}: OrdersTableProps) {
  const orderActions = (
    order: SingleOrderWithInvoiceLinksResponseDto,
  ): ActionItem[] => {
    const actions: ActionItem[] = [
      {
        icon: <FileText className="h-4 w-4" />,
        label: "Vezi factura si chitanta",
        action: () => window.open(order.invoice.hostedInvoiceUrl, "_blank"),
      },
      {
        icon: <Download className="h-4 w-4" />,
        label: "Decarca factura",
        action: () => window.open(order.invoice.invoicePdfUrl, "_blank"),
      },
    ];

    if (order.invoice.status === InvoiceStatus.PAID) {
      actions.push(
        {
          icon: <Banknote className="h-4 w-4" />,
          label: "Rambursează",
          action: () => onRefund(order),
        },
        {
          icon: <Ban className="h-4 w-4" />,
          label: "Revocă",
          action: () => onRevoke(order),
        },
      );
    }

    return actions;
  };

  const columns: ColumnDef<SingleOrderWithInvoiceLinksResponseDto>[] = [
    {
      accessorKey: "user.name",
      header: "Nume utilizator",
    },
    {
      accessorKey: "user.username",
      header: "Username utilizator",
    },
    {
      accessorKey: "user.email",
      header: "Email utilizator",
    },
    {
      accessorKey: "subscription.name",
      header: "Nume abonament",
    },
    {
      accessorKey: "subscription.category.name",
      header: "Nume categorie",
    },
    {
      accessorKey: "user.address.displayName",
      header: "Adresă",
    },
    {
      accessorKey: "invoice.total",
      header: "Total factura",
    },
    {
      accessorKey: "invoice.currency",
      header: "Moneda factura",
      cell: ({ row }) => {
        const currency = row.original.invoice.currency;
        return CURRENCY_LABELS[currency as keyof typeof CURRENCY_LABELS];
      },
    },
    {
      accessorKey: "invoice.productsTotal",
      header: "Prețul de bază",
    },
    {
      accessorKey: "invoice.productsCurrency",
      header: "Moneda prețului de bază",
      cell: ({ row }) => {
        const currency = row.original.invoice.productsCurrency;
        return CURRENCY_LABELS[currency as keyof typeof CURRENCY_LABELS];
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
      header: "Data achizitionare",
      cell: ({ row }) =>
        new Date(row.original.invoice.issuedAt).toLocaleDateString(),
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
      filterSpec={orderFilterSpec}
      getData={findAllOrders}
      refreshTrigger={refreshCounter}
    />
  );
}

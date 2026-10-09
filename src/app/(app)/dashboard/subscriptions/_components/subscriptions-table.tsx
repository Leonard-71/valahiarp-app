"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArchiveIcon,
  ArchiveRestoreIcon,
  ImageIcon,
  PencilIcon,
} from "lucide-react";

import DOMPurify from "isomorphic-dompurify";

import { ActionItem, ActionsMenu } from "@/components/custom/actions-menu";
import { TableWrapper } from "@/components/custom/table";
import { CURRENCY_LABELS, PRODUCT_CURRENCY } from "@/constants/order/currency";
import { findAllSubscriptions } from "@/controller/admin";
import { EqualityOperators } from "@/lib/filters/filter-types";
import { subscriptionFilterSpecUi } from "@/lib/filters/specs/subscription-filter-spec-ui";
import { SingleSubscriptionResponseDto } from "@/types";

interface SubscriptionsTableProps {
  onEdit: (subscription: SingleSubscriptionResponseDto) => void;
  onEditImages: (subscription: SingleSubscriptionResponseDto) => void;
  onArchive: (subscription: SingleSubscriptionResponseDto) => void;
  onRecover: (subscription: SingleSubscriptionResponseDto) => void;
  refreshTrigger: number;
}

export function SubscriptionsTable({
  onEdit,
  onEditImages,
  onArchive,
  onRecover,
  refreshTrigger,
}: SubscriptionsTableProps) {
  const subscriptionActions = (
    subscription: SingleSubscriptionResponseDto,
  ): ActionItem[] => [
    {
      icon: <PencilIcon className="h-4 w-4" />,
      label: "Editează detalii",
      action: () => onEdit(subscription),
    },
    {
      icon: <ImageIcon className="h-4 w-4" />,
      label: "Editează imagini",
      action: () => onEditImages(subscription),
    },
    {
      icon: subscription.isArchived ? (
        <ArchiveRestoreIcon className="h-4 w-4" />
      ) : (
        <ArchiveIcon className="h-4 w-4" />
      ),
      label: subscription.isArchived ? "Recuperează" : "Arhivează",
      action: () =>
        subscription.isArchived
          ? onRecover(subscription)
          : onArchive(subscription),
    },
  ];

  const columns: ColumnDef<SingleSubscriptionResponseDto>[] = [
    {
      accessorKey: "name",
      header: "Nume",
    },
    {
      accessorKey: "servicePackage",
      header: "Pachet servicii",
      cell: ({ row }) => row.original.servicePackage || "—",
    },
    {
      accessorKey: "sortOrder",
      header: "Ordine",
    },
    {
      accessorKey: "description",
      header: "Descriere",
      maxSize: 250,
      cell: ({ row }) => {
        const sanitizedHtml = DOMPurify.sanitize(
          row.original.description || "",
        );
        return (
          <div
            className="line-clamp-1"
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          />
        );
      },
    },
    {
      accessorKey: "price",
      header: `Preț (${CURRENCY_LABELS[PRODUCT_CURRENCY]})`,
    },
    {
      accessorKey: "category.name",
      header: "Categorie",
    },
    {
      accessorKey: "isRecommended",
      header: "Recomandat",
      cell: ({ row }) => (row.original.isRecommended ? "Da" : "Nu"),
    },
    {
      accessorKey: "dependsOnParent.name",
      header: "Abonament de bază",
    },
    {
      accessorKey: "createdBy.name",
      header: "Creat de",
      cell: ({ row }) => {
        const createdBy = row.original.createdBy;
        return createdBy?.name || createdBy?.email || "-";
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acțiuni</div>,
      cell: ({ row }) => (
        <ActionsMenu
          className="ml-auto flex"
          actions={subscriptionActions(row.original)}
        />
      ),
    },
  ];

  return (
    <TableWrapper<SingleSubscriptionResponseDto>
      columns={columns}
      initialTableState={{
        filters: [
          {
            field: "isArchived",
            operator: EqualityOperators.EQUALS,
            value: false,
          },
          {
            field: "category.isArchived",
            operator: EqualityOperators.EQUALS,
            value: false,
          },
        ],
      }}
      filterSpec={subscriptionFilterSpecUi}
      getData={findAllSubscriptions}
      refreshTrigger={refreshTrigger}
    />
  );
}

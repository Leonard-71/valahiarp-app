"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArchiveIcon } from "lucide-react";

import { ActionItem, ActionsMenu } from "@/components/custom/actions-menu";
import { TableWrapper } from "@/components/custom/table";
import { findAllCodes } from "@/controller/admin";
import { EqualityOperators } from "@/lib/filters/filter-types";
import { codeFilterSpec } from "@/lib/filters/specs/code-filter-spec";
import { CodeWithRelationsDto } from "@/types/code";

interface CodesTableProps {
  onArchive: (code: CodeWithRelationsDto) => void;
  refreshTrigger: number;
}

export function CodesTable({ onArchive, refreshTrigger }: CodesTableProps) {
  const codeActions = (code: CodeWithRelationsDto): ActionItem[] => [
    {
      icon: <ArchiveIcon className="size-4" />,
      label: "Dezactivează cod",
      action: () => onArchive(code),
      disabled: code.isArchived,
    },
  ];

  const columns: ColumnDef<CodeWithRelationsDto>[] = [
    {
      accessorKey: "createdBy.email",
      header: "Creat de",
      cell: ({ row }) => row.original.createdBy?.email || "-",
    },
    {
      accessorKey: "user.email",
      header: "Email Utilizator",
      cell: ({ row }) => row.original.user?.email || "-",
    },
    {
      accessorKey: "subscription.name",
      header: "Nume Abonament",
      cell: ({ row }) => row.original.subscription?.name || "-",
    },

    {
      accessorKey: "expiresAt",
      header: "Expiră la",
      cell: ({ row }) => {
        const date = new Date(row.original.expiresAt);
        return date.toLocaleDateString("ro-RO", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acțiuni</div>,
      cell: ({ row }) => (
        <ActionsMenu
          className="ml-auto flex"
          actions={codeActions(row.original)}
        />
      ),
    },
  ];

  return (
    <TableWrapper<CodeWithRelationsDto>
      columns={columns}
      initialTableState={{
        filters: [
          {
            field: "isArchived",
            operator: EqualityOperators.EQUALS,
            value: false,
          },
        ],
      }}
      filterSpec={codeFilterSpec}
      getData={findAllCodes}
      refreshTrigger={refreshTrigger}
    />
  );
}

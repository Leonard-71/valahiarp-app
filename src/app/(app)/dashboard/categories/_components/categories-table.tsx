"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArchiveIcon, ArchiveRestoreIcon, PencilIcon } from "lucide-react";

import { ActionItem, ActionsMenu } from "@/components/custom/actions-menu";
import { TableWrapper } from "@/components/custom/table";
import { findAllCategories } from "@/controller/admin";
import { EqualityOperators } from "@/lib/filters/filter-types";
import { categoryFilterSpec } from "@/lib/filters/specs/category-filter-spec";
import { SingleCategoryResponseDto } from "@/types";

interface CategoriesTableProps {
  onEdit: (category: SingleCategoryResponseDto) => void;
  onArchive: (category: SingleCategoryResponseDto) => void;
  onRecover: (category: SingleCategoryResponseDto) => void;
  refreshTrigger: number;
}

export function CategoriesTable({
  onEdit,
  onArchive,
  onRecover,
  refreshTrigger,
}: CategoriesTableProps) {
  const categoryActions = (
    category: SingleCategoryResponseDto,
  ): ActionItem[] => [
    {
      icon: <PencilIcon className="h-4 w-4" />,
      label: "Editează detalii",
      action: () => onEdit(category),
      disabled: category.isArchived,
    },
    {
      icon: category.isArchived ? (
        <ArchiveRestoreIcon className="h-4 w-4" />
      ) : (
        <ArchiveIcon className="h-4 w-4" />
      ),
      label: category.isArchived ? "Recuperează" : "Arhivează",
      action: () =>
        category.isArchived ? onRecover(category) : onArchive(category),
    },
  ];

  const columns: ColumnDef<SingleCategoryResponseDto>[] = [
    {
      accessorKey: "name",
      header: "Nume categorie",
    },
    {
      accessorKey: "configuration.color",
      header: "Culoare",
      cell: ({ row }) => (
        <span
          className="rounded px-2 py-1 text-xs font-semibold"
          style={{
            background: row.original.configuration?.color || "#eee",
            color: row.original.configuration?.color ? "#fff" : "#000",
          }}
        >
          {row.original.configuration?.color || "-"}
        </span>
      ),
    },
    {
      accessorKey: "isMonthly",
      header: "Durată limitată (30 de zile)",
      cell: ({ row }) => (row.original.isMonthly ? "Da" : "Nu"),
    },
    {
      accessorKey: "isExclusiveToOwner",
      header: "Exclusiv utilizator",
      cell: ({ row }) => (row.original.isExclusiveToOwner ? "Da" : "Nu"),
    },
    {
      accessorKey: "limitOnePerCategory",
      header: "Unul per categorie",
      cell: ({ row }) => (row.original.limitOnePerCategory ? "Da" : "Nu"),
    },
    {
      accessorKey: "requiresCode",
      header: "Necesită cod",
      cell: ({ row }) => (row.original.requiresCode ? "Da" : "Nu"),
    },
    {
      accessorKey: "hasLeaflet",
      header: "Hartă",
      cell: ({ row }) => (row.original.hasLeaflet ? "Da" : "Nu"),
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
          actions={categoryActions(row.original)}
        />
      ),
    },
  ];

  return (
    <TableWrapper<SingleCategoryResponseDto>
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
      filterSpec={categoryFilterSpec}
      getData={findAllCategories}
      refreshTrigger={refreshTrigger}
    />
  );
}

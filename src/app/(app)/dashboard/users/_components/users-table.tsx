"use client";

import { useSession } from "next-auth/react";
import { ColumnDef } from "@tanstack/react-table";
import { PencilIcon, UserX } from "lucide-react";

import { ActionItem, ActionsMenu } from "@/components/custom/actions-menu";
import { TableWrapper } from "@/components/custom/table";
import { findAllUsers } from "@/controller/admin";
import { EqualityOperators } from "@/lib/filters/filter-types";
import { userFilterSpec } from "@/lib/filters/specs/user-filter-spec";
import { SingleUserResponseDto } from "@/types";

import { userRoleLabels } from "../_utils/edit-user-form.config";

interface UsersTableProps {
  onEdit: (user: SingleUserResponseDto) => void;
  onAnonymize: (user: SingleUserResponseDto) => void;
  refreshTrigger: number;
}

export function UsersTable({
  onEdit,
  onAnonymize,
  refreshTrigger,
}: UsersTableProps) {
  const { data: session } = useSession();

  const userActions = (user: SingleUserResponseDto): ActionItem[] => [
    {
      icon: <PencilIcon className="h-4 w-4" />,
      label: "Editează detalii",
      action: () => onEdit(user),
      disabled: session?.user.id === user.id,
    },
    {
      icon: <UserX className="h-4 w-4" />,
      label: "Anonimizează utilizator",
      action: () => onAnonymize(user),
      disabled: session?.user.id === user.id || user.isArchived,
    },
  ];

  const columns: ColumnDef<SingleUserResponseDto>[] = [
    {
      accessorKey: "name",
      header: "Nume",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "username",
      header: "Nume utilizator",
    },
    {
      accessorKey: "role",
      header: "Rol",
      cell: ({ row }) => {
        const role = row.original.role;

        return userRoleLabels[role] ?? role;
      },
    },
    {
      accessorKey: "isArchived",
      header: "Anonimizat",
      cell: ({ row }) => (row.original.isArchived ? "Da" : "Nu"),
    },
    {
      accessorKey: "address.displayName",
      header: "Adresă",
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acțiuni</div>,
      cell: ({ row }) => (
        <ActionsMenu
          className="ml-auto flex"
          actions={userActions(row.original)}
        />
      ),
    },
  ];

  return (
    <TableWrapper<SingleUserResponseDto>
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
      filterSpec={userFilterSpec}
      getData={findAllUsers}
      refreshTrigger={refreshTrigger}
    />
  );
}

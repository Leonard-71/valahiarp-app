import { UserRole } from "@/generated/prisma";
import { SingleUserResponseDto } from "@/types";

import { generateFilterSpec } from "../filter-spec-generator";
import { FilterType } from "../filter-types";

const userRoleLabels = {
  [UserRole.ADMIN]: "Admin",
  [UserRole.USER]: "Utilizator",
};

const userRoleOptions = Object.values(UserRole).map((role) => ({
  label: userRoleLabels[role],
  value: role,
}));

const userFilterSpec = generateFilterSpec<SingleUserResponseDto>([
  { field: "name", type: FilterType.TEXT, label: "Nume" },
  { field: "email", type: FilterType.TEXT, label: "Email" },
  {
    field: "role",
    type: FilterType.MULTISELECT_STRING,
    label: "Rol",
    options: userRoleOptions,
  },
  { field: "username", type: FilterType.TEXT, label: "Username" },
  {
    field: "isArchived",
    type: FilterType.BOOLEAN,
    label: "Anonimizat (Arhivat)",
  },
  { field: "address.displayName", type: FilterType.TEXT, label: "Adresă" },
]);

export { userFilterSpec };

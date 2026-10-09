import { object, string } from "zod";

import {
  createZodSchema,
  FieldType,
  FormFieldConfig,
} from "@/components/custom/form-builder";
import { asyncSelectAddresses } from "@/controller/select";
import { UserRole } from "@/generated/prisma";
import {
  updateUserByAdminValidator,
  updateUserValidator,
} from "@/validation/user/user.validator";

export const userRoleLabels: Record<UserRole, string> = {
  [UserRole.ADMIN]: "Admin",
  [UserRole.USER]: "Utilizator",
};

export const editUserFormConfig: FormFieldConfig[] = [
  {
    name: "name",
    label: "Nume",
    type: FieldType.Text,
    placeholder: "Introduceți numele",
    validation: updateUserValidator.shape.name,
  },
  {
    name: "email",
    label: "Email",
    type: FieldType.Text,
    placeholder: "Introduceți email-ul",
    validation: updateUserByAdminValidator.shape.email,
  },
  {
    name: "username",
    label: "Nume de utilizator",
    type: FieldType.Text,
    placeholder: "Introduceți numele de utilizator",
    validation: updateUserValidator.shape.username,
  },
  {
    name: "addressId",
    label: "Adresă",
    type: FieldType.AsyncSelect,
    placeholder: "Căutați o adresă",
    getData: asyncSelectAddresses,
    validation: object(
      {
        value: string({
          required_error: "Valoarea este obligatorie",
          invalid_type_error: "Valoarea este obligatorie",
        }),
        label: string({
          required_error: "Eticheta este obligatorie",
          invalid_type_error: "Eticheta este obligatorie",
        }),
      },
      {
        required_error: "Selectați o adresă",
        invalid_type_error: "Selectați o adresă",
      },
    ),
    minQueryLength: 3,
    debounceTimeout: 2000,
  },
  {
    name: "role",
    label: "Rol",
    type: FieldType.Select,
    placeholder: "Selectați rolul",
    options: Object.values(UserRole).map((role) => ({
      value: role,
      label: userRoleLabels[role],
    })),
    validation: updateUserByAdminValidator.shape.role,
  },
];

export const editUserFormSchema = createZodSchema(editUserFormConfig);

import {
  createZodSchema,
  FieldType,
  FormFieldConfig,
} from "@/components/custom/form-builder";
import { UserRole } from "@/generated/prisma";
import { updateUserByAdminValidator } from "@/validation/user/user.validator";

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
    validation: updateUserByAdminValidator.shape.name,
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
    validation: updateUserByAdminValidator.shape.username,
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

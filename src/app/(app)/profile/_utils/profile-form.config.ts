import { object, string } from "zod";

import {
  createZodSchema,
  FieldType,
  FormFieldConfig,
} from "@/components/custom/form-builder";
import { asyncSelectAddresses } from "@/controller/select";
import { updateUserValidator } from "@/validation/user/user.validator";

export const profileFormConfig: FormFieldConfig[] = [
  {
    name: "name",
    label: "Nume complet",
    type: FieldType.Text,
    placeholder: "Introduceți numele complet",
    validation: updateUserValidator.shape.name,
  },
  {
    name: "username",
    label: "Nickname",
    type: FieldType.Text,
    placeholder: "Introduceți nickname-ul",
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
];

export const profileFormSchema = createZodSchema(profileFormConfig);

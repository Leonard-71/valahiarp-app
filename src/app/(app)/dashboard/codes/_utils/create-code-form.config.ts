import { number, object, string } from "zod";

import {
  createZodSchema,
  FieldType,
  FormFieldConfig,
} from "@/components/custom/form-builder";
import {
  asyncSelectSubscriptions,
  asyncSelectUsers,
} from "@/controller/select";
import { EqualityOperators } from "@/lib/filters/filter-types";
import { RequestInput } from "@/types";
import { createCodeValidator } from "@/validation/code/code.validator";

const getActiveAndCodeRequiredSubscriptions = (input: RequestInput) => {
  const existingFilters = Array.isArray(input.filters) ? input.filters : [];

  const modifiedInput = {
    ...input,
    filters: [
      ...existingFilters,
      {
        field: "category.requiresCode",
        operator: EqualityOperators.EQUALS,
        value: true,
      },
    ],
  };
  return asyncSelectSubscriptions(modifiedInput);
};

export const createCodeFormConfig: FormFieldConfig[] = [
  {
    name: "userId",
    label: "Utilizator",
    type: FieldType.AsyncSelect,
    placeholder: "Căutați un utilizator",
    getData: asyncSelectUsers,
    validation: object({
      value: string({ required_error: "Valoarea este obligatorie", invalid_type_error: "Valoarea este obligatorie" }),
      label: string({ required_error: "Eticheta este obligatorie", invalid_type_error: "Eticheta este obligatorie" }),
    }, { required_error: "Selectați un utilizator", invalid_type_error: "Selectați un utilizator" }),
  },
  {
    name: "subscriptionId",
    label: "Abonament",
    type: FieldType.AsyncSelect,
    placeholder: "Căutați un abonament",
    getData: getActiveAndCodeRequiredSubscriptions,
    validation: object({
      value: number({ invalid_type_error: "Valoarea trebuie să fie un număr", required_error: "Valoarea trebuie să fie un număr" }),
      label: string({ required_error: "Eticheta este obligatorie", invalid_type_error: "Eticheta este obligatorie" }),
    }, { required_error: "Selectați un abonament", invalid_type_error: "Selectați un abonament" }),
  },
  {
    name: "activeFor",
    label: "Durată activă (zile)",
    type: FieldType.Number,
    placeholder: "Introduceți numărul de zile",
    validation: createCodeValidator.shape.activeFor,
  },
];

export const createCodeFormSchema = createZodSchema(createCodeFormConfig);

import { coerce } from "zod";

import {
  createZodSchema,
  FieldType,
  FormFieldConfig,
} from "@/components/custom/form-builder";

export const orderReportFormConfig: FormFieldConfig[] = [
  {
    name: "startDate",
    label: "Data de început",
    type: FieldType.DatePicker,
    placeholder: "Selectați data de început",
    validation: coerce.date({ invalid_type_error: "Data de început trebuie să fie validă" }),
    defaultValue: new Date(new Date().setDate(new Date().getDate() - 30)), // 30 days ago
  },
  {
    name: "endDate",
    label: "Data de sfârșit",
    type: FieldType.DatePicker,
    placeholder: "Selectați data de sfârșit",
    validation: coerce.date({ invalid_type_error: "Data de sfârșit trebuie să fie validă" }),
    defaultValue: new Date(), // Today
  },
];

export const orderReportFormSchema = createZodSchema(orderReportFormConfig);

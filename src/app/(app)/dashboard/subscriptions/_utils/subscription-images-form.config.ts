import type { FormFieldConfig } from "@/components/custom/form-builder";

import { createZodSchema, FieldType } from "@/components/custom/form-builder";

export const imageFormConfig: FormFieldConfig[] = [
  {
    name: "files",
    label: "Imagini",
    type: FieldType.File,
    placeholder: "Alege una sau mai multe imagini...",
    defaultValue: null,
    accept: "image/*",
    multiple: true,
  },
];

export const imageFormSchema = createZodSchema(imageFormConfig);

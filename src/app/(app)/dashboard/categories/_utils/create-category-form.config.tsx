import React from "react";

import { boolean } from "zod";

import { Warning } from "@/components/custom";
import {
  createZodSchema,
  FieldType,
  FormFieldConfig,
} from "@/components/custom/form-builder";
import { getIconComponent, iconTagLabels } from "@/constants/icon-mapping";
import { IconTag } from "@/generated/prisma";
import { createCategoryObjectValidator } from "@/validation/category/category.validator";

export const createCategoryFormConfig: FormFieldConfig[] = [
  {
    name: "name",
    label: "Nume categorie",
    type: FieldType.Text,
    placeholder: "Introdu numele categoriei",
    validation: createCategoryObjectValidator.shape.name,
    defaultValue: undefined,
  },
  {
    name: "isMonthly",
    label: "Abonament cu durată limitată (30 zile)",
    type: FieldType.Checkbox,
    description: (
      <Warning message="Această proprietate nu poate fi modificată după crearea categoriei! Un abonament va fi vândut pe 30 de zile, după care va expira automat." />
    ),
    validation: createCategoryObjectValidator.shape.isMonthly,
    defaultValue: false,
  },
  {
    name: "isExclusiveToOwner",
    label: "Exclusivitate pentru proprietar",
    type: FieldType.Checkbox,
    description:
      "Acest abonament este exclusiv doar celui care l-a cumpărat. Nimeni altcineva nu îl poate cumpăra până nu expiră (dacă opțiunea 'Abonament cu durată limitată' este activată) sau pe o perioadă nedeterminată de timp (dacă nu este activată).",
    validation: createCategoryObjectValidator.shape.isExclusiveToOwner,
    defaultValue: false,
  },
  {
    name: "limitOnePerCategory",
    label: "Limită de un abonament per utilizator",
    type: FieldType.Checkbox,
    description:
      "Un utilizator poate cumpăra un singur abonament din această categorie, pe 30 de zile (dacă opțiunea 'Abonament cu durată limitată' este activată) sau pe o perioadă nedeterminată de timp (dacă nu este activată).",
    validation: createCategoryObjectValidator.shape.limitOnePerCategory,
    defaultValue: false,
  },
  {
    name: "requiresCode",
    label: "Necesită cod de activare",
    type: FieldType.Checkbox,
    description:
      "Este nevoie ca un administrator să genereze un cod special pentru un utilizator și această subscripție pentru ca acesta să o poată cumpăra.",
    validation: createCategoryObjectValidator.shape.requiresCode,
    defaultValue: false,
  },
  {
    name: "hasLeaflet",
    label: "Afișare pe hartă",
    type: FieldType.Checkbox,
    description:
      "Abonamentele din această categorie vor avea marcaje pe hartă. Trebuie să setați culoarea și iconița pentru acestea mai jos.",
    validation: createCategoryObjectValidator.shape.hasLeaflet,
    defaultValue: false,
  },
  {
    name: "color",
    label: "Culoare (hex)",
    type: FieldType.ColorPicker,
    validation:
      createCategoryObjectValidator.shape.configuration.unwrap().shape.color,
    dependsOn: [
      {
        name: "hasLeaflet",
        validator: boolean().refine((val) => val === true),
      },
    ],
    defaultValue: "#000000",
  },
  {
    name: "icon",
    label: "Iconiță",
    placeholder: "Alege o iconiță",
    type: FieldType.Select,
    options: Object.values(IconTag).map((icon) => {
      const IconComponent = getIconComponent(icon);
      return {
        label: iconTagLabels[icon],
        value: icon,
        icon: <IconComponent className="size-4" />,
      };
    }),
    validation:
      createCategoryObjectValidator.shape.configuration.unwrap().shape.icon,
    defaultValue: undefined,
    dependsOn: [
      {
        name: "hasLeaflet",
        validator: boolean().refine((val) => val === true),
      },
    ],
  },
];

export const createCategoryFormSchema = createZodSchema(
  createCategoryFormConfig,
);

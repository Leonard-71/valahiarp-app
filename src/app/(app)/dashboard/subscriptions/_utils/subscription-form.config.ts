import { number, object, string } from "zod";

import {
  createZodSchema,
  FieldType,
  FormFieldConfig,
} from "@/components/custom/form-builder";
import { CURRENCY_LABELS, PRODUCT_CURRENCY } from "@/constants/order/currency";
import { LEAFLET_DEFAULT_CENTER } from "@/constants/subscription/leaflet";
import {
  asyncSelectCategories,
  asyncSelectSubscriptions,
} from "@/controller/select";
import { IconTag } from "@/generated/prisma";
import { ListOperators } from "@/lib/filters/filter-types";
import { transformIconName } from "@/lib/icon-utils";
import { selectedCategoryValidator } from "@/validation/category/category.validator";
import { updateSubscriptionValidator } from "@/validation/subscription/subscription.validator";

const getMarkerPropsFromCategory = (category: {
  value: number;
  label: string;
  meta: { configuration: { icon: IconTag; color: string } | null };
}) => {
  if (!category || !category.meta.configuration) {
    return {};
  }

  const icon = category.meta.configuration.icon;
  const formattedIcon = icon ? transformIconName(icon) : undefined;

  return {
    icon: formattedIcon,
    color: category.meta.configuration.color,
  };
};

const getSubscriptionFilter = (category: { value: number; label: string }) => {
  if (!category) {
    return {};
  }

  return {
    filters: [
      {
        field: "category.id",
        operator: ListOperators.IN_LIST,
        value: [category.value],
      },
    ],
  };
};

export const subscriptionFormConfig: FormFieldConfig[] = [
  {
    name: "name",
    label: "Nume",
    type: FieldType.Text,
    placeholder: "Introduceți numele",
    validation: updateSubscriptionValidator.shape.name,
    defaultValue: undefined,
  },
  {
    name: "description",
    label: "Descriere",
    type: FieldType.RichTextEditor,
    placeholder: "Introduceți descrierea",
    validation: updateSubscriptionValidator.shape.description,
    defaultValue: undefined,
  },
  {
    name: "price",
    label: `Preț (${CURRENCY_LABELS[PRODUCT_CURRENCY]})`,
    type: FieldType.Number,
    placeholder: "Introduceți prețul",
    validation: updateSubscriptionValidator.shape.price,
    defaultValue: undefined,
  },
  {
    name: "categoryId",
    label: "Categorie",
    type: FieldType.AsyncSelect,
    placeholder: "Selectați categoria",
    getData: asyncSelectCategories,
    validation: object({
      value: number({ invalid_type_error: "Valoarea trebuie să fie un număr", required_error: "Valoarea trebuie să fie un număr" }),
      label: string({ required_error: "Eticheta este obligatorie", invalid_type_error: "Eticheta este obligatorie" }),
      meta: selectedCategoryValidator,
    }, { required_error: "Selectați o categorie", invalid_type_error: "Selectați o categorie" }),
    defaultValue: null,
  },
  {
    name: "location",
    label: "Locație",
    type: FieldType.Leaflet,
    placeholder: "Selectați locația",
    dependsOn: [
      {
        name: "categoryId",
        validator: object({
          value: number(),
          label: string(),
          meta: selectedCategoryValidator.refine((data) => data.hasLeaflet),
        }),
      },
    ],
    validation: object({
      xCoordinate: number({ invalid_type_error: "Coordonata X trebuie să fie un număr valid", required_error: "Coordonata X trebuie să fie un număr valid" }),
      yCoordinate: number({ invalid_type_error: "Coordonata Y trebuie să fie un număr valid", required_error: "Coordonata Y trebuie să fie un număr valid" }),
    }, { required_error: "Locația este obligatorie", invalid_type_error: "Locația este obligatorie" }),
    receivesPropsFrom: [
      {
        name: "categoryId",
        getProps: getMarkerPropsFromCategory,
      },
    ],
    defaultValue: LEAFLET_DEFAULT_CENTER,
  },
  {
    name: "dependsOnParentId",
    label: "Depinde de abonamentul",
    type: FieldType.AsyncSelect,
    placeholder: "Selectați abonamentul de bază",
    description:
      "Dacă selectați o valoare, acest abonament va putea fi cumpărat doar după ce a fost achiziționat abonamentul pe care îl selectați aici.",
    getData: asyncSelectSubscriptions,
    dependsOn: [{ name: "categoryId" }],
    receivesPropsFrom: [
      {
        name: "categoryId",
        getProps: getSubscriptionFilter,
      },
    ],
    validation: object({
      value: number({ invalid_type_error: "Valoarea trebuie să fie un număr", required_error: "Valoarea trebuie să fie un număr" }),
      label: string({ required_error: "Eticheta este obligatorie", invalid_type_error: "Eticheta este obligatorie" }),
    })
      .nullable()
      .optional(),
    defaultValue: null,
  },
  {
    name: "isRecommended",
    label: "Recomandat",
    type: FieldType.Checkbox,
    placeholder: "Selectați dacă este recomandat",
    validation: updateSubscriptionValidator.shape.isRecommended,
    defaultValue: false,
  },
];

export const subscriptionFormSchema = createZodSchema(subscriptionFormConfig);

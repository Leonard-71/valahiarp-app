import { 
  createZodSchema,
  FieldType,
  FormFieldConfig,
} from "@/components/custom/form-builder";
import { createHouseValidator } from "@/validation/house";
import { SingleHouseResponseDto } from "@/types";

export const housesFormConfig: FormFieldConfig[] = [
  {
    name: "name",
    label: "Nume",
    type: FieldType.Text,
    placeholder: "Introdu numele casei",
    validation: createHouseValidator.shape.name,
    defaultValue: "",
  },
  {
    name: "inventory",
    label: "Inventar",
    type: FieldType.Number,
    placeholder: "Introdu inventarul",
    validation: createHouseValidator.shape.inventory,
    defaultValue: 0,
  },
  {
    name: "taxPrice",
    label: "Preț Impozit (%)",
    type: FieldType.Number,
    placeholder: "Introdu prețul impozitului",
    validation: createHouseValidator.shape.taxPrice,
    defaultValue: 0,
  },
  {
    name: "price",
    label: "Preț ($)",
    type: FieldType.Number,
    placeholder: "Introdu prețul casei",
    validation: createHouseValidator.shape.price,
    defaultValue: 0,
  },
  {
    name: "sortOrder",
    label: "Ordinea de Sortare",
    type: FieldType.Number,
    placeholder: "Introdu ordinea de sortare",
    validation: createHouseValidator.shape.sortOrder,
    defaultValue: 0,
  },
  {
    name: "isOccupied",
    label: "Ocupată",
    type: FieldType.Checkbox,
    description: "Marchează dacă casa este ocupată",
    validation: createHouseValidator.shape.isOccupied,
    defaultValue: false,
  },
];

export const housesFormSchema = createZodSchema(housesFormConfig);

// Helper function to get default values from config
export const getHousesFormDefaults = (house?: SingleHouseResponseDto | null) => {
  const configWithDefaults = house
    ? housesFormConfig.map((field) => {
        const houseKey = field.name as keyof SingleHouseResponseDto;
        const defaultValue = house[houseKey] ?? field.defaultValue;
        return { ...field, defaultValue };
      })
    : housesFormConfig;

  // Extract default values into an object
  return configWithDefaults.reduce((acc, field) => {
    acc[field.name] = field.defaultValue;
    return acc;
  }, {} as Record<string, any>);
};

import { boolean, coerce, object, string } from "zod";

const baseHouseFields = {
  name: string({ required_error: "Numele casei este obligatoriu" })
    .min(3, "Numele casei trebuie să conțină cel puțin 3 caractere")
    .max(50, "Numele casei nu poate depăși 50 de caractere"),
  inventory: coerce
    .number({ 
      required_error: "Inventarul este obligatoriu",
      invalid_type_error: "Inventarul trebuie să fie un număr valid" 
    })
    .min(0, "Inventarul nu poate fi negativ"),
  taxPrice: coerce
    .number({ 
      required_error: "Prețul impozitului este obligatoriu",
      invalid_type_error: "Prețul impozitului trebuie să fie un număr valid" 
    })
    .min(0, "Prețul impozitului nu poate fi negativ"),
  price: coerce
    .number({ 
      required_error: "Prețul este obligatoriu",
      invalid_type_error: "Prețul trebuie să fie un număr valid" 
    })
    .min(0, "Prețul nu poate fi negativ"),
  sortOrder: coerce
    .number({ 
      required_error: "Ordinea de sortare este obligatorie",
      invalid_type_error: "Ordinea de sortare trebuie să fie un număr valid" 
    })
    .min(0, "Ordinea de sortare nu poate fi negativă"),
  isOccupied: boolean().default(false),
};

const createHouseValidator = object(baseHouseFields);

const updateHouseFields = {
  name: string({ required_error: "Numele casei este obligatoriu" })
    .min(3, "Numele casei trebuie să conțină cel puțin 3 caractere")
    .max(50, "Numele casei nu poate depăși 50 de caractere")
    .optional(),
  inventory: coerce
    .number({ 
      invalid_type_error: "Inventarul trebuie să fie un număr valid" 
    })
    .min(0, "Inventarul nu poate fi negativ")
    .optional(),
  taxPrice: coerce
    .number({ 
      invalid_type_error: "Prețul impozitului trebuie să fie un număr valid" 
    })
    .min(0, "Prețul impozitului nu poate fi negativ")
    .optional(),
  price: coerce
    .number({ 
      invalid_type_error: "Prețul trebuie să fie un număr valid" 
    })
    .min(0, "Prețul nu poate fi negativ")
    .optional(),
  sortOrder: coerce
    .number({ 
      invalid_type_error: "Ordinea de sortare trebuie să fie un număr valid" 
    })
    .min(0, "Ordinea de sortare nu poate fi negativă")
    .optional(),
  isOccupied: boolean().optional(),
};

const updateHouseValidator = object(updateHouseFields);

export { createHouseValidator, updateHouseValidator };

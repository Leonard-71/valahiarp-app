import { boolean, coerce, number, object, string } from "zod";

import { idValidator, paginationValidator } from "@/validation";

const baseLocationFields = {
  xCoordinate: number({ invalid_type_error: "Coordonata X trebuie să fie un număr valid" }),
  yCoordinate: number({ invalid_type_error: "Coordonata Y trebuie să fie un număr valid" }),
};

const baseSubscriptionFields = {
  name: string().min(3, "Numele abonamentului trebuie să conțină cel puțin 3 caractere").max(50, "Numele abonamentului nu poate depăși 50 de caractere"),
  servicePackage: string({ required_error: "Pachetul de servicii este obligatoriu" })
    .trim()
    .min(3, "Pachetul de servicii trebuie să conțină cel puțin 3 caractere")
    .max(100, "Pachetul de servicii nu poate depăși 100 de caractere"),
  description: string().optional(),
  price: coerce.number({ invalid_type_error: "Prețul trebuie să fie un număr valid" }),
  categoryId: idValidator,
  isRecommended: boolean({ errorMap: () => ({ message: "Selectați dacă abonamentul este recomandat" }) }),
  dependsOnParentId: idValidator.optional(),
};

const createSubscriptionValidator = object({
  ...baseSubscriptionFields,
  location: object(baseLocationFields).optional(),
});

const updateSubscriptionValidator = object({
  ...baseSubscriptionFields,
  location: object({
    ...baseLocationFields,
  }).optional(),
  id: idValidator,
});

const subscriptionOnCategoryValidator = object({
  pagination: paginationValidator,
  categoryId: idValidator,
});

export {
  createSubscriptionValidator,
  updateSubscriptionValidator,
  subscriptionOnCategoryValidator,
};

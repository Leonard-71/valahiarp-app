import { boolean, nativeEnum, object, string } from "zod";

import { IconTag } from "@/generated/prisma";

import { idValidator } from "../utils/id.validator";

const baseConfigurationFields = {
  color: string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Culoarea trebuie să fie în format hex valid (ex: #FF0000)")
    .min(4, "Culoarea trebuie să aibă cel puțin 4 caractere")
    .max(7, "Culoarea nu poate avea mai mult de 7 caractere"),
  icon: nativeEnum(IconTag, { errorMap: () => ({ message: "Selectați o iconiță validă" }) }),
};

const baseCategoryFields = {
  name: string().min(3, "Numele categoriei trebuie să conțină cel puțin 3 caractere").max(50, "Numele categoriei nu poate depăși 50 de caractere"),
  isExclusiveToOwner: boolean({ errorMap: () => ({ message: "Selectați dacă categoria este exclusivă pentru proprietar" }) }),
  limitOnePerCategory: boolean({ errorMap: () => ({ message: "Selectați dacă există limită de un abonament per utilizator" }) }),
  requiresCode: boolean({ errorMap: () => ({ message: "Selectați dacă categoria necesită cod de activare" }) }),
  hasLeaflet: boolean({ errorMap: () => ({ message: "Selectați dacă categoria se afișează pe hartă" }) }),
};

const createCategoryFields = {
  ...baseCategoryFields,
  isMonthly: boolean({ errorMap: () => ({ message: "Selectați dacă abonamentul are durată limitată" }) }),
  configuration: object(baseConfigurationFields).optional(),
};

const updateCategoryFields = {
  ...baseCategoryFields,
  configuration: object({
    ...baseConfigurationFields,
  }).optional(),
  id: idValidator,
};

const createCategoryObjectValidator = object(createCategoryFields);

const createCategoryValidator = createCategoryObjectValidator.refine(
  (data) => !!data.hasLeaflet === !!data.configuration,
  {
    message: "Configurația este obligatorie când categoria se afișează pe hartă",
    path: ["configuration"],
  },
);

const updateCategoryValidator = object(updateCategoryFields).refine(
  (data) => !!data.hasLeaflet === !!data.configuration,
  {
    message: "Configurația este obligatorie când categoria se afișează pe hartă",
    path: ["configuration"],
  },
);

const selectedCategoryValidator = object({
  ...baseCategoryFields,
  id: idValidator,
  isMonthly: boolean({ errorMap: () => ({ message: "Selectați dacă abonamentul are durată limitată" }) }),
  configuration: object({
    ...baseConfigurationFields,
  }).nullable(),
});

export {
  createCategoryValidator,
  updateCategoryValidator,
  createCategoryObjectValidator,
  selectedCategoryValidator,
};

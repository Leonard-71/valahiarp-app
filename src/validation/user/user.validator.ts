import { enum as zodEnum, literal, nativeEnum, object, string } from "zod";

import { ROMANIA, ROMANIAN_COUNTIES } from "@/constants/address/romania";
import { UserRole } from "@/generated/prisma";

const updateUserValidator = object({
  id: string().uuid("ID-ul utilizatorului trebuie să fie un UUID valid"),
  name: string({ required_error: "Numele și prenumele sunt obligatorii" })
    .trim()
    .min(2, "Numele trebuie să conțină cel puțin 2 caractere")
    .max(100, "Numele nu poate depăși 100 de caractere"),
  phone: string({ required_error: "Telefonul este obligatoriu" })
    .trim()
    .min(10, "Telefonul trebuie să conțină cel puțin 10 caractere")
    .max(20, "Telefonul nu poate depăși 20 de caractere")
    .regex(/^[0-9+\s()-]+$/, "Telefonul conține caractere nepermise"),
  email: string({ required_error: "Emailul este obligatoriu" })
    .trim()
    .email("Adresa de email nu este validă"),
  country: literal(ROMANIA, {
    errorMap: () => ({ message: "Selectează țara" }),
  }),
  county: zodEnum(ROMANIAN_COUNTIES, {
    errorMap: () => ({ message: "Selectează județul" }),
  }),
  locality: string({ required_error: "Localitatea este obligatorie" })
    .trim()
    .min(2, "Localitatea trebuie să conțină cel puțin 2 caractere")
    .max(100, "Localitatea nu poate depăși 100 de caractere"),
  street: string()
    .trim()
    .max(200, "Adresa nu poate depăși 200 de caractere")
    .optional()
    .or(literal("")),
});

const updateUserByAdminValidator = object({
  id: string().uuid("ID-ul utilizatorului trebuie să fie un UUID valid"),
  email: string().email("Adresa de email nu este validă"),
  name: string({ required_error: "Numele este obligatoriu" })
    .min(2, "Numele trebuie să conțină cel puțin 2 caractere")
    .max(100, "Numele nu poate depăși 100 de caractere"),
  username: string({ required_error: "Numele de utilizator este obligatoriu" })
    .min(3, "Numele de utilizator trebuie să conțină cel puțin 3 caractere")
    .max(50, "Numele de utilizator nu poate depăși 50 de caractere"),
  role: nativeEnum(UserRole, {
    errorMap: () => ({ message: "Selectați un rol valid" }),
  }),
});

export { updateUserValidator, updateUserByAdminValidator };

import { nativeEnum, object, string } from "zod";

import { UserRole } from "@/generated/prisma";

const updateUserValidator = object({
  id: string().uuid("ID-ul utilizatorului trebuie să fie un UUID valid"),
  name: string({ required_error: "Numele este obligatoriu" })
    .min(2, "Numele trebuie să conțină cel puțin 2 caractere")
    .max(100, "Numele nu poate depăși 100 de caractere"),
  addressId: string({ required_error: "Adresa este obligatorie" }),
  username: string({ required_error: "Numele de utilizator este obligatoriu" })
    .min(3, "Numele de utilizator trebuie să conțină cel puțin 3 caractere")
    .max(50, "Numele de utilizator nu poate depăși 50 de caractere"),
});

const updateUserByAdminValidator = object({
  id: string().uuid("ID-ul utilizatorului trebuie să fie un UUID valid"),
  email: string().email("Adresa de email nu este validă"),
  name: string({ required_error: "Numele este obligatoriu" })
    .min(2, "Numele trebuie să conțină cel puțin 2 caractere")
    .max(100, "Numele nu poate depăși 100 de caractere"),
  addressId: string({ required_error: "Adresa este obligatorie" }),
  username: string({ required_error: "Numele de utilizator este obligatoriu" })
    .min(3, "Numele de utilizator trebuie să conțină cel puțin 3 caractere")
    .max(50, "Numele de utilizator nu poate depăși 50 de caractere"),
  role: nativeEnum(UserRole, {
    errorMap: () => ({ message: "Selectați un rol valid" }),
  }),
});

export { updateUserValidator, updateUserByAdminValidator };

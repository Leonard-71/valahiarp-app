import { string } from "zod";

const addressQueryValidator = string().min(
  3,
  "Adresa trebuie să conțină cel puțin 3 caractere",
);

export { addressQueryValidator };

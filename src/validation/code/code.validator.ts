import { coerce, number, object, string } from "zod";

const createCodeValidator = object({
  userId: string().uuid("ID-ul utilizatorului trebuie să fie un UUID valid"),
  subscriptionId: number().int("ID-ul abonamentului trebuie să fie un număr întreg").positive("ID-ul abonamentului trebuie să fie pozitiv"),
  activeFor: coerce.number({ invalid_type_error: "Durata trebuie să fie un număr întreg" }).int("Durata trebuie să fie un număr întreg").positive("Durata trebuie să fie pozitivă"),
});

export { createCodeValidator };

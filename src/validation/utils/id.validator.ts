import { number } from "zod";

const idValidator = number().int("ID-ul trebuie să fie un număr întreg").nonnegative("ID-ul trebuie să fie pozitiv sau zero");

export { idValidator };

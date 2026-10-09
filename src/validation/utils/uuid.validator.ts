import { string } from "zod";

const uuidValidator = string().uuid("Valoarea trebuie să fie un UUID valid");

export { uuidValidator };

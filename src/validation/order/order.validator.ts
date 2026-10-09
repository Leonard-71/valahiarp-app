import { coerce, object } from "zod";

const orderReportValidator = object({
  startDate: coerce.date(),
  endDate: coerce.date(),
}).refine(
  (data) => data.startDate <= data.endDate,
  {
    message: "Data de început trebuie să fie înainte sau egală cu data de sfârșit",
    path: ["endDate"],
  }
);

export { orderReportValidator };

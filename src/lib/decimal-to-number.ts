import { Prisma } from "@/generated/prisma";

const decimalToNumber = (decimal: Prisma.Decimal): number => {
  return decimal.toNumber();
};

export { decimalToNumber };

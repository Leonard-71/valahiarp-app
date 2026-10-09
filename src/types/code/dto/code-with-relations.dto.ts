import { Prisma } from "@/generated/prisma";

type CodeWithRelationsPayload = Prisma.CodeGetPayload<{
  include: { createdBy: true; user: true; subscription: true };
}>;

type CodeWithRelationsDto = Omit<CodeWithRelationsPayload, "subscription"> & {
  subscription:
    | (Omit<NonNullable<CodeWithRelationsPayload["subscription"]>, "price"> & {
        price: number;
      })
    | null;
};

export type { CodeWithRelationsDto };

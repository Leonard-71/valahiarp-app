import { Prisma } from "@/generated/prisma";

type UserWithRelationsDto = Prisma.UserGetPayload<{
  include: { manualAddress: true; codes: true };
}>;

export type { UserWithRelationsDto };

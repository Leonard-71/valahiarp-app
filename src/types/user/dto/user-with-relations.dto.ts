import { Prisma } from "@/generated/prisma";

type UserWithRelationsDto = Prisma.UserGetPayload<{
  include: { address: true; codes: true };
}>;

export type { UserWithRelationsDto };

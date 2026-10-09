import { Prisma } from "@/generated/prisma";

type SingleCategoryResponseDto = Prisma.CategoryGetPayload<{
  include: { 
    configuration: true;
    createdBy: true;
  };
}>;

export type { SingleCategoryResponseDto };

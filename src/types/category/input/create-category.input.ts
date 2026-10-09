import { IconTag } from "@/generated/prisma";

type CreateCategoryInput = {
  name: string;
  isMonthly: boolean;
  isExclusiveToOwner: boolean;
  limitOnePerCategory: boolean;
  requiresCode: boolean;
  hasLeaflet: boolean;
  configuration?: {
    color: string;
    icon: IconTag;
  };
};

export type { CreateCategoryInput };

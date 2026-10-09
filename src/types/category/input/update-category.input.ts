import { IconTag } from "@/generated/prisma";

type UpdateCategoryInput = {
  name: string;
  isExclusiveToOwner: boolean;
  limitOnePerCategory: boolean;
  requiresCode: boolean;
  hasLeaflet: boolean;
  configuration?: {
    color: string;
    icon: IconTag;
  };
};

export type { UpdateCategoryInput };

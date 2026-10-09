import { Reason } from "@/types/utils";

type RestrictionDto = {
  meta: {
    startsAt?: Date;
    codeId?: number;
  };
  error?: {
    message: string;
    reason: Reason;
  };
};

export type { RestrictionDto };

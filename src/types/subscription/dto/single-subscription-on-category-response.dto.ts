import { Prisma } from "@/generated/prisma";
import { DocumentWithUrl, Reason } from "@/types";

type MetaIsDisabled = {
  isDisabled: true;
  reason: Reason;
  expiresAt?: Date | null;
};

type MetaIsNotDisabled = {
  isDisabled: false;
  reason: null;
};

type Meta = MetaIsDisabled | MetaIsNotDisabled;

type SubscriptionPayload = Prisma.SubscriptionGetPayload<{
  include: { location: true; documents: true; category: true };
}>;

type SingleSubscriptionOnCategoryResponseDto = Omit<
  SubscriptionPayload,
  "price" | "documents"
> & {
  price: number;
  documents: DocumentWithUrl[];
  meta: Meta;
};

export type { SingleSubscriptionOnCategoryResponseDto };

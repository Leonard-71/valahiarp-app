import { Prisma } from "@/generated/prisma";
import { DocumentWithUrl } from "@/types";

type SubscriptionPayload = Prisma.SubscriptionGetPayload<{
  include: {
    location: true;
    documents: true;
    category: {
      include: {
        configuration: true;
      };
    };
    dependsOnParent: true;
    createdBy: true;
  };
}>;

type SingleDependsOneParentDto = Omit<
  NonNullable<SubscriptionPayload["dependsOnParent"]>,
  "price"
> & {
  price: number;
};

type SingleSubscriptionResponseDto = Omit<
  SubscriptionPayload,
  "price" | "documents" | "dependsOnParent"
> & {
  price: number;
  documents: DocumentWithUrl[];
  dependsOnParent: SingleDependsOneParentDto | null;
};

export type { SingleSubscriptionResponseDto, SingleDependsOneParentDto };

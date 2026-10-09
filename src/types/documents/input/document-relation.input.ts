import type { Subscription } from "@/generated/prisma";

enum DocumentRelations {
  SUBSCRIPTION = "subscriptions",
}

type DocumentRelationIdMap = {
  [DocumentRelations.SUBSCRIPTION]: Subscription["id"];
};

type DocumentRelationInput<T extends DocumentRelations> = {
  entityType: T;
  ids: DocumentRelationIdMap[T][];
};

export { DocumentRelations };
export type { DocumentRelationInput, DocumentRelationIdMap };

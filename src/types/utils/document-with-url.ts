import { Document } from "@/generated/prisma";

type DocumentWithUrl = Document & {
  url: string | null;
};

export type { DocumentWithUrl };

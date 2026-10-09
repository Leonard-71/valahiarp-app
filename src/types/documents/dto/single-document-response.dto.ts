import { Document } from "@/generated/prisma";

type SingleDocumentResponseDto = {
  document: Document;
  signedUrl: string;
};

export type { SingleDocumentResponseDto };

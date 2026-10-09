import { Document } from "@/generated/prisma";
import { createSignedUrl } from "@/service/document/document.service";
import { DocumentWithUrl } from "@/types";

const documentToDocumentWithUrl = async (
  document: Document,
): Promise<DocumentWithUrl> => {
  const { data, error } = await createSignedUrl(document.key);

  if (error) {
    return {
      ...document,
      url: null,
    };
  }

  return {
    ...document,
    url: data.signedUrl,
  };
};

export { documentToDocumentWithUrl };

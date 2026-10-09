import { DocumentFolderInput, DocumentMimeTypeInput } from "@/types";

import {
  DocumentRelationInput,
  DocumentRelations,
} from "./document-relation.input";

type CreateDocumentInput = {
  folder: DocumentFolderInput;
  fileName: string;
  fileType: DocumentMimeTypeInput;
  fileSize: number;
  checkSum: string;
  relations?: DocumentRelationInput<DocumentRelations>[];
};

export type { CreateDocumentInput };

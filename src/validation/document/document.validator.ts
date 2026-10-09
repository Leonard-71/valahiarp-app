import {
  array,
  discriminatedUnion,
  literal,
  nativeEnum,
  number,
  object,
  string,
} from "zod";

import { DocumentFolderInput, DocumentMimeTypeInput } from "@/types";
import { DocumentRelations } from "@/types/documents/input/document-relation.input";

const documentRelationValidator = discriminatedUnion("entityType", [
  object({
    entityType: literal(DocumentRelations.SUBSCRIPTION),
    ids: array(number()),
  }),
]);

const createDocumentValidator = object({
  folder: nativeEnum(DocumentFolderInput, { errorMap: () => ({ message: "Selectați un folder valid" }) }),
  fileName: string().nonempty("Numele fișierului este obligatoriu"),
  fileType: nativeEnum(DocumentMimeTypeInput, { errorMap: () => ({ message: "Tipul fișierului nu este valid" }) }),
  fileSize: number().max(10 * 1024 * 1024, "Dimensiunea fișierului nu poate depăși 10MB"),
  checkSum: string().nonempty("Suma de control este obligatorie"),
  relations: array(documentRelationValidator).min(1, "Cel puțin o relație este obligatorie").optional(),
});

const keyValidator = string().nonempty("Cheia este obligatorie");

export { createDocumentValidator, keyValidator };

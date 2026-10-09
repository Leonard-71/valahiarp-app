import { SingleCategoryResponseDto } from "@/types";

import { generateFilterSpec } from "../filter-spec-generator";
import { FilterType } from "../filter-types";

const categoryFilterSpec = generateFilterSpec<SingleCategoryResponseDto>([
  { field: "name", type: FilterType.TEXT, label: "Nume" },
  { field: "isArchived", type: FilterType.BOOLEAN, label: "Arhivat" },
  {
    field: "isExclusiveToOwner",
    type: FilterType.BOOLEAN,
    label: "Acces limitat la un singur utilizator",
  },
  { field: "requiresCode", type: FilterType.BOOLEAN, label: "Necesita cod" },
  {
    field: "hasLeaflet",
    type: FilterType.BOOLEAN,
    label: "Are locatie pe harta",
  },
  { field: "isMonthly", type: FilterType.BOOLEAN, label: "Vandut pe luna" },
  {
    field: "limitOnePerCategory",
    type: FilterType.BOOLEAN,
    label: "Un singur abonament pe categorie",
  },
  { field: "configuration.color", type: FilterType.TEXT, label: "Culoare" },
  { field: "createdAt", type: FilterType.DATE, label: "Creata la" },
  { field: "updatedAt", type: FilterType.DATE, label: "Ultima modificare la" },
]);

export { categoryFilterSpec };

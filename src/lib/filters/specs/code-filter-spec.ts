import {
  asyncSelectSubscriptions,
  asyncSelectUsers,
} from "@/controller/select";
import { SingleCodeResponseDto } from "@/types";

import { generateFilterSpec } from "../filter-spec-generator";
import { FilterType } from "../filter-types";

const codeFilterSpec = generateFilterSpec<SingleCodeResponseDto>([
  {
    field: "userId",
    type: FilterType.MULTISELECT_NUMBER,
    label: "Utilizator",
    getData: asyncSelectUsers,
  },
  {
    field: "subscriptionId",
    type: FilterType.MULTISELECT_NUMBER,
    label: "Abonament",
    getData: asyncSelectSubscriptions,
  },
  { field: "expiresAt", type: FilterType.DATE, label: "Data expirare" },
  {
    field: "isArchived",
    type: FilterType.BOOLEAN,
    label: "Folosit/Dezactivat (Arhivat)",
  },
]);

export { codeFilterSpec };

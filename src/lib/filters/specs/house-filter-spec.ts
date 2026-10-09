import { SingleHouseResponseDto } from "@/types";

import { generateFilterSpec } from "../filter-spec-generator";
import { FilterType } from "../filter-types";

const houseFilterSpec = generateFilterSpec<SingleHouseResponseDto>([
  { field: "name", type: FilterType.TEXT, label: "Nume" },
  { 
    field: "isOccupied", 
    type: FilterType.MULTISELECT_STRING, 
    label: "Status",
    options: [
      { value: "all", label: "Toate casele" },
      { value: "available", label: "Case disponibile" },
      { value: "occupied", label: "Case ocupate" },
    ]
  },
]);

export { houseFilterSpec };

import { Metadata } from "next";

import { PageHeader } from "@/components/custom/dashboard-components";
import { UserRole } from "@/generated/prisma";
import { layerGuard } from "@/guards";

import { CategoriesLayer } from "./_components/categories-layer";

export const metadata: Metadata = {
  title: "Categorii",
  description: "Categorii",
};

export default layerGuard(
  function CategoriesPage() {
    return (
      <div>
        <PageHeader
          title="Management Categorii"
          description="Gestionează categoriile de produse și servicii"
        />

        <div className="mt-6">
          <CategoriesLayer />
        </div>
      </div>
    );
  },
  [UserRole.ADMIN],
);

import { Metadata } from "next";

import { PageHeader } from "@/components/custom/dashboard-components";
import { UserRole } from "@/generated/prisma";
import { layerGuard } from "@/guards";

import { CodesLayer } from "./_components/codes-layer";

export const metadata: Metadata = {
  title: "Coduri",
  description: "Coduri",
};

export default layerGuard(
  function CodesPage() {
    return (
      <div>
        <PageHeader
          title="Management Coduri"
          description="Gestionează codurile de acces și promoționale"
        />

        <div className="mt-6">
          <CodesLayer />
        </div>
      </div>
    );
  },
  [UserRole.ADMIN],
);

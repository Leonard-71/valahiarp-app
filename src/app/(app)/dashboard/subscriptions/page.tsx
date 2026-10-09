import { Metadata } from "next";

import { PageHeader } from "@/components/custom/dashboard-components";
import { UserRole } from "@/generated/prisma";
import { layerGuard } from "@/guards";

import { SubscriptionsLayer } from "./_components/subscriptions-layer";

export const metadata: Metadata = {
  title: "Abonamente",
  description: "Abonamente",
};

export default layerGuard(
  function SubscriptionsPage() {
    return (
      <div>
        <PageHeader
          title="Management Abonamente"
          description="Gestionează abonamentele utilizatorilor"
        />

        <div className="mt-6">
          <SubscriptionsLayer />
        </div>
      </div>
    );
  },
  [UserRole.ADMIN],
);

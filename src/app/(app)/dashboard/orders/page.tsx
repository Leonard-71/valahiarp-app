import { Metadata } from "next";

import { PageHeader } from "@/components/custom/dashboard-components";
import { UserRole } from "@/generated/prisma";
import { layerGuard } from "@/guards";

import { OrdersLayer } from "./_components/orders-layer";

export const metadata: Metadata = {
  title: "Comenzi",
  description: "Comenzi",
};

export default layerGuard(
  function OrdersPage() {
    return (
      <div>
        <PageHeader
          title="Management Comenzi"
          description="Gestionează comenzile utilizatorilor"
        />

        <div className="mt-6">
          <OrdersLayer />
        </div>
      </div>
    );
  },
  [UserRole.ADMIN],
);

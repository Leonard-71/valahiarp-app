import { Metadata } from "next";

import { PageHeader } from "@/components/custom/dashboard-components";
import { layerGuard } from "@/guards";

import { UserOrdersLayer } from "./_components/user-orders-layer";

export const metadata: Metadata = {
  title: "Istoricul comenzilor",
  description: "Istoricul comenzilor tale",
};

export default layerGuard(function HistoryPage() {
  return (
    <div>
      <PageHeader
        title="Istoricul comenzilor"
        description="Vizualizează toate comenzile tale anterioare"
      />

      <div className="mt-6">
        <UserOrdersLayer />
      </div>
    </div>
  );
}, []);

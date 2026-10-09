import { Metadata } from "next";

import { PageHeader } from "@/components/custom/dashboard-components";
import { UserRole } from "@/generated/prisma";
import { layerGuard } from "@/guards";

import { UsersLayer } from "./_components/users-layer";

export const metadata: Metadata = {
  title: "Utilizatori",
  description: "Utilizatori",
};

export default layerGuard(
  function UsersPage() {
    return (
      <div>
        <PageHeader
          title="Management Utilizatori"
          description="Gestionează utilizatorii și permisiunile lor"
        />

        <div className="mt-6">
          <UsersLayer />
        </div>
      </div>
    );
  },
  [UserRole.ADMIN],
);

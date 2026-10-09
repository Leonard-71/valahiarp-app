import { Metadata } from "next";

import { PageHeader } from "@/components/custom/dashboard-components";
import { layerGuard } from "@/guards";
import { UserRole } from "@/generated/prisma";

import { HousesLayer } from "./_components/houses-layer";

export const metadata: Metadata = {
    title: "Case din joc - Dashboard",
    description: "Gestionează casele din joc",
};

export default layerGuard(
    function HousesPage() {
        return (
            <div>
                <PageHeader
                    title="Management Case din joc"
                    description="Gestionează casele disponibile în joc"
                />

                <div className="mt-6">
                    <HousesLayer />
                </div>
            </div>
        );
    },
    [UserRole.ADMIN],
);

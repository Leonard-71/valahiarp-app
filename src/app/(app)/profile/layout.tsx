import { Metadata } from "next";

import { layerGuard } from "@/guards";

export const metadata: Metadata = {
  title: {
    template: "%s | Valahia RP",
    default: "Profil | Valahia RP",
  },
  description: "Gestionează datele tale personale",
};

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default layerGuard(function ProfileLayout({
  children,
}: ProfileLayoutProps) {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-8 md:px-8">{children}</div>
  );
}, []);

import { Metadata } from "next";

import { ContactCard } from "@/components/custom/contact";
import {
  LanternIcon,
  RevolverIcon,
  SheriffStarIcon,
} from "@/components/custom/landing/western-icons";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactează-ne pe Discord, CFX sau RedM",
};

export default async function ContactPage() {
  const rdr2ServerUrl = process.env.RDR2_SERVER_URL || "#";

  const contactCards = [
    {
      title: "Discord",
      description:
        "Alătură-te serverului nostru Discord pentru a comunica cu comunitatea.",
      href: SITE.discordInvite,
      buttonText: "Alătură-te Discord",
      icon: <LanternIcon className="size-10" />,
    },
    {
      title: "CFX",
      description:
        "Accesează profilul CFX pentru informații despre server și conectare.",
      href: "https://forum.cfx.re/u/_a.n.u.b.i.s/messages",
      buttonText: "Vizitează CFX",
      icon: <SheriffStarIcon className="size-10" />,
    },
    {
      title: "Valahia RP",
      description:
        "Intră pe serverul Red Dead Redemption 2 Roleplay pentru aventura de frontieră.",
      href: rdr2ServerUrl,
      buttonText: "Conectează-te",
      icon: <RevolverIcon className="size-10" />,
    },
  ];

  return (
    <div className="z-10 flex flex-1 items-center justify-center px-6 py-16">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="font-display title-burnt mb-4 text-4xl md:text-5xl">
            Contact
          </h1>
          <p className="text-muted-foreground text-lg">
            Alătură-te comunității și descoperă lumea Valahia RP.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {contactCards.map((card) => (
            <ContactCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}

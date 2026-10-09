import Link from "next/link";
import { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContactCardProps {
  title: string;
  description: string;
  href: string;
  buttonText: string;
  icon: ReactNode;
}

export function ContactCard({
  title,
  description,
  href,
  buttonText,
  icon,
}: ContactCardProps) {
  const isExternal = href.startsWith("http");

  return (
    <article className="glass-panel flex h-full flex-col items-center rounded-xl p-6 text-center">
      <div className="text-bronze mb-4">{icon}</div>
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed">
        {description}
      </p>
      <Button asChild className="mt-6 w-full" variant="outline">
        <Link
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          className={cn("tracking-[0.12em] uppercase")}
        >
          {buttonText}
        </Link>
      </Button>
    </article>
  );
}

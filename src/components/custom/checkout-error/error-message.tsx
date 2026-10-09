"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface CheckoutErrorMessageProps {
  title?: string;
  description?: string;
  actions?: ReactNode;
}

export function CheckoutErrorMessage({
  title = "Achiziție anulată",
  description = "Procesul de achiziționare a abonamentului a fost anulat sau a apărut o eroare.",
  actions,
}: CheckoutErrorMessageProps) {
  return (
    <div className="p-6">
      <Card className="bg-card text-card-foreground mx-auto max-w-2xl">
        <div className="flex items-start gap-4 p-6">
          <div className="text-destructive">
            <XCircle className="h-10 w-10" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col items-center gap-3 p-6 sm:flex-row sm:justify-end">
          {actions ? (
            actions
          ) : (
            <>
              <Button asChild variant="default">
                <Link href="/subscriptions">Înapoi la magazin</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/profile/history">Vezi istoricul comenzilor</Link>
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}

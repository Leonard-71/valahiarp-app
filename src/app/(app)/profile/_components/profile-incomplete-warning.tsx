"use client";

import { AlertTriangle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { SingleUserResponseDto } from "@/types/user";

interface ProfileIncompleteWarningProps {
  user: SingleUserResponseDto;
}

function checkProfileComplete(user: SingleUserResponseDto): {
  isComplete: boolean;
  missingFields: string[];
} {
  const missingFields: string[] = [];

  if (!user.name?.trim()) {
    missingFields.push("Nume complet");
  }
  if (!user.addressId) {
    missingFields.push("Adresă");
  }

  return {
    isComplete: missingFields.length === 0,
    missingFields,
  };
}

export function ProfileIncompleteWarning({
  user,
}: ProfileIncompleteWarningProps) {
  const { isComplete, missingFields } = checkProfileComplete(user);

  if (isComplete) {
    return null;
  }

  return (
    <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 size-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
          <div className="flex-1">
            <h3 className="mb-2 font-semibold text-amber-800 dark:text-amber-200">
              Profil incomplet
            </h3>
            <p className="mb-3 text-sm text-amber-700 dark:text-amber-300">
              Nu vei putea efectua cumpărături până când nu completezi toate
              informațiile necesare din profil.
            </p>
            <p className="text-sm text-amber-600 dark:text-amber-400">
              <strong>Câmpuri lipsă:</strong> {missingFields.join(", ")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

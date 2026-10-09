"use client";

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

import { ConfirmationDialog } from "@/components/custom/confirmation-dialog/confirmation-dialog";
import { Button } from "@/components/ui/button";
import { anonymizeUser } from "@/controller/user";

export function DeleteAccount() {
  const session = useSession();
  const [open, setOpen] = useState(false);

  const handleAction = async () => {
    if (!session.data?.user.id) {
      return;
    }

    const response = await anonymizeUser(session.data?.user.id);
    if (!response.error) {
      await signOut({ callbackUrl: "/" });
    }
    return response;
  };

  return (
    <div className="flex justify-end">
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Închide contul
      </Button>

      <ConfirmationDialog
        open={open}
        onOpenChange={setOpen}
        title="Confirmă închiderea contului"
        description="Această acțiune este ireversibilă. Datele tale personale vor fi anonimizate conform GDPR. Informațiile nu vor mai putea fi asociate cu identitatea ta, dar datele anonimizate pot rămâne pentru statistici."
        action={handleAction}
        successMessage="Contul a fost închis. Vei fi delogat."
        confirmLabel="Da, închide contul"
        cancelLabel="Renunță"
      />
    </div>
  );
}

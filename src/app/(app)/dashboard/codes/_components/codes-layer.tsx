"use client";

import { useState } from "react";

import { ConfirmationDialog } from "@/components/custom/confirmation-dialog";
import { Modal } from "@/components/custom/modal";
import { Button } from "@/components/ui/button";
import { deactivateCode } from "@/controller/admin";
import { CodeWithRelationsDto } from "@/types";

import { CodesForm } from "./codes-form";
import { CodesTable } from "./codes-table";

enum ModalAction {
  CREATE = "create",
  ARCHIVE = "archive",
}

export function CodesLayer() {
  const [modalAction, setModalAction] = useState<ModalAction | null>(null);
  const [selectedCode, setSelectedCode] = useState<CodeWithRelationsDto | null>(
    null,
  );
  const [refreshCounter, setRefreshCounter] = useState(0);

  const handleGetCodeName = (code: CodeWithRelationsDto | null) => {
    if (!code) {
      return "";
    }
    return `ID: ${code.id} (User: ${code.user?.email}, Subscription: ${code.subscription?.name})`;
  };

  const handleModalOpen = (
    action: ModalAction,
    code: CodeWithRelationsDto | null = null,
  ) => {
    setModalAction(action);
    setSelectedCode(code);
  };

  const handleArchiveAction = async () => {
    if (!selectedCode) {
      return;
    }

    return await deactivateCode(selectedCode.id);
  };

  const handleModalClose = () => {
    setModalAction(null);
    setTimeout(() => {
      setSelectedCode(null);
    }, 200);
  };

  const handleSuccess = () => {
    setRefreshCounter((prev) => prev + 1);
    handleModalClose();
  };

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button onClick={() => handleModalOpen(ModalAction.CREATE)}>
          Adaugă cod nou
        </Button>
      </div>

      <CodesTable
        onArchive={(code) => handleModalOpen(ModalAction.ARCHIVE, code)}
        refreshTrigger={refreshCounter}
      />

      <Modal
        title="Adaugă cod nou"
        open={modalAction === ModalAction.CREATE}
        onOpenChange={(isOpen) => !isOpen && handleModalClose()}
      >
        <CodesForm onSuccess={handleSuccess} />
      </Modal>

      <ConfirmationDialog
        open={modalAction === ModalAction.ARCHIVE}
        onOpenChange={(isOpen) => !isOpen && handleModalClose()}
        title="Confirmă arhivarea"
        description={`Ești sigur că vrei să arhivezi codul ${handleGetCodeName(selectedCode)}? Această acțiune poate fi anulată.`}
        action={handleArchiveAction}
        onSuccess={handleSuccess}
        successMessage="Codul a fost arhivat cu succes."
        errorMessage="A apărut o eroare la arhivare"
      />
    </>
  );
}

"use client";

import { useState } from "react";

import { ConfirmationDialog } from "@/components/custom";
import { Modal } from "@/components/custom/modal";
import { anonymizeUser } from "@/controller/user";
import { SingleUserResponseDto } from "@/types";

import { UsersForm } from "./users-form";
import { UsersTable } from "./users-table";

enum ModalAction {
  EDIT = "edit",
  ANONYMIZE = "anonymize",
}

export function UsersLayer() {
  const [modalAction, setModalAction] = useState<ModalAction | null>(null);
  const [selectedUser, setSelectedUser] =
    useState<SingleUserResponseDto | null>(null);
  const [refreshCounter, setRefreshCounter] = useState(0);

  const handleGetUserName = (user: SingleUserResponseDto | null) => {
    if (!user) {
      return "";
    }
    return user.name;
  };

  const handleModalOpen = (
    action: ModalAction,
    user: SingleUserResponseDto,
  ) => {
    setModalAction(action);
    setSelectedUser(user);
  };

  const handleAnonymizeAction = async () => {
    if (!selectedUser) {
      return;
    }

    return await anonymizeUser(selectedUser.id);
  };

  const handleModalClose = () => {
    setModalAction(null);
    setTimeout(() => {
      setSelectedUser(null);
    }, 200);
  };

  const handleSuccess = () => {
    setRefreshCounter((prev) => prev + 1);
    handleModalClose();
  };

  return (
    <>
      <UsersTable
        onEdit={(user) => handleModalOpen(ModalAction.EDIT, user)}
        onAnonymize={(user) => handleModalOpen(ModalAction.ANONYMIZE, user)}
        refreshTrigger={refreshCounter}
      />

      <Modal
        title={`Editează utilizatorul ${handleGetUserName(selectedUser)}`}
        open={modalAction === ModalAction.EDIT}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            handleModalClose();
          }
        }}
      >
        {selectedUser && (
          <UsersForm user={selectedUser} onSuccess={handleSuccess} />
        )}
      </Modal>

      <ConfirmationDialog
        open={modalAction === ModalAction.ANONYMIZE}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            handleModalClose();
          }
        }}
        title="Confirmă anonimizarea"
        description={`Ești sigur că vrei să anonimizezi utilizatorul ${handleGetUserName(
          selectedUser,
        )}? Această acțiune este ireversibilă.`}
        action={handleAnonymizeAction}
        onSuccess={handleSuccess}
        successMessage="Utilizatorul a fost anonimizat cu succes."
      />
    </>
  );
}

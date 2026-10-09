"use client";

import { useState } from "react";

import { ConfirmationDialog } from "@/components/custom";
import { Modal } from "@/components/custom/modal";
import { Button } from "@/components/ui/button";
import { SubscriptionImagesForm } from "@/app/(app)/dashboard/subscriptions/_components/subscription-images-form";
import { archiveSubscription, recoverSubscription } from "@/controller/admin";
import { SingleSubscriptionResponseDto } from "@/types";

import { SubscriptionsForm } from "./subscriptions-form";
import { SubscriptionsTable } from "./subscriptions-table";

enum ModalAction {
  CREATE = "create",
  EDIT_DETAILS = "edit_details",
  EDIT_IMAGES = "edit_images",
  ARCHIVE = "archive",
  RECOVER = "recover",
}

export function SubscriptionsLayer() {
  const [modalAction, setModalAction] = useState<ModalAction | null>(null);
  const [selectedSubscription, setSelectedSubscription] =
    useState<SingleSubscriptionResponseDto | null>(null);
  const [refreshCounter, setRefreshCounter] = useState(0);

  const handleGetSubscriptionName = (
    subscription: SingleSubscriptionResponseDto | null,
  ) => {
    if (!subscription) {
      return "";
    }
    return subscription.name;
  };

  const handleModalOpen = (
    action: ModalAction,
    subscription: SingleSubscriptionResponseDto | null = null,
  ) => {
    setModalAction(action);
    setSelectedSubscription(subscription);
  };

  const handleConfirmationAction = async () => {
    if (!selectedSubscription || !modalAction) return;

    if (modalAction === ModalAction.ARCHIVE) {
      return await archiveSubscription(selectedSubscription.id);
    } else if (modalAction === ModalAction.RECOVER) {
      return await recoverSubscription(selectedSubscription.id);
    }
  };

  const handleModalClose = () => {
    setModalAction(null);
    setTimeout(() => {
      setSelectedSubscription(null);
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
          Creează abonament
        </Button>
      </div>
      <SubscriptionsTable
        onEdit={(sub) => handleModalOpen(ModalAction.EDIT_DETAILS, sub)}
        onEditImages={(sub) => handleModalOpen(ModalAction.EDIT_IMAGES, sub)}
        onArchive={(sub) => handleModalOpen(ModalAction.ARCHIVE, sub)}
        onRecover={(sub) => handleModalOpen(ModalAction.RECOVER, sub)}
        refreshTrigger={refreshCounter}
      />

      <Modal
        title={
          modalAction === ModalAction.CREATE
            ? "Creează abonament"
            : `Editează abonamentul ${handleGetSubscriptionName(selectedSubscription)}`
        }
        open={
          modalAction === ModalAction.CREATE ||
          modalAction === ModalAction.EDIT_DETAILS
        }
        onOpenChange={(isOpen) => !isOpen && handleModalClose()}
      >
        <SubscriptionsForm
          subscription={selectedSubscription}
          onSuccess={handleSuccess}
        />
      </Modal>

      <Modal
        title={`Editează imagini pentru ${handleGetSubscriptionName(
          selectedSubscription,
        )}`}
        open={modalAction === ModalAction.EDIT_IMAGES}
        onOpenChange={(isOpen) =>
          !isOpen &&
          (() => {
            handleModalClose();
            setRefreshCounter((prev) => prev + 1);
          })()
        }
      >
        {selectedSubscription && (
          <SubscriptionImagesForm subscription={selectedSubscription} />
        )}
      </Modal>

      <ConfirmationDialog
        open={
          modalAction === ModalAction.ARCHIVE ||
          modalAction === ModalAction.RECOVER
        }
        onOpenChange={(isOpen) => !isOpen && handleModalClose()}
        title={
          modalAction === ModalAction.ARCHIVE
            ? "Confirmă arhivarea"
            : "Confirmă recuperarea"
        }
        description={`Ești sigur că vrei să ${
          modalAction === ModalAction.ARCHIVE ? "arhivezi" : "recuperezi"
        } abonamentul ${handleGetSubscriptionName(selectedSubscription)}?`}
        action={handleConfirmationAction}
        onSuccess={handleSuccess}
        successMessage={
          modalAction === ModalAction.ARCHIVE
            ? "Abonamentul a fost arhivat cu succes."
            : "Abonamentul a fost recuperat cu succes."
        }
      />
    </>
  );
}

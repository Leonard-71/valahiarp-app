"use client";

import { useState } from "react";

import { ConfirmationDialog } from "@/components/custom";
import { Modal } from "@/components/custom/modal";
import { Button } from "@/components/ui/button";
import { archiveHouse, recoverHouse } from "@/controller/house";
import { SingleHouseResponseDto } from "@/types";

import { HousesForm } from "./houses-form";
import { HousesTable } from "./houses-table";

enum ModalAction {
    CREATE = "create",
    EDIT = "edit",
    ARCHIVE = "archive",
    RECOVER = "recover",
}

export function HousesLayer() {
    const [refreshCounter, setRefreshCounter] = useState(0);
    const [selectedHouse, setSelectedHouse] = useState<SingleHouseResponseDto | null>(null);
    const [modalAction, setModalAction] = useState<ModalAction | null>(null);

    const handleModalOpen = (
        action: ModalAction,
        house: SingleHouseResponseDto | null = null,
    ) => {
        setModalAction(action);
        setSelectedHouse(house);
    };

    const handleConfirmationAction = async () => {
        if (!selectedHouse || !modalAction) return;
        if (modalAction === ModalAction.ARCHIVE) {
            return await archiveHouse(selectedHouse.id);
        } else if (modalAction === ModalAction.RECOVER) {
            return await recoverHouse(selectedHouse.id);
        }
    };

    const handleModalClose = () => {
        setModalAction(null);
        setTimeout(() => {
            setSelectedHouse(null);
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
                    Adaugă casă nouă
                </Button>
            </div>
            <HousesTable
                onEdit={(house: SingleHouseResponseDto) => handleModalOpen(ModalAction.EDIT, house)}
                onArchive={(house: SingleHouseResponseDto) => handleModalOpen(ModalAction.ARCHIVE, house)}
                onRecover={(house: SingleHouseResponseDto) => handleModalOpen(ModalAction.RECOVER, house)}
                refreshTrigger={refreshCounter}
            />
            <Modal
                title={
                    modalAction === ModalAction.CREATE
                        ? "Adaugă casă nouă"
                        : "Editează casa"
                }
                open={
                    modalAction === ModalAction.CREATE || modalAction === ModalAction.EDIT
                }
                onOpenChange={(isOpen) => !isOpen && handleModalClose()}
            >
                <HousesForm
                    house={selectedHouse}
                    onSuccess={handleSuccess}
                    onCancel={handleModalClose}
                />
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
                description={`Ești sigur că vrei să ${modalAction === ModalAction.ARCHIVE ? "arhivezi" : "recuperezi"} casa ${selectedHouse?.name || ""}?`}
                action={handleConfirmationAction}
                onSuccess={handleSuccess}
                successMessage={
                    modalAction === ModalAction.ARCHIVE
                        ? "Casa a fost arhivată cu succes."
                        : "Casa a fost recuperată cu succes."
                }
            />
        </>
    );
}

"use client";

import { useState } from "react";

import { ConfirmationDialog } from "@/components/custom";
import { Modal } from "@/components/custom/modal";
import { Button } from "@/components/ui/button";
import { archiveCategory, recoverCategory } from "@/controller/admin";
import { SingleCategoryResponseDto } from "@/types";

import { CategoriesForm } from "./categories-form";
import { CategoriesTable } from "./categories-table";

enum ModalAction {
  CREATE = "create",
  EDIT = "edit",
  ARCHIVE = "archive",
  RECOVER = "recover",
}

export function CategoriesLayer() {
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [selectedCategory, setSelectedCategory] =
    useState<SingleCategoryResponseDto | null>(null);
  const [modalAction, setModalAction] = useState<ModalAction | null>(null);

  const handleModalOpen = (
    action: ModalAction,
    category: SingleCategoryResponseDto | null = null,
  ) => {
    setModalAction(action);
    setSelectedCategory(category);
  };

  const handleConfirmationAction = async () => {
    if (!selectedCategory || !modalAction) return;
    if (modalAction === ModalAction.ARCHIVE) {
      return await archiveCategory(selectedCategory.id);
    } else if (modalAction === ModalAction.RECOVER) {
      return await recoverCategory(selectedCategory.id);
    }
  };

  const handleModalClose = () => {
    setModalAction(null);
    setTimeout(() => {
      setSelectedCategory(null);
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
          Adaugă categorie nouă
        </Button>
      </div>
      <CategoriesTable
        onEdit={(category) => handleModalOpen(ModalAction.EDIT, category)}
        onArchive={(category) => handleModalOpen(ModalAction.ARCHIVE, category)}
        onRecover={(category) => handleModalOpen(ModalAction.RECOVER, category)}
        refreshTrigger={refreshCounter}
      />
      <Modal
        title={
          modalAction === ModalAction.CREATE
            ? "Adaugă categorie nouă"
            : "Editează categoria"
        }
        open={
          modalAction === ModalAction.CREATE || modalAction === ModalAction.EDIT
        }
        onOpenChange={(isOpen) => !isOpen && handleModalClose()}
      >
        <CategoriesForm category={selectedCategory} onSuccess={handleSuccess} />
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
        description={`Ești sigur că vrei să ${modalAction === ModalAction.ARCHIVE ? "arhivezi" : "recuperezi"} categoria ${selectedCategory?.name || ""}?`}
        action={handleConfirmationAction}
        onSuccess={handleSuccess}
        successMessage={
          modalAction === ModalAction.ARCHIVE
            ? "Categoria a fost arhivată cu succes."
            : "Categoria a fost recuperată cu succes."
        }
      />
    </>
  );
}

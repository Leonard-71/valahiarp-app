"use client";

import { useState } from "react";

import { ConfirmationDialog } from "@/components/custom/confirmation-dialog/confirmation-dialog";
import { Modal } from "@/components/custom/modal";
import { Button } from "@/components/ui/button";
import { refundOrder, revokeOrder } from "@/controller/admin";
import { SingleOrderResponseDto } from "@/types";

import { OrderReportForm } from "./order-report-form";
import { OrdersTable } from "./orders-table";

enum ModalAction {
  REFUND = "refund",
  REVOKE = "revoke",
  EXPORT_REPORT = "export_report",
}

export function OrdersLayer() {
  const [modalAction, setModalAction] = useState<ModalAction | null>(null);
  const [selectedOrder, setSelectedOrder] =
    useState<SingleOrderResponseDto | null>(null);
  const [refreshCounter, setRefreshCounter] = useState(0);

  const handleGetOrderName = (order: SingleOrderResponseDto | null) => {
    if (!order) {
      return "";
    }
    return order.user.name;
  };

  const handleOpenRefundDialog = (order: SingleOrderResponseDto) => {
    setModalAction(ModalAction.REFUND);
    setSelectedOrder(order);
  };

  const handleOpenRevokeDialog = (order: SingleOrderResponseDto) => {
    setModalAction(ModalAction.REVOKE);
    setSelectedOrder(order);
  };

  const handleOpenExportDialog = () => {
    setModalAction(ModalAction.EXPORT_REPORT);
  };

  const handleRefundAction = async () => {
    if (!selectedOrder) {
      return;
    }

    return await refundOrder(selectedOrder.id);
  };

  const handleRevokeAction = async () => {
    if (!selectedOrder) {
      return;
    }

    return await revokeOrder(selectedOrder.invoice.id);
  };

  const handleModalClose = () => {
    setModalAction(null);
    setTimeout(() => {
      setSelectedOrder(null);
    }, 200);
  };

  const handleSuccess = () => {
    setRefreshCounter((prev) => prev + 1);
    handleModalClose();
  };

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button onClick={handleOpenExportDialog}>Exportă raport</Button>
      </div>

      <OrdersTable
        onRefund={handleOpenRefundDialog}
        onRevoke={handleOpenRevokeDialog}
        refreshCounter={refreshCounter}
      />

      <ConfirmationDialog
        open={modalAction === ModalAction.REFUND}
        onOpenChange={(open) => !open && handleModalClose()}
        title="Confirmare Rambursare"
        description={`Sunteți sigur că doriți să rambursați comanda pentru ${handleGetOrderName(selectedOrder)}? Această acțiune este ireversibilă.`}
        action={handleRefundAction}
        onSuccess={handleSuccess}
        successMessage="Comanda a fost rambursată cu succes."
        errorMessage="A apărut o eroare la rambursare."
      />

      <ConfirmationDialog
        open={modalAction === ModalAction.REVOKE}
        onOpenChange={(open) => !open && handleModalClose()}
        title="Confirmare Revocare"
        description={`Sunteți sigur că doriți să revocați comanda pentru ${handleGetOrderName(selectedOrder)}? Clientul va pierde accesul. Această acțiune este ireversibilă.`}
        action={handleRevokeAction}
        onSuccess={handleSuccess}
        successMessage="Comanda a fost revocată cu succes."
        errorMessage="A apărut o eroare la revocare."
      />

      <Modal
        open={modalAction === ModalAction.EXPORT_REPORT}
        onOpenChange={(open) => !open && handleModalClose()}
        title="Exportă raport comenzi"
      >
        <OrderReportForm onClose={handleModalClose} onSuccess={handleSuccess} />
      </Modal>
    </>
  );
}

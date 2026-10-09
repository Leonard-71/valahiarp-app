"use client";

import { useState } from "react";

import { FormBuilder } from "@/components/custom/form-builder";
import { Button } from "@/components/ui/button";
import { exportOrderReport } from "@/controller/admin";

import {
  orderReportFormConfig,
  orderReportFormSchema,
} from "../_utils/order-report-form.config";

interface OrderReportFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export function OrderReportForm({ onClose, onSuccess }: OrderReportFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);

    try {
      const result = await exportOrderReport(data);

      if (result.error) {
        console.error("Export failed:", result.error.message);
        return;
      }

      if (result.data) {
        const base64Content = result.data.fileContent;
        const binaryString = atob(base64Content);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const blob = new Blob([bytes], {
          type: result.data.mimeType,
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = result.data.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        onSuccess?.();
        onClose();
      }
    } catch (error) {
      console.error("Export error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormBuilder
      className="p-0 shadow-none"
      config={orderReportFormConfig}
      schema={orderReportFormSchema}
      onSubmit={handleSubmit}
      submitButton={({ isSubmitting: formSubmitting }) => (
        <Button
          className="w-full"
          type="submit"
          disabled={isSubmitting || formSubmitting}
        >
          {isSubmitting || formSubmitting ? "Se exportă..." : "Exportă raport"}
        </Button>
      )}
    />
  );
}

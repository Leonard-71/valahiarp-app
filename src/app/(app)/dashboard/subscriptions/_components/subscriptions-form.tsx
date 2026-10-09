"use client";

import { FC } from "react";

import { toast } from "sonner";

import { getErrorMessage } from "@/components/custom/error";
import { FormBuilder, FormFieldConfig } from "@/components/custom/form-builder";
import { Button } from "@/components/ui/button";
import { createSubscription, updateSubscription } from "@/controller/admin";
import { SingleSubscriptionResponseDto } from "@/types";

import {
  subscriptionFormConfig,
  subscriptionFormSchema,
} from "../_utils/subscription-form.config";
import { transformSubscriptionData } from "../_utils/transform-subscription-data";

interface SubscriptionsFormProps {
  subscription: SingleSubscriptionResponseDto | null;
  onSuccess: () => void;
}

export const SubscriptionsForm: FC<SubscriptionsFormProps> = ({
  subscription,
  onSuccess,
}) => {
  const handleFormSubmit = async (data: any) => {
    const transformedData = transformSubscriptionData(data);
    const response = subscription
      ? await updateSubscription(subscription.id, transformedData)
      : await createSubscription(transformedData);

    if (response.error) {
      toast.error(
        getErrorMessage(
          response.error,
          subscription
            ? "Abonamentul nu a putut fi actualizat."
            : "Abonamentul nu a putut fi creat.",
        ),
      );
      return;
    }

    toast.success(
      subscription
        ? "Abonamentul a fost actualizat cu succes."
        : "Abonamentul a fost creat cu succes.",
    );
    onSuccess();
  };

  const configWithDefaults: FormFieldConfig[] = subscription
    ? subscriptionFormConfig.map((field) => {
        const subscriptionKey =
          field.name as keyof SingleSubscriptionResponseDto;
        let defaultValue: any = subscription[subscriptionKey];

        if (field.name === "categoryId" && subscription.category) {
          defaultValue = {
            value: subscription.category.id,
            label: subscription.category.name,
            meta: subscription.category,
          };
        }

        if (
          field.name === "dependsOnParentId" &&
          subscription.dependsOnParent
        ) {
          defaultValue = {
            value: subscription.dependsOnParent.id,
            label: subscription.dependsOnParent.name,
          };
        }

        return { ...field, defaultValue };
      })
    : subscriptionFormConfig;

  return (
    <FormBuilder
      className="p-0 shadow-none"
      config={configWithDefaults}
      schema={subscriptionFormSchema}
      onSubmit={handleFormSubmit}
      submitButton={({ isSubmitting }) => (
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Se procesează..."
            : subscription
              ? "Actualizează"
              : "Creează"}
        </Button>
      )}
    />
  );
};

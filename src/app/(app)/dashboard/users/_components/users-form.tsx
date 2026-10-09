"use client";

import { FC } from "react";

import { toast } from "sonner";

import { getErrorMessage } from "@/components/custom/error";
import { FormBuilder, FormFieldConfig } from "@/components/custom/form-builder";
import { Button } from "@/components/ui/button";
import { updateUserByAdmin } from "@/controller/admin";
import { SingleUserResponseDto } from "@/types";

import {
  editUserFormConfig,
  editUserFormSchema,
} from "../_utils/edit-user-form.config";
import { transformUpdateUserData } from "../_utils/transform-user-data";

interface UsersFormProps {
  user: SingleUserResponseDto;
  onSuccess: () => void;
}

export const UsersForm: FC<UsersFormProps> = ({ user, onSuccess }) => {
  const handleFormSubmit = async (data: any) => {
    const transformedData = transformUpdateUserData(data);
    const response = await updateUserByAdmin(user.id, transformedData);

    if (response.error) {
      toast.error(
        getErrorMessage(
          response.error,
          "Utilizatorul nu a putut fi actualizat.",
        ),
      );
      return;
    }

    toast.success("Utilizatorul a fost actualizat cu succes.");
    onSuccess();
  };

  const configWithDefaults: FormFieldConfig[] = editUserFormConfig.map(
    (field) => {
      const userKey = field.name as keyof SingleUserResponseDto;
      let defaultValue: any = user[userKey];

      if (field.name === "addressId" && user.address) {
        defaultValue = {
          value: user.address.placeId,
          label: user.address.displayName,
        };
      }

      return { ...field, defaultValue };
    },
  );

  return (
    <FormBuilder
      className="p-0 shadow-none"
      config={configWithDefaults}
      schema={editUserFormSchema}
      onSubmit={handleFormSubmit}
      submitButton={({ isSubmitting }) => (
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Se actualizează..." : "Actualizează"}
        </Button>
      )}
    />
  );
};

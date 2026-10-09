"use client";

import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { Save } from "lucide-react";

import { toast } from "sonner";

import { getErrorMessage } from "@/components/custom/error";
import { FormBuilder, FormFieldConfig } from "@/components/custom/form-builder";
import { Modal } from "@/components/custom/modal";
import { Button } from "@/components/ui/button";
import { updateUser } from "@/controller/user";
import { SingleUserResponseDto } from "@/types/user";

import {
  profileFormConfig,
  profileFormSchema,
} from "../_utils/profile-form.config";
import { transformProfileData } from "../_utils/transform-profile-data";

interface ProfileFormProps {
  user: SingleUserResponseDto;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setUserForm: (user: SingleUserResponseDto) => void;
}

export function ProfileForm({
  user,
  isOpen,
  setIsOpen,
  setUserForm,
}: ProfileFormProps) {
  const { update } = useSession();
  const formConfigWithDefaults = useMemo((): FormFieldConfig[] => {
    return profileFormConfig.map((field) => {
      const userKey = field.name as keyof SingleUserResponseDto;
      let defaultValue: any = user[userKey];

      if (field.name === "addressId" && user.address) {
        defaultValue = {
          value: user.address.placeId,
          label: user.address.displayName,
        };
      }

      return { ...field, defaultValue };
    });
  }, [user]);

  const handleFormSubmit = async (data: any) => {
    try {
      const transformedData = transformProfileData(data);
      const response = await updateUser(user.id, transformedData);

      if (response.error) {
        toast.error(
          getErrorMessage(
            response.error,
            "A apărut o eroare la actualizarea profilului.",
          ),
        );
        return;
      }

      await update({
        user: {
          name: response.data.name,
        },
      });

      toast.success("Profilul a fost actualizat cu succes!");
      setUserForm(response.data);
      setIsOpen(false);
    } catch {
      toast.error("A apărut o eroare la actualizarea profilului.");
    }
  };

  return (
    <Modal title="Editează profilul" open={isOpen} onOpenChange={setIsOpen}>
      <div className="space-y-6">
        <FormBuilder
          className="p-0 shadow-none"
          config={formConfigWithDefaults}
          schema={profileFormSchema}
          onSubmit={handleFormSubmit}
          submitButton={({ isSubmitting }) => (
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Salvează..." : "Salvează modificările"}
            </Button>
          )}
        />
      </div>
    </Modal>
  );
}

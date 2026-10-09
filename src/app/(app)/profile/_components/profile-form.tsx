"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { Select } from "@/components/custom/select";
import { getErrorMessage } from "@/components/custom/error";
import { Modal } from "@/components/custom/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROMANIA, ROMANIAN_COUNTIES } from "@/constants/address/romania";
import { updateUser } from "@/controller/user";
import { SingleUserResponseDto } from "@/types/user";
import { updateUserValidator } from "@/validation/user/user.validator";

interface ProfileFormProps {
  user: SingleUserResponseDto;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setUserForm: (user: SingleUserResponseDto) => void;
}

type ProfileFormValues = z.infer<typeof profileSchema>;

const profileSchema = updateUserValidator.omit({ id: true });

const countryOptions = [{ value: ROMANIA, label: ROMANIA }];
const countyOptions = ROMANIAN_COUNTIES.map((county) => ({
  value: county,
  label: county,
}));

function valuesFromUser(user: SingleUserResponseDto): ProfileFormValues {
  return {
    name: user.name ?? "",
    phone: user.phone ?? "",
    email: user.email ?? "",
    country: ROMANIA,
    county: (user.manualAddress?.county ?? "") as ProfileFormValues["county"],
    locality: user.manualAddress?.locality ?? "",
    street: user.manualAddress?.street ?? "",
  };
}

function RequiredMark() {
  return <span className="text-destructive">*</span>;
}

export function ProfileForm({
  user,
  isOpen,
  setIsOpen,
  setUserForm,
}: ProfileFormProps) {
  const { update } = useSession();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: valuesFromUser(user),
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(valuesFromUser(user));
    }
  }, [form, isOpen, user]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await updateUser(user.id, {
        ...data,
        county: data.county,
        street: (data.street ?? "").trim(),
      });

      if (response.error || !response.data) {
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
          email: response.data.email,
        },
      });

      toast.success("Profilul a fost actualizat cu succes!");
      setUserForm(response.data);
      setIsOpen(false);
    } catch {
      toast.error("A apărut o eroare la actualizarea profilului.");
    }
  });

  return (
    <Modal
      title="Editează profilul"
      open={isOpen}
      onOpenChange={setIsOpen}
      className="max-h-[90vh] overflow-y-auto md:min-w-2xl"
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="name">
              Nume și prenume <RequiredMark />
            </Label>
            <Input
              id="name"
              placeholder="Completează numele persoanei..."
              aria-invalid={!!errors.name}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Telefon <RequiredMark />
            </Label>
            <Input
              id="phone"
              placeholder="07xx xxx xxx"
              aria-invalid={!!errors.phone}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-destructive text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <RequiredMark />
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="email@exemplu.ro"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-destructive text-sm">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-4 border-t pt-4">
          <h3 className="text-sm font-semibold">Adresă</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>
                Țara <RequiredMark />
              </Label>
              <Select
                options={countryOptions}
                value={watch("country")}
                onChange={(value) =>
                  setValue("country", String(value) as typeof ROMANIA, {
                    shouldValidate: true,
                  })
                }
                placeholder="Selectează țara..."
                isInvalid={!!errors.country}
              />
              {errors.country && (
                <p className="text-destructive text-sm">
                  {errors.country.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>
                Județul <RequiredMark />
              </Label>
              <Select
                options={countyOptions}
                value={watch("county") || null}
                onChange={(value) =>
                  setValue(
                    "county",
                    String(value) as ProfileFormValues["county"],
                    { shouldValidate: true },
                  )
                }
                placeholder="Selectează județul..."
                isInvalid={!!errors.county}
              />
              {errors.county && (
                <p className="text-destructive text-sm">
                  {errors.county.message}
                </p>
              )}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="locality">
                Localitatea <RequiredMark />
              </Label>
              <Input
                id="locality"
                placeholder="Selectează localitatea..."
                aria-invalid={!!errors.locality}
                {...register("locality")}
              />
              {errors.locality && (
                <p className="text-destructive text-sm">
                  {errors.locality.message}
                </p>
              )}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="street">Adresa</Label>
              <Input
                id="street"
                placeholder="Stradă și număr..."
                aria-invalid={!!errors.street}
                {...register("street")}
              />
              {errors.street && (
                <p className="text-destructive text-sm">
                  {errors.street.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <Button className="w-full" type="submit" disabled={isSubmitting}>
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting ? "Salvează..." : "Salvează modificările"}
        </Button>
      </form>
    </Modal>
  );
}

import { UpdateUserByAdminInput } from "@/types";

type RawEditFormData = Omit<UpdateUserByAdminInput, "addressId"> & {
  addressId: { value: string; label: string };
};

export const transformUpdateUserData = (
  data: RawEditFormData,
): UpdateUserByAdminInput => {
  return {
    ...data,
    addressId: data.addressId.value,
  };
};

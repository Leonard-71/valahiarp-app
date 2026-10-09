import { CreateCodeInput } from "@/types";

type RawCreateFormData = {
  userId: { value: string; label: string };
  subscriptionId: { value: number; label: string };
  activeFor: number;
};

export const transformCreateCodeData = (
  data: RawCreateFormData,
): CreateCodeInput => {
  return {
    userId: data.userId.value,
    subscriptionId: data.subscriptionId.value,
    activeFor: Number(data.activeFor),
  };
};

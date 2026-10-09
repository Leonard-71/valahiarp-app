"use client";

import { useRouter } from "next/navigation";

import { BuyButton } from "@/components/custom/buy-button";
import { checkoutOrder } from "@/controller/order";
import { Reason } from "@/types";

interface BuyButtonWrapperProps {
  subscriptionId: number;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
}

export function BuyButtonWrapper({
  subscriptionId,
  className,
  size = "lg",
  disabled = false,
}: BuyButtonWrapperProps) {
  const router = useRouter();

  const handleBuy = async () => {
    const { error } = await checkoutOrder(subscriptionId);
    if (error) {
      if (error.reason === Reason.UNAUTHORIZED_ERROR) {
        router.push("/login");
        return;
      }
      if (error.reason === Reason.NO_USER_DETAILS) {
        router.push("/profile");
        return;
      }
      throw new Error(error.message);
    }
  };

  return (
    <BuyButton
      onBuy={handleBuy}
      disabled={disabled}
      className={className}
      size={size}
    >
      Cumpără
    </BuyButton>
  );
}

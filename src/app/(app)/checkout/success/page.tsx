import { Metadata } from "next";

import { CheckoutSuccessMessage } from "@/components/custom/checkout-success";

export const metadata: Metadata = {
  title: "Achiziționat",
  description: "Achiziționat",
};

export default function Success() {
  return <CheckoutSuccessMessage />;
}

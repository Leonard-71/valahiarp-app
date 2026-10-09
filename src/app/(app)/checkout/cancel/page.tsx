import { Metadata } from "next";

import { CheckoutErrorMessage } from "@/components/custom/checkout-error";

export const metadata: Metadata = {
  title: "Anulat",
  description: "Anulat",
};

export default function Cancel() {
  return <CheckoutErrorMessage />;
}

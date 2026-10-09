type ManualAddressFields = {
  street?: string | null;
  locality: string;
  county: string;
  country?: string;
};

export function formatManualAddress(
  address: ManualAddressFields | null | undefined,
) {
  if (!address) {
    return "";
  }

  return [address.street, address.locality, address.county, address.country]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(", ");
}

export function stripeAddressFromManual(
  address: ManualAddressFields | null | undefined,
) {
  if (!address) {
    return {
      line1: "",
      city: "",
      state: "",
      country: "",
      postal_code: "",
    };
  }

  return {
    line1: address.street?.trim() || address.locality,
    city: address.locality,
    state: address.county,
    country: "RO",
    postal_code: "",
  };
}

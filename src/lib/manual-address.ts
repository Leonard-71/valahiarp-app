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

  const parts = [
    address.country?.trim() ? `Țară: ${address.country.trim()}` : null,
    address.county?.trim() ? `Județ: ${address.county.trim()}` : null,
    address.locality?.trim() ? `Localitate: ${address.locality.trim()}` : null,
  ].filter(Boolean);

  return parts.join(", ");
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

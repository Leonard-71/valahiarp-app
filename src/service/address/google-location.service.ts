import { GooglePlaceDetails, SingleAddressResponseDto } from "@/types/address";
import { Reason, ResponseDto } from "@/types/utils";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_PLACES_URL = process.env.GOOGLE_PLACES_URL;

const findGoogleLocationByQuery = async (
  query: string,
): Promise<ResponseDto<SingleAddressResponseDto | null>> => {
  if (!GOOGLE_API_KEY || !GOOGLE_PLACES_URL) {
    return {
      data: null,
      error: {
        message: "Missing Google API config",
        reason: Reason.EXTERNAL_API_ERROR,
      },
    };
  }

  // Check if billing is enabled
  if (process.env.NODE_ENV === 'production' && !process.env.GOOGLE_BILLING_ENABLED) {
    return {
      data: null,
      error: {
        message: "Google Places API requires billing to be enabled",
        reason: Reason.EXTERNAL_API_ERROR,
      },
    };
  }

  try {
    const placeId = await getPlaceIdFromGoogle(query);
    if (!placeId) {
      return {
        data: null,
        error: {
          message: "Could not resolve placeId from Google",
          reason: Reason.EXTERNAL_API_ERROR,
        },
      };
    }

    const details = await getPlaceDetailsFromGoogle(placeId);

    if (!details) {
      return {
        data: null,
        error: null,
      };
    }

    const address = mapGoogleDetailsToAddress(placeId, details);
    return { data: address, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : "Google API error",
        reason: Reason.EXTERNAL_API_ERROR,
      },
    };
  }
};

const findGoogleLocationByPlaceId = async (
  placeId: string,
): Promise<ResponseDto<SingleAddressResponseDto | null>> => {
  if (!GOOGLE_API_KEY || !GOOGLE_PLACES_URL) {
    return {
      data: null,
      error: {
        message: "Missing Google API config",
        reason: Reason.EXTERNAL_API_ERROR,
      },
    };
  }

  try {
    const details = await getPlaceDetailsFromGoogle(placeId);

    if (!details) {
      return {
        data: null,
        error: null,
      };
    }

    const address = mapGoogleDetailsToAddress(placeId, details);
    return { data: address, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : "Google API error",
        reason: Reason.EXTERNAL_API_ERROR,
      },
    };
  }
};

const getPlaceIdFromGoogle = async (query: string): Promise<string | null> => {
  const res = await fetch(
    `${GOOGLE_PLACES_URL}/json?input=${encodeURIComponent(
      query,
    )}&types=geocode&language=ro&components=country:ro&key=${GOOGLE_API_KEY}`,
  );
  const json = await res.json();
  return json.predictions?.[0]?.place_id ?? null;
};

const getPlaceDetailsFromGoogle = async (
  placeId: string,
): Promise<GooglePlaceDetails | null> => {
  const res = await fetch(
    `${GOOGLE_PLACES_URL}/details/json?place_id=${placeId}&fields=formatted_address,address_components,geometry&language=ro&key=${GOOGLE_API_KEY}`,
  );
  const json = await res.json();
  return json.result ?? null;
};

const findAddressComponentLongName = (
  details: GooglePlaceDetails,
  ...types: string[]
): string => {
  return (
    details.address_components.find((c) =>
      types.some((t) => c.types.includes(t)),
    )?.long_name ?? ""
  );
};

const mapGoogleDetailsToAddress = (
  placeId: string,
  details: GooglePlaceDetails,
): SingleAddressResponseDto => ({
  placeId,
  displayName: details.formatted_address,
  street: [
    findAddressComponentLongName(details, "route"),
    findAddressComponentLongName(details, "street_number"),
  ]
    .filter(Boolean)
    .join(" "),
  city: findAddressComponentLongName(
    details,
    "locality",
    "administrative_area_level_2",
  ),
  county: findAddressComponentLongName(details, "administrative_area_level_1"),
  postalCode: findAddressComponentLongName(details, "postal_code"),
  country: findAddressComponentLongName(details, "country"),
  latitude: details.geometry.location.lat,
  longitude: details.geometry.location.lng,
  createdAt: new Date(),
  updatedAt: new Date(),
});

export { findGoogleLocationByQuery, findGoogleLocationByPlaceId };

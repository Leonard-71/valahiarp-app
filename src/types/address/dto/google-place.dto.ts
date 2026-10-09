export type GoogleAddressComponent = {
  long_name: string;
  types: string[];
};

export type GooglePlaceDetails = {
  formatted_address: string;
  address_components: GoogleAddressComponent[];
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
};

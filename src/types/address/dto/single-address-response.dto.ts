export type SingleAddressResponseDto = {
  placeId: string;
  displayName: string;
  street: string;
  city: string;
  county: string;
  postalCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
  createdAt: Date;
  updatedAt: Date;
};

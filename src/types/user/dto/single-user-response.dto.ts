import { Prisma } from "@/generated/prisma";

type BasicUserResponseDto = Prisma.UserGetPayload<{
  include: {
    address: true;
  };
}>;

type AddressWithNumericCoords = Omit<
  NonNullable<BasicUserResponseDto["address"]>,
  "latitude" | "longitude"
> & {
  latitude: number | null;
  longitude: number | null;
};

type SingleUserResponseDto = Omit<BasicUserResponseDto, "address"> & {
  address: AddressWithNumericCoords | null;
};

export type { SingleUserResponseDto, BasicUserResponseDto };

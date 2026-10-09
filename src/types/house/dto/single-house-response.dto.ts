import { Prisma } from "@/generated/prisma";

type HousePayload = Prisma.HouseGetPayload<{
  include: {
    createdBy: true;
    archivedBy: true;
  };
}>;

type SingleHouseResponseDto = Omit<HousePayload, "taxPrice" | "price"> & {
  taxPrice: number;
  price: number;
};

export type { SingleHouseResponseDto, HousePayload };

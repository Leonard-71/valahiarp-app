import { Prisma } from "@/generated/prisma";

type BasicUserResponseDto = Prisma.UserGetPayload<{
  include: {
    manualAddress: true;
  };
}>;

type SingleUserResponseDto = BasicUserResponseDto;

export type { SingleUserResponseDto, BasicUserResponseDto };

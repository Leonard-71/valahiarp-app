import { UserRole } from "@/generated/prisma";

type UpdateUserInput = {
  name: string;
  addressId: string;
  username: string;
};

type UpdateUserByAdminInput = {
  email: string;
  name: string;
  addressId: string;
  username: string;
  role: UserRole;
};

type UserTooManyRequestsInput = {
  addressAttempts: number;
  addressBlockedUntil?: Date | null;
};

export type {
  UpdateUserInput,
  UpdateUserByAdminInput,
  UserTooManyRequestsInput,
};

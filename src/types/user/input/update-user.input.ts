import { UserRole } from "@/generated/prisma";

type UpdateUserInput = {
  name: string;
  phone: string;
  email: string;
  country: string;
  county: string;
  locality: string;
  street?: string;
};

type UpdateUserByAdminInput = {
  email: string;
  name: string;
  username: string;
  role: UserRole;
};

export type { UpdateUserInput, UpdateUserByAdminInput };

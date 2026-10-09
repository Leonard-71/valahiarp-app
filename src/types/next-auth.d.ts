import { type DefaultSession } from "next-auth";

import { UsersRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      role: UsersRole;
    } & DefaultSession["user"];
  }
}

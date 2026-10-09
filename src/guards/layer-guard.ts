"use server";

import { redirect, RedirectType } from "next/navigation";

import { auth } from "@/auth";
import { UserRole } from "@/generated/prisma";
import {
  LayoutComponentDto,
  PageComponentDto,
  ServerComponentDto,
} from "@/types/utils";

function layerGuard<T extends PageComponentDto>(
  Component: ServerComponentDto<T>,
  roles: UserRole[],
): ServerComponentDto<T>;
function layerGuard<T extends LayoutComponentDto>(
  Component: ServerComponentDto<T>,
  roles: UserRole[],
): ServerComponentDto<T>;
function layerGuard<T extends PageComponentDto | LayoutComponentDto>(
  Component: ServerComponentDto<T>,
  roles: UserRole[] = [],
): ServerComponentDto<T> {
  return async function Wrapper(props: T) {
    const session = await auth();

    if (!session?.user) {
      redirect("/", RedirectType.replace);
    }

    if (roles.length > 0 && !roles.includes(session.user.role)) {
      redirect("/", RedirectType.replace);
    }

    return Component(props);
  };
}

export { layerGuard };

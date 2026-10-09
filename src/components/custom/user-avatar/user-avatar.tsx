"use client";

import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { History, LogOut, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  className?: string;
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export function UserAvatar({
  className,
  isMobile = false,
  onLinkClick,
}: UserAvatarProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  if (!session?.user) {
    return null;
  }

  const { user } = session;
  const displayName = user.name || user.email!;
  const initials = displayName[0];

  const goTo = (href: string) => {
    router.push(href);
    onLinkClick?.();
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
    onLinkClick?.();
  };

  if (isMobile) {
    return (
      <div
        className={cn("flex w-full flex-col items-center gap-3 p-4", className)}
      >
        <Button
          onClick={() => goTo("/profile")}
          variant={pathname === "/profile" ? "default" : "secondary"}
          size="lg"
          className="w-full"
        >
          <User className="h-4 w-4" />
          Informații personale
        </Button>

        <Button
          onClick={() => goTo("/profile/history")}
          variant={pathname === "/profile/history" ? "default" : "secondary"}
          size="lg"
          className="w-full"
        >
          <History className="h-4 w-4" />
          Istoric achiziții
        </Button>

        <Button
          onClick={handleSignOut}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          <LogOut className="h-4 w-4" />
          Deconectează-te
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-3 p-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.image || undefined} alt={displayName} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{displayName}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => goTo("/profile")}>
            <User className="mr-2 h-4 w-4" />
            <span>Informații personale</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => goTo("/profile/history")}>
            <History className="mr-2 h-4 w-4" />
            <span>Istoric achiziții</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Deconectează-te</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

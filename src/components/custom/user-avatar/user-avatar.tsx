"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LogOut, User } from "lucide-react";

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

  if (!session?.user) {
    return null;
  }

  const { user } = session;
  const displayName = user.name || user.email!;
  const initials = displayName[0];

  const handleProfileClick = () => {
    router.push("/profile");
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
          onClick={handleProfileClick}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          <User className="h-4 w-4" />
          Profil
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
          <DropdownMenuItem onClick={handleProfileClick}>
            <User className="mr-2 h-4 w-4" />
            <span>Profil</span>
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

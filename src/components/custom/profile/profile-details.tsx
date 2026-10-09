"use client";

import { AtSign, Mail, MapPin, Phone, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SingleUserResponseDto } from "@/types/user";
import { formatManualAddress } from "@/lib/manual-address";

interface ProfileDetailsProps {
  user: SingleUserResponseDto;
}

export function ProfileDetails({ user }: ProfileDetailsProps) {
  const displayName = user.name || "-";
  const displayAddress = formatManualAddress(user.manualAddress) || "-";

  const initials = displayName[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.imageUrl || undefined} alt={displayName} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          Informații personale
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            <User className="size-4" />
            Nume complet
          </span>
          <span className="text-sm">{displayName}</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            <Phone className="size-4" />
            Telefon
          </span>
          <span className="text-sm">{user.phone || "Nu este specificat"}</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            <AtSign className="size-4" />
            Nickname
          </span>
          <span className="text-sm">
            {user.username || "Nu este specificat"}
          </span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            <Mail className="size-4" />
            Email
          </span>
          <span className="text-sm">{user.email}</span>
        </div>
        <Separator />
        <div className="flex items-start justify-between">
          <span className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            <MapPin className="size-4" />
            Adresă
          </span>
          <span className="max-w-[200px] text-right text-sm">
            {displayAddress}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

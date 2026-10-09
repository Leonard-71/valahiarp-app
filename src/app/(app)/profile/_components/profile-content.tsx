"use client";

import { useState } from "react";

import { ProfileDetails } from "@/components/custom/profile";
import { Button } from "@/components/ui/button";
import { SingleUserResponseDto } from "@/types/user";

import { DeleteAccount } from "./delete-account";
import { ProfileForm } from "./profile-form";
import { ProfileIncompleteWarning } from "./profile-incomplete-warning";

export function ProfileContent({ user }: { user: SingleUserResponseDto }) {
  const [userState, setUserState] = useState(user);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className="space-y-6">
      <ProfileIncompleteWarning user={userState} />

      <ProfileDetails user={userState} />

      <div className="mt-2 flex justify-between gap-2">
        <DeleteAccount />
        <Button onClick={handleOpen}>Editează profilul</Button>
      </div>

      <ProfileForm
        user={userState}
        setUserForm={setUserState}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}

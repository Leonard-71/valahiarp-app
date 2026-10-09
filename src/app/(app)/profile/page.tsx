import { auth } from "@/auth";
import { ErrorComponent } from "@/components/custom";
import { findUserById } from "@/controller/user";
import { layerGuard } from "@/guards";

import { ProfileContent } from "./_components/profile-content";

export default layerGuard(async function ProfilePage() {
  const session = await auth();
  const { data, error } = await findUserById(session!.user.id!);

  if (!data) {
    return <ErrorComponent error={error} className="m-6" />;
  }

  return <ProfileContent user={data} />;
}, []);

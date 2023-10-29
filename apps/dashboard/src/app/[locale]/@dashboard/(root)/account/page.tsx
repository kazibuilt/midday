import { DeleteAccount } from "@/components/delete-account";
import { DisplayName } from "@/components/display-name";
import { UserAvatar } from "@/components/user-avatar";
import { getUserDetails } from "@midday/supabase/queries";
import { createClient } from "@midday/supabase/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Settings | Midday",
};

export default async function Account() {
  const supabase = createClient();
  const { data: userData } = await getUserDetails(supabase);

  return (
    <div className="flex flex-col space-y-12">
      <UserAvatar
        userId={userData.id}
        fullName={userData.full_name}
        avatarUrl={userData?.avatar_url}
      />
      <DisplayName fullName={userData.full_name} />
      <DeleteAccount />
    </div>
  );
}
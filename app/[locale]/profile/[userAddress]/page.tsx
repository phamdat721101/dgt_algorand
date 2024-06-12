"use client";
import ProfileContainer from "@/components/Profile";
import Copy from "@/icons/Copy";
import Discord from "@/icons/Discord";
import ExternalLink from "@/icons/ExternalLink";
import Info from "@/icons/Info";
import Telegram from "@/icons/Telegram";
import TwitterWithoutTitle from "@/icons/TwitterWithoutTitle";
import X from "@/icons/X";
import React from "react";

// type TProfileProps = {
//   params: { userAddress: string };
// };

const fetchProfile = async () => {
  const response = await fetch(
    "https://dgt-dev.vercel.app/v1/user?user_id=user_v1"
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
};

// async function Profile(props: TProfileProps) {
async function Profile() {
  const profile = await fetchProfile();

  if (!profile || Object.keys(profile).length === 0) {
    return <div>User not found</div>;
  }

  return (
      <div>
        <ProfileContainer
          name={profile.name}
          holdingAmount={profile.holding_amount}
          managedAmount={profile.managed_amount}
          description={profile.des}
          wallet={profile.wallet}
          logoUrl={profile.logo_url}
          vaults={profile.vaults}
          dgtAmount={profile.dgt_amount}
        />
      </div>
  );
}

export default Profile;

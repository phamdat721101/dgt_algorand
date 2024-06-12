"use client";
import dynamic from "next/dynamic";

const ProfileChild = dynamic(() => import("@/components/Profile/index"), {
  ssr: false,
});

const fetchProfile = async () => {
  const response = await fetch("https://dgt-dev.vercel.app/v1/user?adr=0x132");

  if (!response.ok) {
    return null;
  }

  return response.json();
};

export default async function profile() {
  const profile = await fetchProfile();

  if (!profile || Object.keys(profile).length === 0) {
    return <div>User not found</div>;
  }
  return (
    <main className="overflow-hidden flex flex-col min-h-screen">
      <div className="container mx-auto px-4">
        <ProfileChild
          name={profile.name}
          holdingAmount={profile.holding_amount}
          managedAmount={profile.managed_amount}
          description={profile.des}
          wallet={profile.wallet}
          logoUrl={profile.logo_url}
          adrUrl={profile.adr_url}
          vaults={profile.vaults}
          dgtAmount={profile.dgt_amount}
          
        ></ProfileChild>
      </div>
    </main>
  );
}

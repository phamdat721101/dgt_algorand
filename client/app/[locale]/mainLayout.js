"use client";
import React from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import ProfileHeader from "@/components/Profile/ProfileHeader/ProfileHeaderGM";
import Header from "@/components/LandingPage/HomeHeader";

const HomeHeader = dynamic(
  () => import("@/components/HomePage/Layout/HomeHeader"),
  {
    ssr: false,
  }
);

const MainLayout = () => {
  const pathname = usePathname().replace("/", "");
  return (
    <>
      {pathname != "" && pathname == "home" && (
        <ProfileHeader isHome={true}></ProfileHeader>
      )}
      {pathname != "" && pathname != "home" && (
        <ProfileHeader isHome={false}></ProfileHeader>
      )}
      {pathname == "" && <Header></Header>}
    </>
  );
};
export default MainLayout;

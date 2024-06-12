"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import detailBg from "@/assets/images/bg-detail.svg";
import useTab from "@/components/Tabbar/useTab";
import TabDetails from "./TabDetails";
import DepositWithdraw from "./DepositWithdraw";
import PieChart from "@/components/Chart/PieChart/PieChart";
import usdc from "@/assets/images/crypto/usdc.svg";
import btc from "@/assets/images/crypto/bitcoin.svg";

// const Allocations = dynamic(
//   () => import("@/components/DetailsPage/Allocations"),
//   {
//     ssr: false,
//   }
// );

const Info = dynamic(() => import("@/components/DetailsPage/Info"), {
  ssr: false,
});

const Overview = dynamic(() => import("@/components/DetailsPage/OverviewGM"), {
  ssr: false,
});

// const MorePools = dynamic(() => import("@/components/DetailsPage/MorePools"), {
//   ssr: false,
// });

export default function DetailsPage() {
  return (
    <>
      <Info />
      <main className="px-5 sm:px-[50px] lg:px-[90px] pb-12 sm:pb-24">
        <Overview />
      </main>
    </>
  );
}

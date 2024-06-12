"use client";
import dynamic from "next/dynamic";
import { WalletKitProvider } from "@mysten/wallet-kit";
import LayoutSecond from "@/components/DetailsPage/LayoutSecond";
import HistoryPage from "@/components/HistoryPage/HistoryPage";

export default function Details() {
  return (
    // <WalletKitProvider>
    //   <LayoutSecond>
        <HistoryPage />
    //   </LayoutSecond>
    // </WalletKitProvider>
  );
}

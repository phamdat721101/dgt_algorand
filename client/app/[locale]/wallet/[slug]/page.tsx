"use client"

import { Header, Footer, SuiWallet, DigiTrustWallet } from '@/components'
import LayoutSecond from '@/components/Details/LayoutSecond';
import { WalletKitProvider } from "@mysten/wallet-kit";


export default function Page({ params }: { params: { slug: string } }) {

  return (
    // <WalletKitProvider>
    //     <LayoutSecond>
            <DigiTrustWallet/>
    //     </LayoutSecond>
    // </WalletKitProvider>
  );
}

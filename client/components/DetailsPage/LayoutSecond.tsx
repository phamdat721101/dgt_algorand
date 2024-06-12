import Footer from "@/components/LandingPage/Footer";
import HeaderSecond from "@/components/Details/HeaderSecond";
import { WalletKitProvider } from "@mysten/wallet-kit";

export default function LayoutSecond({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <WalletKitProvider>
      <div className="bg-[#FAFBFF]">
        <HeaderSecond></HeaderSecond>
        {children}
        <Footer></Footer>
      </div>
    </WalletKitProvider>
  );
}

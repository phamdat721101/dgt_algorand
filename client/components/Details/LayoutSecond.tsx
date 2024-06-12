import Footer from "./Footer";
import HeaderSecond from "./HeaderSecond";
import { WalletKitProvider } from "@mysten/wallet-kit";

export default function LayoutSecond({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <WalletKitProvider>
            <div>
                <HeaderSecond></HeaderSecond>
                {children}
                <Footer></Footer>
            </div>
        </WalletKitProvider>
    );
}

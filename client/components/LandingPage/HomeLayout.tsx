import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <HomeHeader />
      {children}
      <HomeFooter />
    </div>
  );
}

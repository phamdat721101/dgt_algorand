import TopVaults from "./Vaults/TopVaults";
import VaultsList from "./Vaults/VaultsList";

export default function Vaults() {
  return (
    <section className="py-8 sm:py-[70px] ">
      <div className="w-[85%] mx-[auto] my-[0]">
        {/* Top TVL Vaults */}
        {/* <TopVaults /> */}

        {/* All Vaults */}
        <VaultsList />
      </div>
    </section>
  );
}

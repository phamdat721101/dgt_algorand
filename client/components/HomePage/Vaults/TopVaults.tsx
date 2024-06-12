import TopVault from "./TopVault";

const TopVaults = () => {
  return (
    <div className="pt-3.5 pb-2">
      <div className="flex justify-between">
        <h1 className="font-semibold text-[#2563EB] text-[36px] leading-[32px]">
          Top TVL Vaults
        </h1>
        <div className="p-1 h-12 flex items-center bg-[#E0E9F4] text-[#90A3BF] rounded-xl">
          <button className="h-full px-[30px] rounded-lg flex items-center justify-center hover:bg-white hover:text-[#2563EB]">
            Top TVL
          </button>
          <button className="h-full px-[30px] rounded-lg flex items-center justify-center hover:bg-white hover:text-[#2563EB]">
            New
          </button>
          <button className="h-full px-[30px] rounded-lg flex items-center justify-center hover:bg-white hover:text-[#2563EB]">
            Top Performance
          </button>
        </div>
      </div>
      {/* List Vaults */}
      <div className="flex justify-between mt-10">
        <TopVault />
        <TopVault />
        <TopVault />
        <TopVault />
      </div>
    </div>
  );
};

export default TopVaults;

import React, { useEffect, useState } from "react";
import Image from "next/image";

import btc from "@/assets/images/crypto/bitcoin.svg";
import PieChart from "@/components/Chart/PieChart/PieChart";
import usdc from "@/assets/images/crypto/usdc.svg";
import { useWalletKit } from "@mysten/wallet-kit";
import DepositWithdraw from "./DepositWithdraw";

interface Asset {
  asset: string;
  symbol: string;
  contract: string;
  chain: string;
  invest_amount: number;
  weight: string;
  holding: string;
  price_change: {
    "24h": string;
  };
  dgt_score: number;
  status: boolean;
}

const Allocations = () => {
  // const { currentAccount } = useWalletKit();
  let assets: Asset[];

  const [dataDetails, setDataDetails] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  // Call Api
  useEffect(() => {
    const fetchDataDetails = async () => {
      setIsLoading(true);
      // Api Default
      const response = await fetch(
        "https://dgt-dev.vercel.app/v1/vault_allocation?vault_id=dgt1"
      );
      const data = await response.json();

      setDataDetails(data);
      setIsLoading(false);
    };

    fetchDataDetails();
  }, []);
  // End call api

  assets = dataDetails?.assets || [];

  return (
    <>
      <div className="mt-11 mb-32">
        <div className="flex justify-between">
          <div className="w-[67%] h-[297px] bg-white border border-[#C3D4E9] rounded-[10px]">
            <div className="w-full h-full flex items-start">
              <div className="relative w-[42%]">
                <div className="absolute top-[34px] left-[55px]">
                  <PieChart />
                </div>
                <div className="absolute top-[110px] left-[123px] ">
                  <div className="flex gap-3 justify-center">
                    <Image width={24} height={24} src={usdc} alt="usdc" />
                    <span className="font-semibold text-[#90A3BF] leading-normal">
                      AAVE
                    </span>
                  </div>
                  <div className="font-semibold text-[32px] leading-normal tracking-tighter">
                    39.11%
                  </div>
                </div>
              </div>
              <div className="w-[58%] pt-11">
                <div className="flex gap-3">
                  <Image width={24} height={24} src={usdc} alt="usdc" />
                  <span className="font-semibold text-[#90A3BF] leading-normal">
                    AAVE
                  </span>
                </div>
                <h3 className="pt-4 pb-3 font-normal text-gray-800 leading-7">
                  HOLDING
                </h3>
                <p className="text-gray-800 font-semibold text-3xl leading-7">
                  $436.89
                </p>
                <h3 className="pt-[34px] pb-3 font-normal text-gray-800 leading-7">
                  PRICE 24H
                </h3>
                <div className="flex items-end gap-[5px]">
                  <p className="text-gray-800 font-semibold text-3xl leading-7">
                    $3.95
                  </p>
                  <div className="flex items-center text-green-500 text-xs font-normal leading-normal">
                    <span className="">2.44%</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.0496 3.35769C4.94405 3.46323 4.8794 3.6099 4.87961 3.77097L4.87961 3.84187C4.87961 4.16443 5.14074 4.42555 5.46288 4.42514L8.64993 4.42514L3.2587 9.81637C3.03101 10.0441 3.03101 10.4136 3.2587 10.6413C3.48639 10.869 3.85597 10.869 4.08366 10.6413L9.47488 5.2501L9.47488 8.43714C9.47488 8.7597 9.73601 9.02083 10.0582 9.02041L10.129 9.02041C10.4516 9.02041 10.7127 8.75929 10.7123 8.43714L10.7123 3.77097C10.7123 3.44842 10.4512 3.18729 10.129 3.1877L5.46288 3.1877C5.3016 3.1877 5.15514 3.25215 5.0496 3.35769Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <table className="w-full mt-11 bg-white text-left border border-[#C3D4E9]">
              <thead>
                <tr className="border-b border-b-[#C3D4E9] text-gray-800 font-semibold leading-normal">
                  <th className="w-[30%] pl-6 py-6">Asset</th>
                  <th className="w-[30%] py-6">Weight</th>
                  <th className="w-[30%] py-6">Holding</th>
                  <th className="w-[10%] pr-6 py-6">Price 24h</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr className="text-center text-sm font-medium leading-4 text-gray-300">
                    <td colSpan={4} className="p-4">
                      Loading...
                    </td>
                  </tr>
                )}
                {!isLoading &&
                  assets.map((asset) => (
                    <tr className="border-b border-b-[#C3D4E9] text-gray-800 font-medium leading-normal">
                      <td className="w-[30%] h-12 pl-6 py-6">
                        <div className="flex items-center ">
                          <Image className="w-8	h-8" src={btc} alt="bitcoin" />
                          <span className="ml-4">{asset.symbol}</span>
                        </div>
                      </td>
                      <td className="w-[30%] h-12 py-6">
                        {true ? asset.weight : "--"}
                      </td>
                      <td className="w-[30%] h-12 py-6">
                        {true ? asset.holding : "--"}
                      </td>
                      <td className="w-[10%] h-12 pr-6 py-[18px]">
                        <div>$ 6.35</div>
                        <div className="text-green-500">5.50%</div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="w-[30%]">
            <DepositWithdraw />
          </div>
        </div>
      </div>
    </>
  );
};

export default Allocations;

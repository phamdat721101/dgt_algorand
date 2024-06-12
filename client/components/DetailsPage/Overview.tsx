"use client";
import { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { useWalletKit } from "@mysten/wallet-kit";
import DepositWithdraw from "./DepositWithdraw";

export default function Overview() {
  // Call Api
  const [dataDetails, setDataDetails] = useState<any[]>([]);
  // const { signAndExecuteTransactionBlock } = useWalletKit();

  useEffect(() => {
    const fetchDataDetails = async () => {
      // Api Default
      const response = await fetch(
        "https://dgt-dev.vercel.app/v1/vault_detail?vault_id=dgt1&fbclid=IwAR1Z7yE9yIjhcbPds_6_CSr-R487BHzqDiy4SufmyRmozuLmXnN2SJp_S94"
      );
      const data = await response.json();

      setDataDetails(data);
    };

    fetchDataDetails();
  }, []);
  // End call api

  // Chart
  const [chartOptions, setchartOptions] = useState({
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
      tools: {
        zoom: {
          enabled: false,
        },
      },
    },

    stroke: {
      curve: "smooth",
    },

    series: [
      {
        name: "Number",
        data: [19000, 20000, 22750, 21500, 23000],
      },
    ],

    xaxis: {
      categories: ["Dec 5", "Dec 6", "Dec 7", "Dec 8", "Dec 9"],
      lines: {
        show: false,
      },
      labels: {
        show: true,
        style: {
          fontSize: "16px",
          fontWeight: 500,
        },
      },
    },

    yaxis: {
      labels: {
        show: true,
        style: {
          fontSize: "16px",
          fontWeight: 500,
        },
      },

      lines: {
        show: false,
      },

      stepSize: 1000,
    },

    grid: {
      show: true,
      padding: {
        left: 80,
      },
    },

    dataLabels: {
      enabled: false,
    },

    tooltip: {
      enabled: true,
    },

    colors: ["#4F46E5"],
  });

  useEffect(() => {
    const chartDetails = new ApexCharts(
      document.querySelector("#line-chart"),
      chartOptions
    );

    chartDetails.render();
    return () => {
      chartDetails.destroy();
    };
  }, []);
  // End chart

  // Depost/ Withdraw
  // async function withdraw(event: any) {
  //   event.preventDefault();

  //   const client = new SuiClient({ url: getFullnodeUrl("testnet") });
  //   const txb = new TransactionBlock();
  //   const contractAddress =
  //     "0xe733afcdbcd61f8a795342dfb3cf4ea8977b3426a0f1df7a2bd3c50d23d1c99c";
  //   const contractModule = "dgt";
  //   const contractMethod = "mint";
  //   txb.moveCall({
  //     target: `${contractAddress}::${contractModule}::${contractMethod}`,
  //     arguments: [
  //       txb.object(
  //         "0x6109f11f58aad51a7f1ac9943a04d73b937ba6aca92287ff5e2e3f967d945ae7"
  //       ),
  //       txb.pure(130624111306),
  //       txb.object(
  //         "0x4cc7eac61ace69d47b64b974b15d3dee7277e34abc57de69228106e393418dcd"
  //       ),
  //     ],
  //   });

  //   await signAndExecuteTransactionBlock({
  //     transactionBlock: txb as any,
  //   });
  // }

  // async function deposit_base(event: any) {
  //   event.preventDefault();

  //   const client = new SuiClient({ url: getFullnodeUrl("testnet") });
  //   const txb = new TransactionBlock();
  //   const contractAddress =
  //     "0xe733afcdbcd61f8a795342dfb3cf4ea8977b3426a0f1df7a2bd3c50d23d1c99c";
  //   const contractModule = "book";
  //   const contractMethod = "make_base_deposit";
  //   txb.moveCall({
  //     target: `${contractAddress}::${contractModule}::${contractMethod}`,
  //     arguments: [
  //       txb.object(
  //         "0xfd0debf5753bae5ac2975d21e57a27bb6a86f6cf6c4e5eb411e205c383f83a02"
  //       ),
  //       txb.pure(
  //         "0x016b9a6e8e171665973eff12f701058ddb37c2dcaaf0e9616949b82d88521453"
  //       ),
  //       txb.object(
  //         "0xca9f8d3697a2a33291cfa6ea0d2f58afa873d7533f5b49d73caa962d77c1a260"
  //       ),
  //     ],
  //     typeArguments: [
  //       "0x2::sui::SUI", //QUOTE_COIN_TYPE,
  //       "0xe733afcdbcd61f8a795342dfb3cf4ea8977b3426a0f1df7a2bd3c50d23d1c99c::dgt::DGT", //BASE_COIN_TYPE
  //     ],
  //   });

  //   await signAndExecuteTransactionBlock({
  //     transactionBlock: txb as any,
  //   });
  // }

  return (
    <>
      <div className="mt-11 ">
        <div className="flex justify-between">
          <div className="w-[67%] h-full ">
            {/* Balance */}
            <div className="grid grid-cols-4 gap-x-4">
              <div className="space-y-3 rounded-xl border border-gray-45 bg-white px-6 py-4 backdrop-blur-lg">
                <div className="text-base font-medium leading-7 text-gray-800">
                  Price
                </div>
                {dataDetails.map((data) => (
                  <div
                    key={data.vault_id}
                    className="flex items-center text-3xl font-semibold leading-7 text-gray-800"
                  >
                    <span>{data.currency}</span>
                    <p>{data.price}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 rounded-xl border border-gray-45 bg-white px-6 py-4 backdrop-blur-lg">
                <div className="text-base font-medium leading-7 text-gray-800">
                  TVL
                </div>
                {dataDetails.map((data) => (
                  <div
                    key={data.vault_id}
                    className="flex items-center text-3xl font-semibold leading-7 text-gray-800"
                  >
                    <span>{data.currency}</span>
                    <p>{data.tvl}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 rounded-xl border border-gray-45 bg-white px-6 py-4 backdrop-blur-lg">
                <div className="text-base font-medium leading-7 text-gray-800">
                  Volume
                </div>
                {dataDetails.map((data) => (
                  <div
                    key={data.vault_id}
                    className="flex items-center text-3xl font-semibold leading-7 text-gray-800"
                  >
                    <span>{data.currency}</span>
                    <p>{data.volume}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 rounded-xl border border-gray-45 bg-white px-6 py-4 backdrop-blur-lg">
                <div className="text-base font-medium leading-7 text-gray-800">
                  Return
                </div>
                {dataDetails.map((data) => (
                  <div
                    key={data.vault_id}
                    className="flex items-center text-3xl font-semibold leading-7 text-gray-800"
                  >
                    <span>{data.currency}</span>
                    <p>{data.return}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Charts */}
            <div className="my-[23px] space-y-8 rounded-lg border border-gray-100 bg-white py-8 shadow-chart">
              {/* Information */}
              <div className="flex items-center justify-between px-8">
                <div className="space-y-2">
                  {dataDetails.map((data) => (
                    <div
                      key={data.vault_id}
                      className="flex text-2xl font-semibold text-gray-800"
                    >
                      <span>{data.currency}</span>
                      <p>{data.price}</p>
                    </div>
                  ))}

                  <div className=" text-xs tracking-wider text-gray-800">
                    16:00 - 9 Dec, 2023
                  </div>
                </div>

                <div className="flex items-center gap-x-3">
                  <button className="rounded-lg bg-blue-100 px-3 py-0.5 uppercase text-blue-600">
                    1H
                  </button>
                  <button className="rounded-lg bg-gray-50 px-3 py-0.5 uppercase text-gray-800">
                    3H
                  </button>
                  <button className="rounded-lg bg-gray-50 px-3 py-0.5 uppercase text-gray-800">
                    5H
                  </button>
                  <button className="rounded-lg bg-gray-50 px-3 py-0.5 uppercase text-gray-800">
                    1D
                  </button>
                  <button className="rounded-lg bg-gray-50 px-3 py-0.5 uppercase text-gray-800">
                    1W
                  </button>
                  <button className="rounded-lg bg-gray-50 px-3 py-0.5 uppercase text-gray-800">
                    1M
                  </button>
                </div>
              </div>

              <div className="px-5">
                <div id="line-chart"></div>
              </div>
            </div>

            {/* TVL */}
            <div className="rounded-lg border border-gray-100 bg-white shadow-chart">
              <div className="flex items-center justify-between border-b border-gray-200 p-6">
                <div className="text-base font-semibold -tracking-[0.16px]">
                  1 Week
                </div>
                <div className="text-base font-semibold -tracking-[0.16px]">
                  1 Day
                </div>
                <div className="text-base font-semibold -tracking-[0.16px]">
                  1 Month
                </div>
                <div className="text-base font-semibold -tracking-[0.16px]">
                  3 Months
                </div>
                <div className="text-base font-semibold -tracking-[0.16px]">
                  1 Year
                </div>
              </div>

              <div className="flex items-center justify-between p-6">
                <div className="text-base -tracking-[0.16px] text-red-500">
                  -1,57%
                </div>
                <div className="text-base -tracking-[0.16px] text-green-500">
                  24,32%
                </div>
                <div className="text-base -tracking-[0.16px] text-green-500">
                  34,32%
                </div>
                <div className="text-base -tracking-[0.16px] text-green-500">
                  44,32%
                </div>
                <div className="text-base -tracking-[0.16px] text-green-500">
                  54,32%
                </div>
              </div>
            </div>
          </div>
          <div className="w-[30%] h-[297px] rounded-[10px]">
            <DepositWithdraw />
          </div>
        </div>
        {/* Token Description */}
        <div className="space-y-6 pt-[38px]">
          <div className="flex w-fit items-center gap-x-[10px] border-b-2 border-blue-600 pb-2 font-semibold text-blue-600">
            <div>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.78125 17.875V11.6875H8.59375"
                  stroke="#3461FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.5938 17.875H2.40625"
                  stroke="#3461FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.59375 17.875V7.5625H13.4062"
                  stroke="#3461FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.2188 3.4375H13.4062V17.875H18.2188V3.4375Z"
                  stroke="#3461FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>Token Description</div>
          </div>

          <p className="text-base leading-[150%] -tracking-[0.32px] text-gray-800 text-justify">
            The Avalanche Social Index (aHYPE) tracks the performance of a
            portfolio composed of the most socially active cryptocurrencies in
            the last 30 days. This portfolio is weighted according to the social
            score made available by Heimdall and the technology provided by the
            Kassandra Protocol. The portfolio is a SIP (Smart Index Pool) and is
            rebalanced by arbitrageurs just like a usual liquidity pool. The
            index is accompanied by its own token SaHYPE, allowing investors to
            buy the index by purchasing the token, just like an ETF.
          </p>
        </div>
      </div>
    </>
  );
}

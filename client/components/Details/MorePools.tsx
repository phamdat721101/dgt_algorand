"use client";
import { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import Image from "next/image";
import Bitcoind from "../../public/assets/images/bitcoin.png";

export default function MorePools() {
    // Call Api
    const [dataMorePools, setdataMorePools] = useState([]);

    useEffect(() => {
        const fetchMorePools = async () => {
            const response = await fetch(
                "https://dgt-dev.vercel.app/v1/vaults",
            );
            const data = await response.json();

            setdataMorePools(data);
            // Log Data MorePools
            console.log(data);
        };

        fetchMorePools();
    }, []);
    // End call api

    // Chart
    const [chartOptions, setchartOptions] = useState({
        chart: {
            type: "area",
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },

        stroke: {
            curve: "straight",
        },

        series: [
            {
                name: "Number",
                data: [34, 44, 22, 56, 80, 23, 45, 67, 50, 10, 20, 23],
            },
        ],

        xaxis: {
            categories: [],

            labels: {
                show: false,
            },

            gridLines: {
                show: false,
            },
        },

        yaxis: {
            labels: {
                show: false,
            },

            gridLines: {
                show: false,
            },
        },

        grid: {
            show: false,
        },

        dataLabels: {
            enabled: false,
        },

        tooltip: {
            enabled: false,
        },

        colors: ["#FBBF24"],

        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.25,
                opacityTo: 0.9,
                stops: [0, 100],
            },
        },
    });

    useEffect(() => {
        const chartMorePool: any = [];
        dataMorePools.map((data: any) => {
            const chart: any = new ApexCharts(
                document.querySelector(`.line-chart-${data.vault_id}`),
                chartOptions,
            );
            chart.render();
            chartMorePool.push(chart);
        });

        return () => {
            chartMorePool.forEach((chart: any) => {
                chart.destroy();
            });
        };
    }, [dataMorePools, chartOptions]);
    // End chart

    return (
        <div className="bg-[#FAFBFF] pb-24">
            <div className="container mx-auto">
                <h1 className=" py-14 text-center text-4xl font-semibold capitalize leading-[150%] text-blue-600">
                    More Pools
                </h1>
                <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2 lg:grid-cols-4">
                    {dataMorePools.map((data: any) => (
                        <div key={data.vault_id}>
                            <div className="space-y-2 rounded-[10px] border border-gray-45 px-3 py-4 shadow-cardMorePools">
                                <div className="flex justify-between border-b border-gray-300 pb-2">
                                    <Image
                                        className="h-auto w-[50px]"
                                        src={Bitcoind}
                                        alt={"bitcoind"}
                                    ></Image>
                                    <div>
                                        <p className="text-right text-xs text-gray-500">
                                            Price
                                        </p>
                                        <div className="text-right text-2xl font-semibold text-gray-800">
                                            <span>$</span>
                                            {data.return}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-3">
                                    <div className="text-base font-semibold leading-7 text-[#2563EB]">
                                        {data.vault_name}
                                    </div>
                                    <div className="text-xs leading-6 text-gray-500">
                                        By {data.manager}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center text-xl font-medium text-gray-800">
                                            <p>{data.tvl}</p>
                                        </div>
                                        <div className=" text-xs font-normal leading-[160%] text-gray-500">
                                            TVL
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center text-xl font-medium">
                                            <p className="text-green-500">
                                                {data.monthly_return}
                                            </p>
                                        </div>
                                        <div className=" text-xs font-normal leading-[160%] text-gray-500">
                                            MONTHLY
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center text-xl font-medium">
                                            <p className="text-red-500">
                                                {data.daily_return}
                                            </p>
                                        </div>
                                        <div className=" text-xs font-normal leading-[160%] text-gray-500">
                                            24H
                                        </div>
                                    </div>
                                </div>

                                <div className="-ml-4 -mr-2">
                                    <div
                                        className={`line-chart-${data.vault_id}`}
                                    ></div>
                                </div>

                                <div>
                                    <button className="flex w-full items-center justify-center gap-x-2 rounded-lg bg-blue-600 py-3 leading-[150%] -tracking-[0.32px] text-white duration-200 hover:bg-blue-500">
                                        <span>
                                            <svg
                                                width="24"
                                                height="25"
                                                viewBox="0 0 24 25"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M8.0625 10.6219L12 14.5594L15.9375 10.6219"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M8.0625 10.6219L12 14.5594L15.9375 10.6219"
                                                    stroke="white"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M12 4.05945V14.5594"
                                                    stroke="white"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M20.25 14.5594V19.8094C20.25 20.0084 20.171 20.1991 20.0303 20.3398C19.8897 20.4804 19.6989 20.5594 19.5 20.5594H4.5C4.30109 20.5594 4.11032 20.4804 3.96967 20.3398C3.82902 20.1991 3.75 20.0084 3.75 19.8094V14.5594"
                                                    stroke="white"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                        Deposit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

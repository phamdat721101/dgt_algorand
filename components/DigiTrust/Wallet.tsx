"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link'
import axios from "axios";
import { formatAddress } from '@mysten/sui.js/utils';
import { ConnectButton, useWalletKit } from "@mysten/wallet-kit";
interface Transaction {
  tx_hash: string;
  type: string;
  url: string;
  amount: string;
  timestamp: string;
}

async function getTransactions(wallet: string) {
  console.log("PQD checking")
  const response = await axios.get(
    "https://test-vercel-seven-ivory.vercel.app/v1/history?wallet=" + wallet
  );
  return response.data;
}

const Wallet = (wallet:any) => {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
//  const { currentAccount } = useWalletKit();

  // useEffect(() => {
  //   const fetchTransactions = async () => {

  //     const transactions = await getTransactions(wallet.wallet);
  //     // if(transactions){
  //     //   transactions.array.forEach(item => {
  //     //     item.timestamp = new Date (item.timestamp);
  //     //     console.log("Time stamp: ", item.timestamp)
  //     //   });
  //     // }
      
  //     setTransactions(transactions);
  //   };

  //   // fetchTransactions().catch(console.log);
  // }, []);

  return (
    <div>
        <div className="flex flex-col items-center bg-slate-50">
        <div
          className="flex gap-5 pr-20 mt-14 max-w-full text-base font-medium tracking-tight leading-6 border-b border-solid bg-white bg-opacity-0 border-slate-200 text-slate-400 w-[1260px] max-md:flex-wrap max-md:pr-5 max-md:mt-10"
        >
          <div
            className="flex gap-2.5 justify-center items-start pt-1 pb-3 bg-white bg-opacity-0"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0091219243ff86beac8cd93299107e7e278403a463231c802c459f8b8751f06d?apiKey=677d41c069174f9b9b54f73df104e4f5&"
              className="shrink-0 aspect-square w-[22px]"
            />
            <div>My Assets</div>
          </div>
          <div className="flex gap-2.5 justify-center pt-1 pb-3 bg-white bg-opacity-0">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a1327a97d6ba20bd52c5c498e53b3263b68cdd65703a9752342479e037d6836?apiKey=677d41c069174f9b9b54f73df104e4f5&"
              className="shrink-0 self-start aspect-square w-[22px]"
            />
            <div>My Coupons</div>
          </div>
          <div className="flex gap-2.5 justify-center pt-1 pb-3 bg-white bg-opacity-0">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7cd18ac31cbf291827fb247ca893e8568ca84503514091763cb43e5185c9771a?apiKey=677d41c069174f9b9b54f73df104e4f5&"
              className="shrink-0 self-start aspect-square w-[22px]"
            />
            <div>Financial History</div>
          </div>
          <div className="flex gap-2.5 justify-center pt-1 pb-3 bg-white bg-opacity-0">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/15bd98c66b72861f1f4138ada5015d128df3456239cde82e647ce40343bd22a5?apiKey=677d41c069174f9b9b54f73df104e4f5&"
              className="shrink-0 self-start aspect-square w-[22px]"
            />
            <div>Transfer History</div>
          </div>
          <div className="flex gap-2.5 justify-center pt-1 pb-3 bg-white bg-opacity-0">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b6e69c0056695170d906a42babc576e0c2f0ff3bd2daa0aeb44b0922862a3e28?apiKey=677d41c069174f9b9b54f73df104e4f5&"
              className="shrink-0 self-start aspect-square w-[22px]"
            />
            <div>Address Management</div>
          </div>
          <div
            className="flex gap-2.5 justify-center pt-1 pb-3 text-blue-600 border-b-2 border-blue-600 border-solid bg-white bg-opacity-0"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8270baa44bd7db5a57eeb27171833c39c924af35177746f80c0846736d767abb?apiKey=677d41c069174f9b9b54f73df104e4f5&"
              className="shrink-0 self-start aspect-square w-[22px]"
            />
            <div>Strategy Management</div>
          </div>
        </div>
        <div className="mt-6 w-full max-w-[1261px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[63%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                <div
                  className="flex gap-5 text-base font-medium leading-6 max-md:flex-wrap max-md:pr-5"
                >
                  <div className="text-xl font-semibold leading-7 text-gray-800">
                    Strategy Management
                  </div>
                  <div
                    className="justify-center px-3.5 py-0.5 text-center text-blue-600 bg-blue-100 rounded-lg"
                  >
                    Current Strategy
                  </div>
                  <div
                    className="flex flex-col justify-center text-center bg-white text-slate-400"
                  >
                    <div className="justify-center px-3.5 py-0.5 rounded-lg bg-slate-200">
                      Historical Strategy
                    </div>
                  </div>
                </div>
                <div
                  className="flex gap-5 px-5 mt-6 text-gray-800 max-md:flex-wrap max-md:max-w-full"
                >
                  <div className="flex flex-col flex-1">
                    <div className="text-sm">Strategy Status</div>
                    <div
                      className="flex gap-2 justify-between px-3 py-3.5 mt-1 text-base whitespace-nowrap bg-white rounded-lg border border-solid border-slate-300"
                    >
                      <div>All</div>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ab76680c87d12392ee9ad225047ce684fdd92c86f764764c3cc5826106ffebd?apiKey=677d41c069174f9b9b54f73df104e4f5&"
                        className="shrink-0 w-6 aspect-square"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="text-sm">Trading Currency</div>
                    <div
                      className="flex gap-2 justify-between px-3 py-3.5 mt-1 text-base whitespace-nowrap bg-white rounded-lg border border-solid border-slate-300"
                    >
                      <div>All</div>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/911caeb2eaa709f777b771dfd6e766ad7880db31e589feef79882ec8fa0c7d1c?apiKey=677d41c069174f9b9b54f73df104e4f5&"
                        className="shrink-0 w-6 aspect-square"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="text-sm">Pricing Currency</div>
                    <div
                      className="flex gap-2 justify-between px-3 py-3.5 mt-1 text-base whitespace-nowrap bg-white rounded-lg border border-solid border-slate-300"
                    >
                      <div>All</div>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/28b512a2067a8d6e3c5220726aa9e16bc368d6cfbc1080402a1fc9f1e8950e54?apiKey=677d41c069174f9b9b54f73df104e4f5&"
                        className="shrink-0 w-6 aspect-square"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[37%] max-md:ml-0 max-md:w-full">
              <div
                className="flex flex-col grow px-5 mt-14 text-gray-800 max-md:mt-10 max-md:max-w-full"
              >
                <div className="text-sm max-md:max-w-full">Date</div>
                <div className="flex gap-3 mt-2.5 text-base max-md:flex-wrap">
                  <div
                    className="flex flex-1 gap-2 justify-between px-3 py-3.5 bg-white rounded-lg border border-solid border-slate-300"
                  >
                    <div>Start day</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/355221eb49e3c69227996cd5e80db5c52235adb67a62312585c00ef201787e5a?apiKey=677d41c069174f9b9b54f73df104e4f5&"
                      className="shrink-0 w-6 aspect-square"
                    />
                  </div>
                  <div
                    className="flex flex-1 gap-2 justify-between px-3 py-3.5 bg-white rounded-lg border border-solid border-slate-300"
                  >
                    <div>End day</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/77e63c11f68a5225a836cf23f0fe8e0f76b06c5b5c2eb653082a0e48b8f261f6?apiKey=677d41c069174f9b9b54f73df104e4f5&"
                      className="shrink-0 w-6 aspect-square"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex gap-5 justify-center px-1.5 py-6 mt-8 text-base font-medium tracking-normal text-gray-800 bg-white rounded-lg border border-solid border-slate-300 max-md:flex-wrap"
        >
          <div>Date</div>
          <div>Trading pair</div>
          <div>Strategy Type</div>
          <div>Annualized Yield</div>
          <div>Investment Amount</div>
          <div>Total Income</div>
          <div>Number of runs/time</div>
          <div>Strategy Status</div>
          <div>Operation</div>
        </div>
        <div className="mt-20 text-xl leading-8 text-slate-400 max-md:mt-10">No Data</div>
      </div>
    </div>
  );
};

export default Wallet;

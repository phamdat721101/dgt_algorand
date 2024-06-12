"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import bannerHero from "@/assets/images/bg-Hero.png";
import arrowUpIc from "@/assets/images/icons/arrow-up-ic.png";
import depositIc from "@/assets/images/icons/deposit-ic.png";
import walletIc from "@/assets/images/icons/wallet-ic.png";
import tvIc from "@/assets/images/icons/tv-ic.png";
import peopleIc from "@/assets/images/icons/people-ic.png";
import chartUpIc from "@/assets/images/icons/chart-up-ic.png";

const Banner: React.FC<{ time: number }> = ({ time }) => {
  const [isChanged, setIsChanged] = useState(false);
  let content = isChanged ? (
    <div className="relative mx-auto w-[90%] top-[111px]">
      <div className="flex-col align-center">
        <h1 className="text-2xl sm:text-[42px] leading-[42px] text-white font-semibold tracking-tight text-center">
          Block any trader in easy 3 steps
        </h1>
        <p className="text-base mt-4 sm:text-xl text-white font-medium tracking-tight text-center">
          DigiTrust is non-custodial. Withdraw any time - no lockups
        </p>

        <div className="mx-auto mt-[46px] sm:w-[70%] flex justify-between gap-10 sm:gap-[93px]">
          <div className="w-[218px] h-[206px] flex-col align-center">
            <Image
              className="m-auto w-12 h-12 sm:w-[120px] sm:h-[120px]"
              src={arrowUpIc}
              alt="arrow-up-icon"
            />

            <p className="mt-4 text-xs sm:text-2xl leading-9 font-medium text-center text-white">
              Select manager
              <br />
              and fund
            </p>
          </div>
          <div className="w-[218px] h-[206px] flex-col align-center">
            <Image
              className="m-auto w-12 h-12 sm:w-[120px] sm:h-[120px]"
              src={depositIc}
              alt="deposit-icon"
            />
            <p className="mt-4 text-xs sm:text-2xl leading-9 font-medium text-center text-white">
              Deposit and monitor
            </p>
          </div>
          <div className="w-[218px] h-[206px] flex-col align-center">
            <Image
              className="m-auto w-12 h-12 sm:w-[120px] sm:h-[120px]"
              src={walletIc}
              alt="wallet-icon"
            />
            <p className="mt-4 text-xs sm:text-2xl leading-9 font-medium text-center text-white">
              Withdraw anytime.
              <br />
              No lockups
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="relative mx-auto top-[66px]">
      <div className="flex-col align-center px-3">
        <h1 className="text-2xl sm:text-[42px] leading-[42px] text-white font-semibold tracking-tight text-center">
          No vaults created
        </h1>
        <p className="text-base mt-4 sm:text-xl text-white font-medium tracking-tight text-center">
          Anyone can be come a manager and create their own vaults -
          permissionlesly
        </p>
        <div className="mx-auto mt-[40px] sm:w-[65%] flex justify-between">
          <div className="w-[240px] h-[206px] flex-col align-center">
            <Image
              className="m-auto w-12 h-12 sm:w-[120px] sm:h-[120px]"
              src={tvIc}
              alt="tv-icon"
            />

            <p className="mt-4 text-xs sm:text-2xl sm:leading-9 font-medium text-center text-white">
              Trade & build a<br />
              public track record
            </p>
          </div>
          <div className="w-[240px] h-[206px] flex-col align-center">
            <Image
              className="m-auto w-12 h-12 sm:w-[120px] sm:h-[120px]"
              src={peopleIc}
              alt="people-icon"
            />
            <p className="mt-4 text-xs sm:text-2xl sm:leading-9 font-medium text-center text-white">
              Be discovered by
              <br />
              depositors
            </p>
          </div>
          <div className="w-[240px] h-[206px] flex-col align-center">
            <Image
              className="m-auto w-12 h-12 sm:w-[120px] sm:h-[120px]"
              src={chartUpIc}
              alt="chart-icon"
            />
            <p className="mt-4 text-xs sm:text-2xl sm:leading-9 font-medium text-center text-white">
              Earn management
              <br />& performance fees
            </p>
          </div>
        </div>
        <div className="sm:mt-[35px] text-center">
          <Link href="/detail">
            <button className="bg-white rounded-[10px]">
              <div className="px-5 py-2.5 sm:px-[41px] sm:py-[13px] text-[#2563EB] text-base sm:text-xl font-semibold leading-[30px] tracking-tight">
                Create Vault
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanged((current) => !current);
    }, time);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <section>
      <div className="relative h-[554px]">
        <Image
          className="absolute h-[554px] object-cover"
          src={bannerHero}
          alt="bannerHero"
        />
        {content}
      </div>
    </section>
  );
};

export default Banner;

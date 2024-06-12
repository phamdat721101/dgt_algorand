"use client";

import { useState } from "react";
import Image from "next/image";
import Layout from "./HomeLayout";
import bannerHero from "@/assets/images/bg-Hero.png";
import imageHero from "@/assets/images/imageHero.png";
import suiLogo from "@/assets/images/logo_brands/sui_symbol_sea.svg";
import aptosLogo from "@/assets/images/logo_brands/aptos_primary.svg";
import klaytnLogo from "@/assets/images/logo_brands/klaytn-logo.svg";
import algorandLogo from "@/assets/images/logo_brands/algorand_logo.png";
import aws from "@/assets/images/logo_brands/amazon.png";
import messari from "@/assets/images/logo_brands/messari.png";
import coinMarketCap from "@/assets/images/logo_brands/coin-market-cap.png";
import blockPi from "@/assets/images/logo_brands/blockPi.png";
import w3xLogo from "@/assets/images/logo_brands/w3x_logo.png";
import accountAbtraction from "@/assets/images/account-abstraction.png";
import timeline from "@/assets/images/bg-timeline.png";
import investor from "@/assets/images/feature-investors.png";
import fundingManagers from "@/assets/images/feature-funding-managers.png";
import line from "@/assets/images/line.png";
import Button from "@/components/Button";
import multiSignatureVaults from "@/assets/images/multi-signature-vaults.png";
import aiVerify from "@/assets/images/ai-verified-audit-for-smart-contracts.png";
import rectangleBlue from "@/assets/images/rectangle-blue.png";
import rectangleBlueRight from "@/assets/images/rectangle-blue-right.png";
import minus from "@/assets/images/icons/minus.svg";
import plus from "@/assets/images/icons/plus.svg";
import "@/components/LandingPage/LandingPage.css";
import { url } from "inspector";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState({
    "1": false,
    "2": false,
    "3": false,
    "4": false,
    "5": false,
  });

  function toggleHandler(key: string, open: boolean) {
    setIsOpen((prev) => ({
      ...prev,
      [key]: open,
    }));
  }

  return (
    <>
      {/* <Layout> */}
      {/* Hero banner */}
      <section className="hero-background flex relative">
        <div className="w-[55%] sm:w-1/2">
          <div className="z-50 flex-1 space-y-[44px] py-[70px] pl-[50px] text-white xl:max-w-6xl xl:py-[120px] xl:pl-[120px]">
            <div className="space-y-5">
              <h3 className="text-base font-normal xl:text-[22px]">
                Welcome to DigiTrust
              </h3>
              <h1 className="font-extrabold leading-normal text-xl md:max-w-lg md:text-5xl xl:max-w-2xl xl:text-[60px] xl:leading-[80px] 2xl:text-[70px]">
                Introducing Smart Vault Aggregator
              </h1>
              <p className="max-w-sm text-sm font-extralight md:leading-[35px] -tracking-[0.4px] md:text-sm xl:max-w-lg xl:text-xl">
                Your Gateway to Enhanced Investment in the Decentralized Finance
                Space.
              </p>
            </div>

            <div className="space-y-16">
              {/* <div className="flex items-center gap-x-[22px] text-base font-medium capitalize leading-[20px]">
                    <a className="block" href="/home">
                      <button className="rounded-[10px] bg-white px-6 py-4 text-sm text-blue-600 xl:text-base hover:bg-blue-50">
                        Start Investing
                      </button>
                    </a>
                    <a className="block" href="/home">
                      <button className="rounded-[10px] border border-white px-6 py-4 text-sm xl:text-base hover:bg-blue-700 hover:text-white">
                        Explore
                      </button>
                    </a>
                  </div> */}

              {/* <div className="flex items-center gap-x-[24px] text-[17px] font-normal leading-[30px] -tracking-[0.34px]">
                    <div className="flex items-center gap-x-1.5 text-sm xl:text-base">
                      <span>
                        <svg
                          className="h-auto w-5"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="9" cy="9" r="9" fill="#10B981" />
                          <path
                            d="M5 9L7.8 12L13 6"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      Great Service
                    </div>

                    <div className="flex items-center gap-x-1.5 text-sm xl:text-base">
                      <span>
                        <svg
                          className="h-auto w-5"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="9" cy="9" r="9" fill="#10B981" />
                          <path
                            d="M5 9L7.8 12L13 6"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      Great Service
                    </div>
                  </div> */}
            </div>
          </div>
        </div>
        <div className="w-[45%] sm:w-1/2 py-7 md:py-14 overflow-hidden">
          <Image
            className="h-full object-left-top object-cover"
            src={imageHero}
            alt="imageHero"
          ></Image>
        </div>
      </section>

      {/* Logo brands */}
      <section className="container mx-auto flex flex-wrap sm:flex-nowrap items-center justify-center gap-x-5 gap-y-7 px-5 py-5 md:gap-x-14 md:gap-y-14 md:px-60 md:py-16 bg-gray">
        <Image className="h-14" src={suiLogo} alt="sui logo"></Image>

        <Image className="h-11" src={aptosLogo} alt="aptos logo"></Image>

        {/* <Image
            className="h-14"
            src={algorandLogo}
            alt="algorand logo"
          ></Image> */}

        <Image className="h-14" src={klaytnLogo} alt="klaytn logo"></Image>
        {/* <Image className="" src={aws} alt="amazon"></Image>

          <Image className="" src={messari} alt="messari"></Image>

          <Image className="" src={blockPi} alt="blockPi"></Image>

          <Image className="" src={coinMarketCap} alt="coinMarketCap"></Image> */}
        <Image className="h-14" src={w3xLogo} alt="w3x logo"></Image>
      </section>

      <hr />

      {/* AI-Driven Portfolio */}
      <section>
        <h1 className="py-12 md:pb-[90px] md:pt-[58px] text-3xl text-center md:text-4xl font-bold leading-[130%] text-gray-800 xl:text-[50px]">
          AI-Driven Portfolio
        </h1>
        {/* Account abtraction */}
        <div className="flex flex-wrap md:flex-nowrap	items-center gap-x-5 px-[60px] py-10 xl:px-[120px]">
          <div className="max-w-sm space-y-10 xl:max-w-lg">
            <h1 className="text-2xl md:text-4xl font-bold uppercase leading-[130%] text-blue-600">
              ACCOUNT ABSTRACTION
            </h1>

            <div className="space-y-9 text-base font-normal leading-normal text-gray-600">
              <p>
                <span className="font-bold">Non-Custodial Wallets: </span>
                Allows users to access their accounts using familiar
                credentials, such as email and password.
              </p>

              <p>
                <span className="font-bold">Account Recovery: </span>
                Users can regain access by answering personalized security
                questions.
              </p>
            </div>
          </div>

          <Image
            className="ml-auto"
            src={accountAbtraction}
            alt="accountAbtraction"
          ></Image>
        </div>

        {/* MULTI-SIGNATURE VAULTS */}
        <div className="flex flex-wrap md:flex-nowrap	items-center gap-x-5 bg-blue-50 px-[60px] py-10 xl:px-[120px]">
          <Image
            className="mr-auto"
            src={multiSignatureVaults}
            alt="multiSignatureVaults"
          ></Image>

          <div className="md:-mt-24 max-w-sm space-y-10 xl:max-w-lg">
            <h1 className="text-2xl md:text-4xl font-bold uppercase leading-[130%] text-blue-600">
              MULTI-SIGNATURE VAULTS
            </h1>

            <div className="space-y-9 text-base font-normal leading-normal text-gray-600">
              <p>
                <span className="font-bold">User-Controlled Security: </span>
                Multi-signature vaults empower users with unprecedented control
                over the security of their digital assets.
              </p>

              <p>
                <span className="font-bold">
                  A Customizable Signature Requirements:{" "}
                </span>
                Users can choose the number of signatures required to authorize
                a transaction.
              </p>
            </div>
          </div>
        </div>

        {/* AI-DRIVEN INVESTMENT RECOMMENDATIONS */}
        <div className="relative overflow-hidden pt-10">
          <Image
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 xl:left-2/3"
            src={rectangleBlue}
            alt=""
          ></Image>

          <div className="relative z-50 flex items-center gap-x-5 px-[60px] py-10 xl:px-[120px]">
            <div className="-mt-12 md:-mt-24 max-w-sm space-y-10 xl:max-w-lg">
              <h1 className="text-2xl md:text-4xl font-bold uppercase leading-[130%] text-blue-600">
                AI-DRIVEN INVESTMENT RECOMMENDATIONS
              </h1>

              <div className="space-y-9 text-base font-normal leading-normal text-gray-600">
                <p>
                  <span className="font-bold">
                    Personalized Investment Strategies:{" "}
                  </span>
                  Analyzes user preferences, risk tolerance, and market trends
                  to generate personalized investment strategies.
                </p>

                <p>
                  <span className="font-bold">Sentiment Analysis: </span>
                  Incorporating sentiment analysis, the Al assesses social
                  media, news articles, and other relevant data sources to gauge
                  market sentiment.
                </p>
              </div>
            </div>

            <Image className="ml-auto" src={aiVerify} alt="aiVerify"></Image>
          </div>
        </div>

        {/* AI-DRIVEN INVESTMENT RECOMMENDATIONS */}
        <div className="relative overflow-hidden md:pt-10">
          <Image
            className="absolute left-[35%] top-1/2 -translate-x-1/2 -translate-y-[40%] object-cover"
            src={rectangleBlueRight}
            alt="rectangleBlueRight"
          ></Image>

          <div className="relative h-full">
            <div className="relative z-50 flex flex-wrap md:flex-nowrap items-center gap-x-5 px-[60px] py-10 xl:px-[120px]">
              <Image className="mr-auto" src={aiVerify} alt="aiVerify"></Image>
              <div className="md:-mt-12 md:-mt-24 max-w-sm space-y-10 xl:max-w-lg">
                <h1 className="text-2xl md:text-4xl font-bold uppercase leading-[130%] text-blue-600">
                  AI-VERIFIED AUDIT FOR SMART CONTRACTS
                </h1>

                <div className="space-y-9 text-base font-normal leading-normal text-gray-600">
                  <p>
                    <span className="font-bold">Automated Auditing: </span>
                    Automates the auditing process using Al algorithms, allowing
                    for efficient and thorough assessments of smart contract
                    code.
                  </p>

                  <p>
                    <span className="font-bold">Continuous Monitoring: </span>
                    Provides continuous monitoring, adapting to changes in the
                    code and promptly identifying and addressing new
                    vulnerabilities.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative z-50 flex flex-wrap md:flex-nowrap items-center gap-x-5 px-[60px] pb-16 md:pb-32 xl:px-[120px]">
              <div className="md:-mt-24 max-w-sm space-y-10 xl:max-w-lg">
                <h1 className="text-2xl md:text-4xl font-bold uppercase leading-[130%] text-blue-600">
                  PREDICTIVE YIELD FARMING STRATEGIES
                </h1>

                <div className="space-y-9 text-base font-normal leading-normal text-gray-600">
                  <p>
                    <span className="font-bold">
                      Dynamic Allocation Strategies:{" "}
                    </span>
                    Dynamically allocates assets across different liquidity
                    pools based on changing market conditions.
                  </p>

                  <p>
                    <span className="font-bold">Risk Mitigation: </span>
                    Embedded risk management algorithms assess the potential
                    risks associated with different liquidity pools.
                  </p>
                </div>
              </div>

              <Image className="ml-auto" src={aiVerify} alt="aiVerify"></Image>
            </div>
          </div>
        </div>
      </section>

      {/* Feature */}
      <section className="pb-10 pt-8 md:pt-[60px]">
        <div className="space-y-[50px] px-[60px] xl:px-[120px]">
          <h1 className="text-3xl md:pb-[70px] text-center md:text-[50px] font-bold leading-[130%] text-gray-800">
            Feature
          </h1>

          {/* Investors */}
          <div className="space-y-[75px]">
            <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-x-10">
              <Image
                className="w-2/6 xl:w-2/5"
                src={investor}
                alt="Investors"
              ></Image>

              <div className="mx-auto max-w-2xl md:space-y-[45px]">
                <h1 className="text-2xl md:text-4xl font-bold text-blue-600 xl:text-[50px]">
                  Investors
                </h1>

                <div className="space-y-[30px]">
                  {/* Simplified Management */}
                  <div className="flex gap-x-[22px]">
                    <div className="flex aspect-square items-center rounded-[10px] bg-blue-50 p-[30px]">
                      <svg
                        width="50"
                        height="50"
                        viewBox="0 0 50 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.375 35.9375V14.0625"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M40.625 14.0625V35.9375"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18.75 25V28.125"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M25 23.4375V28.125"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M31.25 21.875V28.125"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M42.1875 7.8125H7.8125C6.94956 7.8125 6.25 8.51206 6.25 9.375V12.5C6.25 13.3629 6.94956 14.0625 7.8125 14.0625H42.1875C43.0504 14.0625 43.75 13.3629 43.75 12.5V9.375C43.75 8.51206 43.0504 7.8125 42.1875 7.8125Z"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M25 35.9375V42.1875"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M25 48.4375C26.7259 48.4375 28.125 47.0384 28.125 45.3125C28.125 43.5866 26.7259 42.1875 25 42.1875C23.2741 42.1875 21.875 43.5866 21.875 45.3125C21.875 47.0384 23.2741 48.4375 25 48.4375Z"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.25 35.9375H43.75"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div className="space-y-[5px]">
                      <h2 className="text-xl font-semibold xl:text-3xl">
                        Simplified Management
                      </h2>
                      <p className="text-sm font-normal text-gray-600 xl:text-base">
                        Easily allocate, monitor, and adjust asset distributions
                        across various vaults, all within a user-friendly
                        platform.
                      </p>
                    </div>
                  </div>

                  {/* Community Insights */}
                  <div className="flex gap-x-[22px]">
                    <div className="flex aspect-square items-center rounded-[10px] bg-blue-50 p-[30px]">
                      <svg
                        width="50"
                        height="50"
                        viewBox="0 0 50 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.875 21.875H34.375"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21.875 28.125H34.375"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M40.625 7.8125H9.375C8.51206 7.8125 7.8125 8.51206 7.8125 9.375V40.625C7.8125 41.4879 8.51206 42.1875 9.375 42.1875H40.625C41.4879 42.1875 42.1875 41.4879 42.1875 40.625V9.375C42.1875 8.51206 41.4879 7.8125 40.625 7.8125Z"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.625 7.8125V42.1875"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div className="space-y-[5px]">
                      <h2 className="text-xl font-semibold xl:text-3xl">
                        Community Insights
                      </h2>
                      <p className="text-sm font-normal text-gray-600 xl:text-base">
                        Engage with a vibrant community of DeFi investors,
                        sharing knowledge and strategies for maximizing
                        portfolio security and growth.
                      </p>
                    </div>
                  </div>

                  {/* Community Insights */}
                  <div className="flex gap-x-[22px]">
                    <div className="flex aspect-square items-center rounded-[10px] bg-blue-50 p-[30px]">
                      <svg
                        width="50"
                        height="50"
                        viewBox="0 0 50 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.625 25C15.625 21.9097 16.5414 18.8887 18.2583 16.3192C19.9752 13.7497 22.4155 11.747 25.2706 10.5644C28.1257 9.38177 31.2673 9.07234 34.2983 9.67524C37.3292 10.2781 40.1134 11.7663 42.2985 13.9515C44.4837 16.1367 45.9719 18.9208 46.5748 21.9517C47.1777 24.9827 46.8682 28.1243 45.6856 30.9794C44.503 33.8345 42.5003 36.2748 39.9308 37.9917C37.3613 39.7086 34.3403 40.625 31.25 40.625H14.0625C11.1617 40.625 8.3797 39.4727 6.32852 37.4215C4.27734 35.3703 3.125 32.5883 3.125 29.6875C3.125 26.7867 4.27734 24.0047 6.32852 21.9535C8.3797 19.9023 11.1617 18.75 14.0625 18.75C14.9776 18.7497 15.8893 18.8612 16.7773 19.082"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M37.5 22.6562L28.125 32.0312L23.4375 27.3438"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div className="space-y-[5px]">
                      <h2 className="text-xl font-semibold xl:text-3xl">
                        Smart routing system
                      </h2>
                      <p className="text-sm font-normal text-gray-600 xl:text-base">
                        Stay informed with real-time insights into your
                        portfolio's performance, enabling swift and informed
                        decision-making.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Funding managers */}
          <div className="space-y-[75px]">
            <div className="flex items-center justify-between gap-x-10">
              <div className="mx-auto max-w-2xl space-y-[45px]">
                <h1 className="text-2xl md:text-4xl font-bold text-blue-600 xl:text-[50px]">
                  Funding Managers
                </h1>

                <div className="space-y-[30px]">
                  {/* Strategic Deployment */}
                  <div className="flex gap-x-[22px]">
                    <div className="flex aspect-square items-center rounded-[10px] bg-blue-50 p-[30px]">
                      <svg
                        width="50"
                        height="50"
                        viewBox="0 0 50 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M43.75 40.625H6.25V9.375"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M40.625 12.5L25 28.125L18.75 21.875L6.25 34.375"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M40.625 20.3125V12.5H32.8125"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div className="space-y-[5px]">
                      <h2 className="text-xl font-semibold xl:text-3xl">
                        Strategic Deployment
                      </h2>
                      <p className="text-sm font-normal text-gray-600 xl:text-base">
                        Optimize capital deployment with a range of vault
                        options, each offering distinct security strategies for
                        diversified funding avenues.
                      </p>
                    </div>
                  </div>

                  {/* Risk Assessment Tools */}
                  <div className="flex gap-x-[22px]">
                    <div className="flex aspect-square items-center rounded-[10px] bg-blue-50 p-[30px]">
                      <svg
                        width="50"
                        height="50"
                        viewBox="0 0 50 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M32.8125 43.75H10.9375C10.5231 43.75 10.1257 43.5854 9.83265 43.2924C9.53962 42.9993 9.375 42.6019 9.375 42.1875V14.0625C9.375 13.6481 9.53962 13.2507 9.83265 12.9576C10.1257 12.6646 10.5231 12.5 10.9375 12.5H26.5625L34.375 20.3125V42.1875C34.375 42.6019 34.2104 42.9993 33.9174 43.2924C33.6243 43.5854 33.2269 43.75 32.8125 43.75Z"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.625 12.5V7.8125C15.625 7.3981 15.7896 7.00067 16.0826 6.70765C16.3757 6.41462 16.7731 6.25 17.1875 6.25H32.8125L40.625 14.0625V35.9375C40.625 36.3519 40.4604 36.7493 40.1674 37.0424C39.8743 37.3354 39.4769 37.5 39.0625 37.5H34.375"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17.1875 29.6875H26.5625"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17.1875 35.9375H26.5625"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div className="space-y-[5px]">
                      <h2 className="text-xl font-semibold xl:text-3xl">
                        Risk Assessment Tools
                      </h2>
                      <p className="text-sm font-normal text-gray-600 xl:text-base">
                        Access advanced risk assessment tools to evaluate and
                        mitigate potential vulnerabilities, ensuring a secure
                        funding environment.
                      </p>
                    </div>
                  </div>

                  {/* Collaborative Network */}
                  <div className="flex gap-x-[22px]">
                    <div className="flex aspect-square items-center rounded-[10px] bg-blue-50 p-[30px]">
                      <svg
                        width="50"
                        height="50"
                        viewBox="0 0 50 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M25 29.6875C27.5888 29.6875 29.6875 27.5888 29.6875 25C29.6875 22.4112 27.5888 20.3125 25 20.3125C22.4112 20.3125 20.3125 22.4112 20.3125 25C20.3125 27.5888 22.4112 29.6875 25 29.6875Z"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18.75 15.625C21.3388 15.625 23.4375 13.5263 23.4375 10.9375C23.4375 8.34867 21.3388 6.25 18.75 6.25C16.1612 6.25 14.0625 8.34867 14.0625 10.9375C14.0625 13.5263 16.1612 15.625 18.75 15.625Z"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M39.0625 25C41.6513 25 43.75 22.9013 43.75 20.3125C43.75 17.7237 41.6513 15.625 39.0625 15.625C36.4737 15.625 34.375 17.7237 34.375 20.3125C34.375 22.9013 36.4737 25 39.0625 25Z"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M39.0625 40.625C41.6513 40.625 43.75 38.5263 43.75 35.9375C43.75 33.3487 41.6513 31.25 39.0625 31.25C36.4737 31.25 34.375 33.3487 34.375 35.9375C34.375 38.5263 36.4737 40.625 39.0625 40.625Z"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.9375 42.1875C13.5263 42.1875 15.625 40.0888 15.625 37.5C15.625 34.9112 13.5263 32.8125 10.9375 32.8125C8.34867 32.8125 6.25 34.9112 6.25 37.5C6.25 40.0888 8.34867 42.1875 10.9375 42.1875Z"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M23.105 20.723L20.644 15.2152"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M34.6099 21.7965L29.4536 23.5153"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M35.3716 33.0664L28.6919 27.8711"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21.5044 28.1058L14.4341 34.3949"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div className="space-y-[5px]">
                      <h2 className="text-xl font-semibold xl:text-3xl">
                        Collaborative Network
                      </h2>
                      <p className="text-sm font-normal text-gray-600 xl:text-base">
                        Engage within a network of funding managers, leveraging
                        collective insights and strategies to maximize fund
                        security and growth potential.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Image
                className="hidden sm:block w-2/6 xl:w-2/5"
                src={fundingManagers}
                alt="fundingManagers"
              ></Image>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="pt-[60px]">
        <div className="relative overflow-hidden">
          <h1 className="pb-[60px] pt-7 md:pt-[58px] text-center text-3xl md:text-[50px] font-bold leading-[130%] text-gray-800">
            Timeline
          </h1>

          <Image
            className="absolute bg-repeat"
            src={timeline}
            alt="timeline"
          ></Image>

          <div className="relative px-[77px]">
            <div className="w-full px-2 sm:px-0">
              <div className="relative">
                {/* Vertical bar middle */}
                <div className="absolute left-1/2 hidden h-3 w-3 -translate-x-1/2 transform rounded-full bg-blue-600 sm:block"></div>

                <div className="absolute left-1/2 hidden h-full w-1 -translate-x-1/2 transform bg-blue-600 sm:block"></div>

                <div className="absolute bottom-0 left-1/2 hidden h-3 w-3 -translate-x-1/2 transform rounded-full bg-blue-600 sm:block"></div>

                {/* Content Left */}
                <div className="mb-12 sm:mt-0">
                  <div className="flex flex-col items-center pt-14 sm:flex-row">
                    <div className="mx-auto mt-24 flex w-full items-start justify-start">
                      <div className="flex w-full justify-end sm:w-1/2 sm:pr-8">
                        <div className="rounded-timelineLeft mt-6 flex w-[75px] h-[75px] items-center justify-center bg-blue-600 text-2xl font-bold text-white lg:w-[75px] xl:text-4xl 2xl:w-[80px]">
                          1
                        </div>
                        <div className="w-[482px] max-w-lg rounded-[10px] border border-card bg-blue-50 pb-[60px] pl-[30px] pr-[20px] pt-[30px]">
                          <div className="space-y-6">
                            <h1 className="text-3xl font-semibold leading-[30px]">
                              Q2-2024
                            </h1>
                            <div className="flex items-start gap-x-4">
                              <div className="absolute mt-1.5 h-3 w-3 rounded-full bg-gray-800"></div>

                              <p className="pl-6">
                                Support profile sharing from smart contract
                              </p>
                            </div>
                            <div className="flex items-start gap-x-4">
                              <div className="absolute mt-1.5 h-3 w-3 rounded-full bg-gray-800"></div>

                              <p className="pl-6">
                                Support to create on-chain vault
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="absolute left-1/2 -translate-x-[calc(50%+8px)] -translate-y-4 transform sm:translate-y-0">
                        <div className="hidden sm:block h-0 w-0 border-b-[10px] border-r-[15px] border-t-[10px] border-b-transparent border-r-blue-600 border-t-transparent"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Right */}
                <div className="mb-12 sm:mt-0">
                  <div className="flex flex-col items-center pt-14 sm:flex-row">
                    <div className="mx-auto flex w-full items-start justify-end">
                      <div className="flex w-full justify-start sm:w-1/2 sm:pl-8">
                        <div className="w-[482px] max-w-lg rounded-[10px] border border-card bg-blue-50 pb-[60px] pl-[30px] pr-[20px] pt-[30px]">
                          <div className="space-y-6">
                            <h1 className="text-3xl font-semibold leading-[30px]">
                              Q3-2024
                            </h1>
                            <div className="flex items-start gap-x-4">
                              <div className="absolute mt-1.5 h-3 w-3 rounded-full bg-gray-800"></div>

                              <p className="pl-6">
                                Integrate indexer protocol to check on-chain
                                performance of managers
                              </p>
                            </div>
                            <div className="flex items-start gap-x-4">
                              <div className="absolute mt-1.5 h-3 w-3 rounded-full bg-gray-800"></div>

                              <p className="pl-6">
                                Integrate dex protocol to verify manager actions
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-timelineRight mt-6 flex h-[75px] w-[75px] items-center justify-center bg-blue-600 text-2xl font-bold text-white xl:text-4xl 2xl:w-[80px]">
                          2
                        </div>
                      </div>

                      <div className="absolute left-1/2 -translate-x-[calc(50%-8px)] -translate-y-4 transform sm:translate-y-0">
                        <div className="hidden sm:block h-0 w-0 border-b-[10px] border-l-[15px] border-t-[10px] border-b-transparent border-l-blue-600 border-t-transparent"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Left */}
                <div className="mb-12 sm:mt-0">
                  <div className="flex flex-col items-center pt-14 sm:flex-row">
                    <div className="mx-auto flex w-full items-start justify-start">
                      <div className="flex w-full justify-end sm:w-1/2 sm:pr-8">
                        <div className="rounded-timelineLeft mt-6 flex w-[75px] h-[75px] items-center justify-center bg-blue-600 text-2xl font-bold text-white lg:w-[75px] xl:text-4xl 2xl:w-[80px]">
                          3
                        </div>
                        <div className="w-[482px] max-w-lg rounded-[10px] border border-card bg-blue-50 pb-[60px] pl-[30px] pr-[20px] pt-[30px]">
                          <div className="space-y-6">
                            <h1 className="text-3xl font-semibold leading-[30px]">
                              Q4-2024
                            </h1>
                            <div className="flex items-start gap-x-4">
                              <div className="absolute mt-1.5 h-3 w-3 rounded-full bg-gray-800"></div>

                              <p className="pl-6">
                                Support on-chain monitor to make funding
                                allocation automatically
                              </p>
                            </div>
                            <div className="flex items-start gap-x-4">
                              <div className="absolute mt-1.5 h-3 w-3 rounded-full bg-gray-800"></div>

                              <p className="pl-6">
                                Selling package fee to support AI feature
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="absolute left-1/2 -translate-x-[calc(50%+8px)] -translate-y-4 transform sm:translate-y-0">
                        <div className="hidden sm:block h-0 w-0 border-b-[10px] border-r-[15px] border-t-[10px] border-b-transparent border-r-blue-600 border-t-transparent"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Right */}
                <div className="mb-12 sm:mt-0">
                  <div className="flex flex-col items-center pt-14 sm:flex-row">
                    <div className="mx-auto flex w-full items-start justify-end">
                      <div className="flex w-full justify-start sm:w-1/2 sm:pl-8">
                        <div className="w-[482px] max-w-lg rounded-[10px] border border-card bg-blue-50 pb-[60px] pl-[30px] pr-[20px] pt-[30px]">
                          <div className="space-y-6">
                            <h1 className="text-3xl font-semibold leading-[30px]">
                              Future
                            </h1>
                            <div className="flex items-start gap-x-4">
                              <div className="absolute mt-1.5 h-3 w-3 rounded-full bg-gray-800"></div>

                              <p className="pl-6">
                                Support to tokenize real-world asset
                              </p>
                            </div>
                            <div className="flex items-start gap-x-4">
                              <div className="absolute mt-1.5 h-3 w-3 rounded-full bg-gray-800"></div>

                              <p className="pl-6">
                                Building DAO community for funding managers
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-timelineRight mt-6 flex h-[75px] w-[75px] items-center justify-center bg-blue-600 text-2xl font-bold text-white xl:text-4xl 2xl:w-[80px]">
                          4
                        </div>
                      </div>

                      <div className="absolute left-1/2 -translate-x-[calc(50%-8px)] -translate-y-4 transform sm:translate-y-0">
                        <div className="hidden sm:block h-0 w-0 border-b-[10px] border-l-[15px] border-t-[10px] border-b-transparent border-l-blue-600 border-t-transparent"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Ask Questions */}
      <section className="bg-blue-50 px-[60px] md:px-[100px] pb-20 md:pb-[160px] pt-[85px] xl:px-[150px]">
        <h1 className="mb-12 md:mb-[120px] text-center text-3xl md:text-[50px] font-bold leading-[130%]">
          Frequently Ask Questions
        </h1>

        <div className="flex flex-wrap md:grid md:grid-cols-2 gap-[30px]">
          <div>
            <details
              onToggle={(event) => toggleHandler("1", event.currentTarget.open)}
              className="py-9 pr-12 md:pr-14 bg-white border border-card rounded-[10px] mb-[30px]"
            >
              <summary className="pl-8 flex items-center gap-[30px] [list-style:none] opacity-85 text-lg font-semibold leading-6 text-gray-800 2xl:text-xl">
                <Image
                  className="w-[30px] h-[30px] opacity-80"
                  src={isOpen[1] ? minus : plus}
                  alt="icon"
                />
                <h1>What is DigiTrust?</h1>
              </summary>
              <p className="opacity-70 pl-12 md:pl-[92px] pt-4 max-w-lg text-base font-normal text-gray-600">
                DigiTrust is a decentralized asset management protocol that
                leverages blockchain technology to allow users to securely
                manage, invest, and trade digital assets without intermediaries.
              </p>
            </details>
            <details
              onToggle={(event) => toggleHandler("2", event.currentTarget.open)}
              className="py-9 pr-12 md:pr-14 bg-white border border-card rounded-[10px]"
            >
              <summary className="pl-8 flex items-center gap-[30px] [list-style:none] opacity-85 text-lg font-semibold leading-6 text-gray-800 2xl:text-xl">
                <Image
                  className="w-[30px] h-[30px] opacity-80"
                  src={isOpen[2] ? minus : plus}
                  alt="icon"
                />
                <h1>How do I start using DigiTrust?</h1>
              </summary>
              <p className="opacity-70 pl-12 md:pl-[92px] pt-4 max-w-lg text-base font-normal text-gray-600">
                To use DigiTrust, you need a compatible digital wallet. Connect
                your wallet to the DigiTrust platform, deposit your assets, and
                you can begin managing your portfolio and engaging in various
                financial activities.
              </p>
            </details>
          </div>

          <div>
            <details
              onToggle={(event) => toggleHandler("3", event.currentTarget.open)}
              className="py-9 pr-12 md:pr-14 bg-white border border-card rounded-[10px] mb-[30px]"
            >
              <summary className="pl-8 flex items-center gap-[30px] [list-style:none] opacity-85 text-lg font-semibold leading-6 text-gray-800 2xl:text-xl">
                <Image
                  className="w-[30px] h-[30px] opacity-80"
                  src={isOpen[3] ? minus : plus}
                  alt="icon"
                />
                <h1>Is DigiTrust secure?</h1>
              </summary>
              <p className="opacity-70 pl-12 md:pl-[92px] pt-4 max-w-lg text-base font-normal text-gray-600">
                DigiTrust employs high-security standards using advanced
                cryptographic techniques. However, it’s important to be aware of
                potential risks like smart contract vulnerabilities and market
                volatility. Always review security audits and community
                feedback.
              </p>
            </details>
            <details
              onToggle={(event) => toggleHandler("4", event.currentTarget.open)}
              className="py-9 pr-12 md:pr-14 bg-white border border-card rounded-[10px] mb-[30px]"
            >
              <summary className="pl-8 flex items-center gap-[30px] [list-style:none] opacity-85 text-lg font-semibold leading-6 text-gray-800 2xl:text-xl">
                <Image
                  className="w-[30px] h-[30px] opacity-80"
                  src={isOpen[4] ? minus : plus}
                  alt="icon"
                />
                <h1>Can I earn passive income with DigiTrust?</h1>
              </summary>
              <p className="opacity-70 pl-12 md:pl-[92px] pt-4 max-w-lg text-base font-normal text-gray-600">
                Yes, DigiTrust offers opportunities to earn passive income
                through staking, yield farming, and lending. These decentralized
                finance (DeFi) activities enable users to grow their assets over
                time.
              </p>
            </details>
            <details
              onToggle={(event) => toggleHandler("5", event.currentTarget.open)}
              className="py-9 pr-12 md:pr-14 bg-white border border-card rounded-[10px]"
            >
              <summary className="pl-8 flex items-center gap-[30px] [list-style:none] opacity-85 text-lg font-semibold leading-6 text-gray-800 2xl:text-xl">
                <Image
                  className="w-[30px] h-[30px] opacity-80"
                  src={isOpen[5] ? minus : plus}
                  alt="icon"
                />
                <h1>How is DigiTrust governed?</h1>
              </summary>
              <p className="opacity-70 pl-12 md:pl-[92px] pt-4 max-w-lg text-base font-normal text-gray-600">
                DigiTrust is governed by a decentralized autonomous organization
                (DAO), where token holders can propose and vote on changes to
                the protocol. This ensures community-driven decision-making.
              </p>
            </details>
          </div>
        </div>
      </section>
      {/* </Layout> */}
    </>
  );
}

"use client";

import Image from "next/image";
import { Tab } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import {
  withdrawBase,
  makeBaseDeposit,
  client,
} from "@/constants/suiSignTransaction";
import { useWallet } from "@suiet/wallet-kit";
import { toast } from "react-hot-toast";
import { useOnborda } from "onborda";
import usdt from "@/assets/images/crypto/tether.svg";
import usdc from "@/assets/images/crypto/usdc.svg";
import digitrustLogo from "@/assets/images/digitrust_notext.png";
import "./DepositWithdraw.css";

const optionsDeposit = [
  { label: "DGT", image: digitrustLogo },
];
const optionsWithdraw = [
  { label: "USDT", image: usdt },
  { label: "USDC", image: usdc },
];

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export default function DepositWithdraw() {
  const [depositAmount, setDepositAmount] = useState(1);
  const [withdrawAmount, setWithdrawAmount] = useState(1);
  const wallet = useWallet();
  const [orderID, setOrderID] = useState(0);
  const { isOnbordaVisible } = useOnborda();
  const [email, setEmail] = useState("");

  const [isDropdownDepositOpen, setIsDropdownDepositOpen] = useState(false);
  const [selectedDepositOption, setSelectedDepositOption] = useState<{
    label: string;
    image: any;
  }>({ label: "DGT", image: digitrustLogo });
  const [isDropdownWithdrawOpen, setIsDropdownWithdrawOpen] = useState(false);
  const [selectedWithdrawOption, setSelectedWithdrawOption] = useState<{
    label: string;
    image: any;
  }>();

  useEffect(() => {
    let curEmail = window.localStorage.getItem("userEmail") != null ? window.localStorage.getItem("userEmail") as string : '';
    setEmail(curEmail);
  }, [])

  const toggleDropdown = (status: string) => {
    if (status == "deposit") {
      setIsDropdownDepositOpen(!isDropdownDepositOpen);
    }

    if (status == "withdraw") {
      setIsDropdownWithdrawOpen(!isDropdownWithdrawOpen);
    }
  };

  const selectOption = (
    status: string,
    option: { label: string; image: any }
  ) => {
    if (status == "deposit") {
      setSelectedDepositOption(option);
      setIsDropdownDepositOpen(false);
    }

    if (status == "withdraw") {
      setSelectedWithdrawOption(option);
      setIsDropdownWithdrawOpen(false);
    }
  };

  const goToMakeBaseDeposit = async (work: number) => {
    if (isOnbordaVisible) return;
    if (work == 1 && email != '') {
      let myToast = toast.loading("Deposit is in progress...");
      await postData("https://dgt-dev.vercel.app/v1/algo_deposit",
        {
          "sender": "GD64YIY3TWGDMCNPP553DZPPR6LDUSFQOIJVFDPPXWEG3FVOJCCDBBHU5A", // address
          "amount": 10000000, // depositAmount
          "expire_date": 1718073552,
          "package_type": 1,
          "chain": "algo"
        }
      ).then((data) => {
        toast.dismiss(myToast);
        console.log(data); // JSON data parsed by `data.json()` call
        toast.success(
          "Transaction Success!\n Hash transaction block is " + data?.blockHash,
          {
            style: {
              maxWidth: "850px",
            },
            duration: 5000,
          }
        );
      });
    }
  };

  const goToWithdrawBase = async (work: number) => {
    if (isOnbordaVisible) return;
    if (work == 2 && email != '') {
      // toast.error("You may withdraw your assets after September 2024.", {
      //   style: {
      //     maxWidth: "300px",
      //   },
      //   duration: 5000,
      // })

      let myToast = toast.loading("Withdrawal is in progress...");
      await postData("https://dgt-dev.vercel.app/withdraw",
        {
          "receiver": email,
          "amount": withdrawAmount,
          "package": "0",
          "token": "DGT",
          "manager": "DigiTrust"
        },
      ).then((data) => {
        toast.dismiss(myToast);
        console.log(data); // JSON data parsed by `data.json()` call
        toast.success(
          "Transaction Success!\n Hash transaction block is " + data?.blockHash,
          {
            style: {
              maxWidth: "850px",
            },
            duration: 5000,
          }
        );
      });

    }
  };

  useEffect(() => {
    async function doWork() {
      if (isOnbordaVisible) return;
      else {
        await goToMakeBaseDeposit(0);
        await goToWithdrawBase(0);
      }
    }
    doWork();
  }, []);

  // const { signAndExecuteTransactionBlock } = useWalletKit();

  // Depost/ Withdraw
  async function withdraw(event: any) {
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
  }

  async function deposit_base(event: any) {
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
  }

  return (
    <div className="w-full rounded-[10px]">
      <div className="w-full h-[492px]">
        <Tab.Group>
          <Tab.List className="mb-5 sm:mb-[40px] flex items-center gap-x-[6px] rounded-xl bg-[#E0E9F4] p-1">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? "w-full rounded-lg border-none bg-white px-8 py-2 font-semibold leading-[150%] -tracking-[0.32px] text-blue-600 shadow-elevation focus:outline-none"
                      : "w-full rounded-lg px-8 py-2 leading-[150%] -tracking-[0.32px] text-gray-500"
                  }
                >
                  Deposit
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? "w-full rounded-lg border-none bg-white px-8 py-2 font-semibold leading-[150%] -tracking-[0.32px] text-blue-600 shadow-elevation focus:outline-none"
                      : "w-full rounded-lg px-8 py-2 leading-[150%] -tracking-[0.32px] text-gray-500"
                  }
                >
                  <a id="onborda-step4">Withdraw</a>
                </button>
              )}
            </Tab>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              {/* <div className="space-y-2">
                <div className="isolate inline-flex -space-x-px rounded-[10px] bg-white shadow-sm">
                  <button className="relative inline-flex items-center rounded-l-[10px] p-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300">
                    15%
                  </button>

                  <button className="relative inline-flex items-center p-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300">
                    30%
                  </button>

                  <button className="relative inline-flex items-center p-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300">
                    50%
                  </button>

                  <button className="relative inline-flex items-center rounded-r-[10px] p-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300">
                    Max
                  </button>
                </div>

                <div className="relative">
                  <div className="space-y-2">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center rounded-[10px] border border-gray-300 bg-white px-6 py-4">
                        <div className="w-1/2 space-y-2">
                          <input
                            type="number"
                            className=" w-full px-2 text-2xl font-semibold leading-10 -tracking-[0.26px] rounded-lg focus:outline-none"
                            value={
                              depositAmount === "" ? "0.0000" : depositAmount
                            }
                            onChange={(event) =>
                              setDepositAmount(event.target.value)
                            }
                          />
                          <div className="text-xs font-semibold leading-4 text-gray-500">
                            $1,206.73
                            <span className="text-red-600">(-0.0572%)</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <button className="flex items-center gap-x-[10px] rounded-xl border border-gray-300 bg-[#FAFBFF] px-4 py-3 text-gray-900">
                            <span>
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_242_12250)">
                                  <path
                                    d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                                    fill="#2775C9"
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M11.28 7.54458V6.79518C11.28 6.39753 11.6024 6.07518 12 6.07518C12.3976 6.07518 12.72 6.39753 12.72 6.79518V7.54198C14.0229 7.73815 14.9161 8.4789 15.1546 9.53435C15.2063 9.76325 15.0626 9.99074 14.8337 10.0424C14.803 10.0494 14.7716 10.0529 14.7401 10.0529H14.3506C14.0354 10.0529 13.7486 9.87085 13.6144 9.58565C13.366 9.0576 12.7772 8.75354 11.9931 8.75354C11.0125 8.75354 10.3508 9.23479 10.3508 9.95666C10.3508 10.5342 10.79 10.871 11.8547 11.1237L12.8533 11.3523C14.6159 11.7553 15.3618 12.4832 15.3618 13.7766C15.3618 15.2098 14.3613 16.1791 12.72 16.4076V17.2752C12.72 17.6728 12.3976 17.9952 12 17.9952C11.6024 17.9952 11.28 17.6728 11.28 17.2752V16.4212C9.8262 16.2457 8.84433 15.4762 8.61369 14.2989C8.57574 14.1052 8.70201 13.9174 8.89572 13.8795C8.91835 13.875 8.94136 13.8728 8.96443 13.8728L9.55574 13.8729C9.82337 13.8729 10.0671 14.0269 10.182 14.2686C10.4543 14.8411 11.1509 15.1963 12.0232 15.1963C13.0699 15.1963 13.7978 14.6789 13.7978 13.9571C13.7978 13.3314 13.3526 12.9705 12.2578 12.7118L11.1329 12.4471C9.5327 12.0802 8.77473 11.3102 8.77473 10.071C8.77473 8.73648 9.78205 7.77693 11.28 7.54458ZM3 12.0004C3 8.02903 5.59223 4.66081 9.18314 3.48306C9.40993 3.40868 9.65407 3.53223 9.72845 3.75902C9.74271 3.80249 9.74997 3.84794 9.74997 3.89369L9.74998 4.14735C9.74998 4.53401 9.51544 4.88202 9.15705 5.02715C6.39432 6.14592 4.44643 8.84655 4.44643 12.0004C4.44643 15.1527 6.39244 17.8522 9.15306 18.9719C9.5139 19.1183 9.74998 19.4688 9.74998 19.8582L9.74999 20.0697C9.74999 20.3233 9.54445 20.5288 9.29089 20.5288C9.24162 20.5288 9.19266 20.5209 9.14591 20.5054C5.57432 19.3166 3 15.9579 3 12.0004ZM21 12.0004C21 15.9486 18.4379 19.3007 14.8794 20.4969C14.6295 20.5809 14.3589 20.4464 14.2749 20.1965C14.2584 20.1475 14.25 20.0961 14.25 20.0444V19.8749C14.25 19.4761 14.4914 19.117 14.8606 18.9664C17.614 17.8433 19.5536 15.1474 19.5536 12.0004C19.5536 8.85623 17.6176 6.16252 14.8684 5.03751C14.4944 4.88445 14.25 4.52044 14.25 4.11631V3.96178C14.25 3.69598 14.4655 3.48051 14.7313 3.48051C14.7835 3.48051 14.8354 3.48902 14.8849 3.50569C18.4405 4.70347 21 8.05417 21 12.0004Z"
                                    fill="white"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_242_12250">
                                    <rect width="24" height="24" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </span>
                            <div>VAULT_1</div>
                            <span>
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M10.0002 13.8765L4.26367 8.13989L5.73681 6.66675L10.0002 10.9302L14.2637 6.66675L15.7368 8.13989L10.0002 13.8765Z"
                                  fill="#0D121F"
                                />
                              </svg>
                            </span>
                          </button>
                          <p className="text-right text-xs font-medium leading-4 text-gray-300">
                            Balance: 1509.00
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center rounded-[10px] border border-gray-300 bg-white px-6 py-4">
                        <div className="w-1/2 space-y-2">
                          <input
                            type="text"
                            className="w-full px-2 text-2xl font-semibold leading-10 -tracking-[0.26px] rounded-lg focus:outline-none"
                            value={
                              depositAmount === "" ? "0.0000" : depositAmount
                            }
                          />
                          <div className="text-xs font-semibold leading-4 text-gray-500">
                            $1,206.73
                            <span className="text-red-600">(-0.0572%)</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <button className="flex items-center gap-x-[10px] rounded-xl border border-gray-300 bg-[#FAFBFF] px-4 py-3 text-gray-900">
                            <span>
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_242_12250)">
                                  <path
                                    d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                                    fill="#2775C9"
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M11.28 7.54458V6.79518C11.28 6.39753 11.6024 6.07518 12 6.07518C12.3976 6.07518 12.72 6.39753 12.72 6.79518V7.54198C14.0229 7.73815 14.9161 8.4789 15.1546 9.53435C15.2063 9.76325 15.0626 9.99074 14.8337 10.0424C14.803 10.0494 14.7716 10.0529 14.7401 10.0529H14.3506C14.0354 10.0529 13.7486 9.87085 13.6144 9.58565C13.366 9.0576 12.7772 8.75354 11.9931 8.75354C11.0125 8.75354 10.3508 9.23479 10.3508 9.95666C10.3508 10.5342 10.79 10.871 11.8547 11.1237L12.8533 11.3523C14.6159 11.7553 15.3618 12.4832 15.3618 13.7766C15.3618 15.2098 14.3613 16.1791 12.72 16.4076V17.2752C12.72 17.6728 12.3976 17.9952 12 17.9952C11.6024 17.9952 11.28 17.6728 11.28 17.2752V16.4212C9.8262 16.2457 8.84433 15.4762 8.61369 14.2989C8.57574 14.1052 8.70201 13.9174 8.89572 13.8795C8.91835 13.875 8.94136 13.8728 8.96443 13.8728L9.55574 13.8729C9.82337 13.8729 10.0671 14.0269 10.182 14.2686C10.4543 14.8411 11.1509 15.1963 12.0232 15.1963C13.0699 15.1963 13.7978 14.6789 13.7978 13.9571C13.7978 13.3314 13.3526 12.9705 12.2578 12.7118L11.1329 12.4471C9.5327 12.0802 8.77473 11.3102 8.77473 10.071C8.77473 8.73648 9.78205 7.77693 11.28 7.54458ZM3 12.0004C3 8.02903 5.59223 4.66081 9.18314 3.48306C9.40993 3.40868 9.65407 3.53223 9.72845 3.75902C9.74271 3.80249 9.74997 3.84794 9.74997 3.89369L9.74998 4.14735C9.74998 4.53401 9.51544 4.88202 9.15705 5.02715C6.39432 6.14592 4.44643 8.84655 4.44643 12.0004C4.44643 15.1527 6.39244 17.8522 9.15306 18.9719C9.5139 19.1183 9.74998 19.4688 9.74998 19.8582L9.74999 20.0697C9.74999 20.3233 9.54445 20.5288 9.29089 20.5288C9.24162 20.5288 9.19266 20.5209 9.14591 20.5054C5.57432 19.3166 3 15.9579 3 12.0004ZM21 12.0004C21 15.9486 18.4379 19.3007 14.8794 20.4969C14.6295 20.5809 14.3589 20.4464 14.2749 20.1965C14.2584 20.1475 14.25 20.0961 14.25 20.0444V19.8749C14.25 19.4761 14.4914 19.117 14.8606 18.9664C17.614 17.8433 19.5536 15.1474 19.5536 12.0004C19.5536 8.85623 17.6176 6.16252 14.8684 5.03751C14.4944 4.88445 14.25 4.52044 14.25 4.11631V3.96178C14.25 3.69598 14.4655 3.48051 14.7313 3.48051C14.7835 3.48051 14.8354 3.48902 14.8849 3.50569C18.4405 4.70347 21 8.05417 21 12.0004Z"
                                    fill="white"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_242_12250">
                                    <rect width="24" height="24" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </span>
                            <div>DGT</div>
                            <span>
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M10.0002 13.8765L4.26367 8.13989L5.73681 6.66675L10.0002 10.9302L14.2637 6.66675L15.7368 8.13989L10.0002 13.8765Z"
                                  fill="#0D121F"
                                />
                              </svg>
                            </span>
                          </button>
                          <p className="text-right text-xs font-medium leading-4 text-gray-300">
                            Balance: 1509.00
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-gray-300 bg-white p-[11px]">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.75006 4.50006L11.0304 3.96973L14.0304 6.96973L12.9697 8.03039L11.2501 6.31072L11.2501 13.5001H9.75006L9.75006 4.50006Z"
                        fill="#2563EB"
                      />
                      <path
                        d="M8.25006 13.5001L6.96973 14.0305L3.96973 11.0305L5.03039 9.9698L6.75006 11.6895L6.75006 4.50013L8.25006 4.50013L8.25006 13.5001Z"
                        fill="#2563EB"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mt-8">
                  <div className="space-y-4">
                    <div className="mt-5 flex items-center justify-between rounded-xl border border-gray-300 bg-white px-5 py-3">
                      <div className="flex items-center gap-x-2 font-medium leading-6 text-gray-900 lg:text-xs">
                        <span>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9ZM8.25 6.75V5.25H9.75V6.75H8.25ZM8.25 12.75V8.25H9.75V12.75H8.25Z"
                              fill="#0D121F"
                            />
                          </svg>
                        </span>
                        <span>1 USDT = 1.00021 USDC</span>
                      </div>
                      <button className="flex items-center gap-x-1.5 font-medium leading-6 text-gray-900 lg:text-xs ">
                        <span>Advanced Setting</span>
                        <span>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6.00005 8.32582L2.55811 4.88388L3.44199 4L6.00005 6.55806L8.55811 4L9.44199 4.88388L6.00005 8.32582Z"
                              fill="#0D121F"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>

                    <button
                      onClick={deposit_base}
                      className="flex w-full items-center justify-center gap-x-3 rounded-[10px] bg-blue-600 py-4 text-white duration-200 hover:bg-blue-500"
                    >
                      <span>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.0625 10.3125L12 14.25L15.9375 10.3125"
                            fill="white"
                          />
                          <path
                            d="M8.0625 10.3125L12 14.25L15.9375 10.3125"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 3.75V14.25"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M20.25 14.25V19.5C20.25 19.6989 20.171 19.8897 20.0303 20.0303C19.8897 20.171 19.6989 20.25 19.5 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V14.25"
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
              </div> */}
              <div className="space-y-2">
                <div className="relative">
                  <div className="space-y-2">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center rounded-[10px] border border-gray-300 bg-white px-6 py-4">
                        <div className="w-1/2 space-y-2">
                          <input
                            type="number"
                            className="w-full px-2 text-2xl font-semibold leading-10 -tracking-[0.26px] rounded-lg focus:outline-none"
                            value={depositAmount}
                            onChange={(event) =>
                              setDepositAmount(+event.target.value)
                            }
                          />
                          {/* <div className="text-xs font-semibold leading-4 text-gray-500">
                            $1,206.73
                            <span className="text-red-600">(-0.0572%)</span>
                          </div> */}
                        </div>

                        <div className="space-y-2 w-[48%]">
                          {/* Dropdown with image */}
                          <div className="dropdown">
                            <div
                              className="dropdown-toggle"
                              onClick={() => toggleDropdown("deposit")}
                            >
                              {selectedDepositOption && (
                                <Image
                                  src={selectedDepositOption.image}
                                  alt={selectedDepositOption.label}
                                  className="dropdown-option-image rounded-full"
                                  width={24}
                                  height={24}
                                  objectFit="cover"
                                />
                              )}
                              <span className="dropdown-option-label pt-2">
                                {selectedDepositOption
                                  ? selectedDepositOption.label
                                  : "Select"}
                              </span>
                              <span className="dropdown-caret"></span>
                            </div>
                            <ul
                              className={`dropdown-menu ${isDropdownDepositOpen ? "open" : ""
                                }`}
                            >
                              {optionsDeposit.map((option, index) => (
                                <li
                                  key={index}
                                  onClick={() =>
                                    selectOption("deposit", option)
                                  }
                                >
                                  <Image
                                    src={option.image}
                                    alt={option.label}
                                    className="dropdown-option-image"
                                  />
                                  <span className="dropdown-option-label pt-2">
                                    {option.label}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {/* <p className="text-right text-xs font-medium leading-4 text-gray-300">
                            Balance: 1509.00
                          </p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-8">
                    <div className="space-y-4">
                      {/* <div className="mt-5 flex items-center justify-between rounded-xl border border-gray-300 bg-white px-5 py-3">
                        <div className="flex items-center gap-x-2 font-medium leading-6 text-gray-900 lg:text-xs">
                          <span>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9ZM8.25 6.75V5.25H9.75V6.75H8.25ZM8.25 12.75V8.25H9.75V12.75H8.25Z"
                                fill="#0D121F"
                              />
                            </svg>
                          </span>
                          1 USDT = 1.00021 USDC
                        </div>
                        <button className="flex items-center gap-x-1.5 font-medium leading-6 text-gray-900 lg:text-xs">
                          Advanced Setting
                          <span>
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M6.00005 8.32582L2.55811 4.88388L3.44199 4L6.00005 6.55806L8.55811 4L9.44199 4.88388L6.00005 8.32582Z"
                                fill="#0D121F"
                              />
                            </svg>
                          </span>
                        </button>
                      </div> */}

                      <button
                        id="onborda-step3"
                        onClick={async () => goToMakeBaseDeposit(1)}
                        className="flex w-full items-center justify-center gap-x-3 rounded-[10px] bg-blue-600 py-4 text-white duration-200 hover:bg-blue-500"
                      >
                        <span>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.0625 10.3125L12 14.25L15.9375 10.3125"
                              fill="white"
                            />
                            <path
                              d="M8.0625 10.3125L12 14.25L15.9375 10.3125"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 3.75V14.25"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M20.25 14.25V19.5C20.25 19.6989 20.171 19.8897 20.0303 20.0303C19.8897 20.171 19.6989 20.25 19.5 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V14.25"
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
              </div>
            </Tab.Panel>

            <Tab.Panel>
              <div className="space-y-2">
                <div className="relative">
                  <div className="space-y-2">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center rounded-[10px] border border-gray-300 bg-white px-6 py-4">
                        <div className="w-1/2 space-y-2">
                          <input
                            type="number"
                            className="w-full px-2 text-2xl font-semibold leading-10 -tracking-[0.26px] rounded-lg focus:outline-none"
                            value={withdrawAmount}
                            onChange={(event) =>
                              setWithdrawAmount(+event.target.value)
                            }
                          />
                          {/* <div className="text-xs font-semibold leading-4 text-gray-500">
                            $1,206.73
                            <span className="text-red-600">(-0.0572%)</span>
                          </div> */}
                        </div>

                        <div className="space-y-2 w-[48%]">
                          {/* Dropdown with image */}
                          <div className="dropdown">
                            <div
                              className="dropdown-toggle"
                              onClick={() => toggleDropdown("withdraw")}
                            >
                              {selectedWithdrawOption && (
                                <Image
                                  src={selectedWithdrawOption.image}
                                  alt={selectedWithdrawOption.label}
                                  className="dropdown-option-image"
                                  width={24}
                                  height={24}
                                />
                              )}
                              <span className="dropdown-option-label">
                                {selectedWithdrawOption
                                  ? selectedWithdrawOption.label
                                  : "Select"}
                              </span>
                              <span className="dropdown-caret"></span>
                            </div>
                            <ul
                              className={`dropdown-menu ${isDropdownWithdrawOpen ? "open" : ""
                                }`}
                            >
                              {optionsWithdraw.map((option, index) => (
                                <li
                                  key={index}
                                  onClick={() =>
                                    selectOption("withdraw", option)
                                  }
                                >
                                  <Image
                                    src={option.image}
                                    alt={option.label}
                                    className="dropdown-option-image"
                                  />
                                  <span className="dropdown-option-label">
                                    {option.label}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {/* <p className="text-right text-xs font-medium leading-4 text-gray-300">
                            Balance: 1509.00
                          </p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-8">
                    <div className="space-y-4">
                      {/* <div className="mt-5 flex items-center justify-between rounded-xl border border-gray-300 bg-white px-5 py-3">
                        <div className="flex items-center gap-x-2 font-medium leading-6 text-gray-900 lg:text-xs">
                          <span>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9ZM8.25 6.75V5.25H9.75V6.75H8.25ZM8.25 12.75V8.25H9.75V12.75H8.25Z"
                                fill="#0D121F"
                              />
                            </svg>
                          </span>
                          1 USDT = 1.00021 USDC
                        </div>
                        <button className="flex items-center gap-x-1.5 font-medium leading-6 text-gray-900 lg:text-xs">
                          Advanced Setting
                          <span>
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M6.00005 8.32582L2.55811 4.88388L3.44199 4L6.00005 6.55806L8.55811 4L9.44199 4.88388L6.00005 8.32582Z"
                                fill="#0D121F"
                              />
                            </svg>
                          </span>
                        </button>
                      </div> */}

                      <button
                        id="onborda-step5"
                        onClick={async () => goToWithdrawBase(2)}
                        className="flex w-full items-center justify-center gap-x-3 rounded-[10px] bg-blue-600 py-4 text-white duration-200 hover:bg-blue-500"
                      >
                        <span>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.0625 10.3125L12 14.25L15.9375 10.3125"
                              fill="white"
                            />
                            <path
                              d="M8.0625 10.3125L12 14.25L15.9375 10.3125"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 3.75V14.25"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M20.25 14.25V19.5C20.25 19.6989 20.171 19.8897 20.0303 20.0303C19.8897 20.171 19.6989 20.25 19.5 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V14.25"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        Withdraw
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>

        {/* <div className="mt-8">
                                <div className="space-y-4">
                                    <div className="mt-5 flex items-center justify-between rounded-xl border border-gray-300 bg-white px-5 py-3">
                                        <div className="flex items-center gap-x-2 font-medium leading-6 text-gray-900 lg:text-sm">
                                            <span>
                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9ZM8.25 6.75V5.25H9.75V6.75H8.25ZM8.25 12.75V8.25H9.75V12.75H8.25Z"
                                                        fill="#0D121F"
                                                    />
                                                </svg>
                                            </span>
                                            1 USDT = 1.00021 USDC
                                        </div>
                                        <button className="flex items-center gap-x-1.5 font-medium leading-6 text-gray-900 lg:text-sm">
                                            Advanced Setting
                                            <span>
                                                <svg
                                                    width="12"
                                                    height="12"
                                                    viewBox="0 0 12 12"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M6.00005 8.32582L2.55811 4.88388L3.44199 4L6.00005 6.55806L8.55811 4L9.44199 4.88388L6.00005 8.32582Z"
                                                        fill="#0D121F"
                                                    />
                                                </svg>
                                            </span>
                                        </button>
                                    </div>

                                    <button className="flex w-full items-center justify-center gap-x-3 rounded-[10px] bg-blue-600 py-4 text-white duration-200 hover:bg-blue-500">
                                        <span>
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M8.0625 10.3125L12 14.25L15.9375 10.3125"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M8.0625 10.3125L12 14.25L15.9375 10.3125"
                                                    stroke="white"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M12 3.75V14.25"
                                                    stroke="white"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M20.25 14.25V19.5C20.25 19.6989 20.171 19.8897 20.0303 20.0303C19.8897 20.171 19.6989 20.25 19.5 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V14.25"
                                                    stroke="white"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                        Draw
                                    </button>
                                </div>
                            </div> */}
      </div>
    </div>
  );
}

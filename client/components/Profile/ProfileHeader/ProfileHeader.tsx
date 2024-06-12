"use client";
import Link from "next/link";
import { Fragment, useEffect, useState, useCallback } from "react";
import SUIWalletIcon from "@/icons/SUIWalletIcon";
import KlayIcon from "@/icons/KlayIcon";

import AlgorandIcon from "@/icons/AlgorandIcon";
import ArbitrumIcon from "@/icons/ArbitrumIcon";
import Down from "@/icons/Down";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import SUIWallet from "@/icons/SUIWalletIcon";
import GoogleIcon from "@/icons/GoogleIcon";
import queryString from "query-string";
import toast from "react-hot-toast";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import {
  genAddressSeed,
  generateNonce,
  generateRandomness,
  getExtendedEphemeralPublicKey,
  getZkLoginSignature,
  jwtToAddress,
} from "@mysten/zklogin";

import { JwtPayload, jwtDecode } from "jwt-decode";
import axios from "axios";
import { SuiClient } from "@mysten/sui.js/client";
import digitrustLogo from "@/assets/images/digitrust_white.png";
import Image from "next/image";
import MenuIcon from "@/icons/MenuIcon";
import ExitIcon from "@/icons/ExitIcon";
import AptosIcon from "@/icons/AptosIcon";

const suiClient = new SuiClient({
  url: process.env.NEXT_PUBLIC_FULLNODE_URL as string,
});

export default function ProfileHeader() {
  const [ephemeralKeyPair, setEphemeralKeyPair] = useState<Ed25519Keypair>();
  const [currentEpoch, setCurrentEpoch] = useState("");
  const [maxEpoch, setMaxEpoch] = useState(0);
  const [nonce, setNonce] = useState("");
  const [jwtString, setJwtString] = useState("");
  const [decodedJwt, setDecodedJwt] = useState<JwtPayload>();
  const [randomness, setRandomness] = useState("");
  const [userSalt, setUserSalt] = useState<string>();
  const [zkLoginUserAddress, setZkLoginUserAddress] = useState("");
  const [oauthParams, setOauthParams] =
    useState<queryString.ParsedQuery<string>>();
  const [email, setEmail] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(
    <>
      <SUIWalletIcon />
      Sui
      <Down />
    </>
  );
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";
  const [point, setPoint] = useState(0);

  useEffect(() => {
    const getOauthParams = async () => {
      const location = window.location.hash;
      if (location != null && location != "") {
        const res = queryString.parse(location);
        console.log(res);
        setOauthParams(res);
      } else {
        setEmail(window.localStorage.getItem("userEmail") as string);
        setZkLoginUserAddress(
          window.localStorage.getItem("userAddress") as string
        );
      }
    };
    getOauthParams();
  }, []);

  const logOutWallet = () => {
    setZkLoginUserAddress("");
    setEmail("");
    window.localStorage.setItem("userEmail", "");
    window.localStorage.setItem("userAddress", "");
    window.location.hash = "";
  };

  const beginZkLogin = async () => {
    var myToast = toast.loading("Getting key pair...");
    const ephemeralKeyPair = Ed25519Keypair.generate();
    window.sessionStorage.setItem(
      process.env.NEXT_PUBLIC_KEY_PAIR_SESSION_STORAGE_KEY as string,
      ephemeralKeyPair.export().privateKey
    );
    setEphemeralKeyPair(ephemeralKeyPair);
    console.log(ephemeralKeyPair);

    //Get epoch
    const { epoch } = await suiClient.getLatestSuiSystemState();

    setCurrentEpoch(epoch);
    window.localStorage.setItem(
      process.env.NEXT_PUBLIC_MAX_EPOCH_LOCAL_STORAGE_KEY as string,
      String(Number(epoch) + 10)
    );
    console.log(currentEpoch);
    setMaxEpoch(Number(epoch) + 10);
    console.log("currentEpoch", currentEpoch);

    //Get randomness
    const randomness = generateRandomness();
    console.log("randomness:", randomness);

    //Set Nonce
    const newNonce = generateNonce(
      ephemeralKeyPair.getPublicKey(),
      maxEpoch,
      randomness
    );
    setNonce(newNonce);
    console.log(nonce);

    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID as string,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI as string,
      response_type: "id_token",
      scope: "openid email",
      nonce: newNonce,
    });
    // const loginURL = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
    // window.location.replace(loginURL);
    // toast.dismiss(myToast);

    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_OPENID_PROVIDER_URL as string
      );
      const authUrl = `${data.authorization_endpoint}?${params}`;
      window.location.href = authUrl;
      toast.dismiss(myToast);
    } catch (error) {
      console.error("Error initiating Google login:", error);
      toast.dismiss(myToast);
    }
  };

  useEffect(() => {
    const getUserAddress = async () => {
      if (oauthParams && oauthParams?.id_token) {
        console.log("login google");
        const NewdecodedJwt = jwtDecode(oauthParams.id_token as string);
        console.log("Decode token:", NewdecodedJwt);
        console.log("Your email", NewdecodedJwt?.email);
        window.localStorage.setItem("userEmail", NewdecodedJwt?.email);
        setEmail(NewdecodedJwt?.email);

        setJwtString(oauthParams?.id_token as string);
        setDecodedJwt(NewdecodedJwt);
        setTimeout(() => {
          var salt = window.localStorage.getItem("demo_user_salt_key_pair");
          if (salt == null && salt == "") {
            salt = generateRandomness();
            console.log("New salt is:", salt);
          } else {
            console.log("Current salt is:", salt);
          }

          const jw = oauthParams?.id_token as string;
          window.localStorage.setItem(
            process.env.NEXT_PUBLIC_USER_SALT_LOCAL_STORAGE_KEY as string,
            salt as string
          );

          setUserSalt(salt as string);
          if (!salt) {
            console.log("Not detect salt!");
            return;
          }
          console.log(jw);
          const NewzkLoginUserAddress = jwtToAddress(jw, salt);
          setZkLoginUserAddress(NewzkLoginUserAddress);
          console.log(NewzkLoginUserAddress);
          window.localStorage.setItem("userAddress", NewzkLoginUserAddress);
        }, 300);
      }
    };
    getUserAddress();
  }, [oauthParams]);

  useEffect(() => {
    const getFaucet = async () => {
      console.log("Your address is:", zkLoginUserAddress);
    };
    getFaucet();
  }, [zkLoginUserAddress]);

  return (
    <Fragment>
      <header className="font-feature-settings bg-blue-600 text-sm font-medium capitalize leading-normal text-white xl:text-base">
        <div className="container mx-auto py-[18px] xl:px-0">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex flex-1 justify-start">
              <Link className="h-auto w-32 xl:w-44" href="/">
                <Image src={digitrustLogo} alt="digitrust logo" height={50} />
              </Link>
            </div>

            {/* Navigations */}
            <nav className="hidden lg:block justify-items-center">
              <ul className="flex gap-x-10">
                {[
                  ["1", "Product", "/"],
                  ["2", "Community", "/"],
                  ["3", "Resources", "/"],
                  ["4", "About Us", "/"],
                ].map(([id, title, url]) => (
                  <li key={id}>
                    <Link href={url}>{title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Dropdown
              showArrow
              radius="sm"
              classNames={{
                base: "before:bg-default-200", // change arrow background
                content: "p-0 border-small border-divider bg-background",
              }}
            >
              <DropdownTrigger>
                <Button isIconOnly variant="ghost" disableRipple>
                  <MenuIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Custom item styles"
                className="p-3"
                itemClasses={{
                  base: [
                    "rounded-md",
                    "text-default-500",
                    "transition-opacity",
                    "data-[hover=true]:text-foreground",
                    "data-[hover=true]:bg-default-100",
                    "dark:data-[hover=true]:bg-default-50",
                    "data-[selectable=true]:focus:bg-default-50",
                    "data-[pressed=true]:opacity-70",
                    "data-[focus-visible=true]:ring-default-500",
                  ],
                }}
              >
                <DropdownSection hidden={zkLoginUserAddress != ""}>
                  <DropdownItem
                    isReadOnly
                    key="login"
                    className="gap-2 opacity-100  bg-white hover:bg-gray-100"
                  >
                    <button
                      className="grid grid-row-auto grid-flow-col mb-2"
                      onClick={async () => beginZkLogin()}
                    >
                      <GoogleIcon />
                      <span className="text-blue-600 font-bold mx-2">
                        Google login
                      </span>
                    </button>
                  </DropdownItem>
                </DropdownSection>

                <DropdownSection
                  className="py-1"
                  showDivider
                  hidden={zkLoginUserAddress == ""}
                >
                  <DropdownItem
                    isReadOnly
                    key="info"
                    className="h-14 gap-2 opacity-100  bg-white hover:bg-gray-100 py-2"
                  >
                    <div className="text-center">
                      <span className="font-bold text-3xl">{point}</span>
                      <span className="font-bold text-sm">DGT</span>
                    </div>
                    <div className="grid grid-row-auto grid-flow-col">
                      <GoogleIcon />
                      <span className="text-blue-600 font-bold px-1">
                        <div className="px-1">{email}</div>
                        <div className="bg-gray-500 text-white px-1">
                          {zkLoginUserAddress?.substring(0, 16)}....
                        </div>
                      </span>
                    </div>
                  </DropdownItem>
                </DropdownSection>

                <DropdownSection
                  className="py-2"
                  showDivider
                  hidden={zkLoginUserAddress == ""}
                >
                  <DropdownItem key="profile">
                    <Link href={"/profile"} className="hover:text-blue-400">
                      Profile
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="history">
                    <Link href={"/history"} className="hover:text-blue-400">
                      History
                    </Link>
                  </DropdownItem>
                  <DropdownItem
                    isReadOnly
                    key="chain"
                    className="cursor-default"
                    endContent={
                      <Dropdown>
                        <DropdownTrigger>
                          <div className="flex items-center rounded-lg bg-white px-0 text-blue-600">
                            {selectedKeys}
                          </div>
                        </DropdownTrigger>
                        <DropdownMenu
                          aria-label="Single selection example"
                          variant="flat"
                          disallowEmptySelection
                          selectionMode="single"
                        >
                          <DropdownItem
                            key="suidevnet"
                            startContent={<SUIWallet className={iconClasses} />}
                            onClick={() =>
                              setSelectedKeys(
                                <>
                                  <SUIWallet className={iconClasses} />
                                  Sui
                                  <Down />
                                </>
                              )
                            }
                          >
                            Sui
                          </DropdownItem>
                          <DropdownItem
                            key="klaytntestnet"
                            startContent={<KlayIcon className={iconClasses} />}
                            onClick={() =>
                              setSelectedKeys(
                                <>
                                  <KlayIcon className={iconClasses} />
                                  Klaytn
                                  <Down />
                                </>
                              )
                            }
                          >
                            Klaytn
                          </DropdownItem>
                          <DropdownItem
                            key="aptos"
                            startContent={<AptosIcon className={iconClasses} />}
                            onClick={() =>
                              setSelectedKeys(
                                <>
                                  <ArbitrumIcon className={iconClasses} />
                                  Aptos
                                  <Down />
                                </>
                              )
                            }
                          >
                            Aptos
                          </DropdownItem>
                          <DropdownItem
                            key="algorandtestnet"
                            startContent={
                              <AlgorandIcon className={iconClasses} />
                            }
                            onClick={() =>
                              setSelectedKeys(
                                <>
                                  <AlgorandIcon className={iconClasses} />
                                  Algorand
                                  <Down />
                                </>
                              )
                            }
                          >
                            Algorand
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    }
                  >
                    Chain
                  </DropdownItem>
                </DropdownSection>

                <DropdownSection showDivider hidden={zkLoginUserAddress == ""}>
                  <DropdownItem key="logout">
                    <button
                      className="grid grid-row-auto grid-flow-col"
                      onClick={async () => logOutWallet()}
                    >
                      <ExitIcon />
                      <span className="text-blue-600 font-bold px-2">
                        Log Out
                      </span>
                    </button>
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>

            {/* <div className="flex flex-1 ml-5 justify-end">
                            <div className="flex items-center gap-x-[10px] rounded-lg bg-white px-6 py-4 text-blue-600">
                                <span>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M3.125 5V15C3.125 15.3315 3.2567 15.6495 3.49112 15.8839C3.72554 16.1183 4.04348 16.25 4.375 16.25H16.875C17.0408 16.25 17.1997 16.1842 17.3169 16.0669C17.4342 15.9497 17.5 15.7908 17.5 15.625V6.875C17.5 6.70924 17.4342 6.55027 17.3169 6.43306C17.1997 6.31585 17.0408 6.25 16.875 6.25H4.375C4.04348 6.25 3.72554 6.1183 3.49112 5.88388C3.2567 5.64946 3.125 5.33152 3.125 5ZM3.125 5C3.125 4.66848 3.2567 4.35054 3.49112 4.11612C3.72554 3.8817 4.04348 3.75 4.375 3.75H15"
                                            stroke="#2563EB"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M14.0625 12.0312C14.494 12.0312 14.8438 11.6815 14.8438 11.25C14.8438 10.8185 14.494 10.4688 14.0625 10.4688C13.631 10.4688 13.2812 10.8185 13.2812 11.25C13.2812 11.6815 13.631 12.0312 14.0625 12.0312Z"
                                            fill="#2563EB"
                                        />
                                    </svg>
                                </span>
                                <div>
                                    <div className="grid grid-cols-2 gap-1 text-xs">
                                     { zkLoginUserAddress == ""?
                                            <button className="flex items-center px-0.5 bg-white hover:bg-gray-100 rounded-md drop-shadow-md"
                                                onClick={async() => beginZkLogin()}>
                                            <GoogleIcon/>
                                            <span className="text-blue-600 font-bold">LOGIN</span>
                                            </button>: 
                                            <>
                                             <div>
                                                    <Link href={"/history"}  className="mr-2 hover:text-blue-400">History</Link>
                                                    <b className="ml-2">|</b>
                                                    <Link className="ml-2" href={"/profile"}>Profile</Link>
                                                </div>
                                                <button className="flex bg-white hover:bg-gray-100 rounded-md drop-shadow-md"
                                                    onClick={async() => logOutWallet()}>
                                                <GoogleIcon/>
                                                <div className="text-blue-600 font-bold px-1.5">
                                                    <div className="px-1">
                                                        {email}
                                                    </div>
                                                    <div className="bg-gray-500 text-white px-1">
                                                        100 DGT
                                                    </div>
                                                </div>
                                                </button>
                                            </>
                                           
                                        }
                                        <div className='ml-1'>
                                            <Dropdown>
                                                <DropdownTrigger>
                                                    <div className="flex items-center gap-x-[2px] rounded-lg bg-white px-0 py-0 text-blue-600">
                                                        {selectedKeys}
                                                    </div>
                  
                                                </DropdownTrigger>
                                                <DropdownMenu 
                                                    aria-label="Single selection example"
                                                    variant="flat"
                                                    disallowEmptySelection
                                                    selectionMode="single"
                                                >
                                                    <DropdownItem key="suidevnet"  startContent={<SUIWallet className={iconClasses} />} onClick={()=>setSelectedKeys(<><SUIWallet className={iconClasses}/>Sui devnet<Down/></>)}>
                                                        Sui
                                                    </DropdownItem>
                         
                                                    <DropdownItem key="klaytntestnet"  startContent={<KlayIcon className={iconClasses} />} onClick={()=>setSelectedKeys(<><KlayIcon className={iconClasses}/>Klaytn testnet<Down/></>)} >
                                                        Klaytn
                                                    </DropdownItem>
                               
                                                    <DropdownItem key="arbitrumtestnet"  startContent={<ArbitrumIcon className={iconClasses} />} onClick={()=>setSelectedKeys(<><ArbitrumIcon className={iconClasses}/>Arbitrum testnet<Down/></>)}>
                                                        Arbitrum
                                                    </DropdownItem>
                           
                                                    <DropdownItem key="algorandtestnet"  startContent={<AlgorandIcon className={iconClasses} />} onClick={()=>setSelectedKeys(<><AlgorandIcon className={iconClasses}/>Algorand testnet<Down/></>)}>
                                                        Algorand
                                                    </DropdownItem>
                                 
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>           
                                    </div>
                                </div> 
                            </div>
                        </div> */}
          </div>
        </div>
      </header>
    </Fragment>
  );
}

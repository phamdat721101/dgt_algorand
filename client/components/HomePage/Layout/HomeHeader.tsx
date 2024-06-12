"use client";
import Link from "next/link";
import { useOnborda } from "onborda";
import { Fragment, useEffect, useState, useMemo } from "react";
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
import AptosIcon from "@/icons/AptosIcon";
import GoogleIcon from "@/icons/GoogleIcon";
import toast from "react-hot-toast";
import queryString from "query-string";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
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
import { fromB64 } from "@mysten/bcs";
import axios from "axios";
import Image from "next/image";
import digitrustLogo from "@/assets/images/digitrust.png";
import MenuIcon from "@/icons/MenuIcon";
import ExitIcon from "@/icons/ExitIcon";

// const [oauthParams, setOauthParams] = useState<queryString.ParsedQuery<string>>();
const suiClient = new SuiClient({
  url: process.env.NEXT_PUBLIC_FULLNODE_URL as string,
});

const navLinks = [
  {
    id: 1,
    title: "Marketplace",
    link: "/",
  },

  {
    id: 2,
    title: "My Portfolio",
    link: "/",
  },

  {
    id: 3,
    title: "Manage",
    link: "/",
  },

  {
    id: 4,
    title: "About Us",
    link: "/",
  },
];

export default function Header() {
  const { startOnborda } = useOnborda();
  const handleStartOnborda = () => {
    startOnborda();
  };

  const [selectedKeys, setSelectedKeys] = useState(
    <>
      <SUIWalletIcon />
      Sui
      <Down />
    </>
  );
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  //zkLogin
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
  const [point, setPoint] = useState(0);

  useEffect(() => {
    const getOauthParams = async () => {
      const location = window.location.hash;
      if (location != null && location != "") {
        const res = queryString.parse(location);
        console.log(res);
        setTimeout(() => {
          setOauthParams(res);
        }, 300);
      } else if ((window.localStorage.getItem("userEmail") as string) != "") {
        setEmail(window.localStorage.getItem("userEmail") as string);
        setZkLoginUserAddress(
          window.localStorage.getItem("userAddress") as string
        );
      } else return;
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

        // setJwtString(oauthParams?.id_token as string);
        // setDecodedJwt(NewdecodedJwt);
        // setTimeout(() => {
        //   var salt = window.localStorage.getItem('demo_user_salt_key_pair');
        //   if(salt == null && salt == ''){
        //     salt = generateRandomness();
        //     console.log('New salt is:',salt);
        //   }
        //   else
        //   {
        //     console.log('Current salt is:',salt);
        //   }

        //   const jw = oauthParams?.id_token as string;
        //   window.localStorage.setItem(
        //     process.env.NEXT_PUBLIC_USER_SALT_LOCAL_STORAGE_KEY as string,
        //     salt as string
        //   );

        //   setUserSalt(salt as string);
        //   if (!salt) {
        //     console.log('Not detect salt!');
        //     return;
        //   }

        //   if (!jw) {
        //     console.log('Not detect jw!');
        //     return;
        //   }
        //   const NewzkLoginUserAddress = jwtToAddress(jw, salt);
        //   setZkLoginUserAddress(NewzkLoginUserAddress);
        //   console.log(NewzkLoginUserAddress);
        //   window.localStorage.setItem("userAddress",NewzkLoginUserAddress);
        // }, 300);
      }
    };
    getUserAddress();
  }, [oauthParams]);

  // useEffect(() => {
  //   const getFaucet = async () => {
  //     console.log("Your address is:",zkLoginUserAddress)
  //     if(window.localStorage.getItem(zkLoginUserAddress) != "1" && window.localStorage.getItem('userAddress') != null)
  //       {
  //         startOnborda();
  //         window.localStorage.setItem(zkLoginUserAddress,"1");
  //       }
  //   }
  //   getFaucet();
  // }, [zkLoginUserAddress]);

  useEffect(() => {
    const getFaucet = async () => {
      // console.log("Your address is:",email)
      // if(email != null)
      //   {
      //     startOnborda();
      //   }
    };
    getFaucet();
  }, [email]);

  return (
    <Fragment>
      <header className="flex items-center justify-between px-[20px] py-[18px] text-sm xl:px-[120px] xl:text-base bg-white">
        {/* Logo */}
        <div>
          <Link href="/">
            <Image src={digitrustLogo} alt="digitrust logo" height={50} />
          </Link>
        </div>

        {/* Navigations */}
        <nav className="hidden lg:block ml-20">
          <ul className="flex justify-cente gap-x-10">
            {navLinks.map((item) => (
              <li>
                <Link
                  className="capitalize duration-300 hover:text-blue-600"
                  href={item.link}
                  key={item.id}
                >
                  {item.title}
                </Link>
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
            <DropdownSection hidden={email != ""}>
              <DropdownItem
                isReadOnly
                key="login"
                className="gap-2 opacity-100  bg-white hover:bg-gray-100"
              >
                <button
                  className="grid grid-row-auto grid-flow-col"
                  onClick={async () => beginZkLogin()}
                >
                  <GoogleIcon />
                  <span className="text-blue-600 font-bold mx-2">
                    Google login
                  </span>
                </button>
              </DropdownItem>
            </DropdownSection>

            <DropdownSection className="py-1" showDivider hidden={email == ""}>
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
                    {/* <div className="bg-gray-500 text-white px-1">
                      {zkLoginUserAddress?.substring(0,16)}....
                    </div> */}
                  </span>
                </div>
              </DropdownItem>
            </DropdownSection>

            <DropdownSection className="py-2" showDivider hidden={email == ""}>
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
                        startContent={<AlgorandIcon className={iconClasses} />}
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

            <DropdownSection showDivider hidden={email == ""}>
              <DropdownItem key="logout">
                <button
                  className="grid grid-row-auto grid-flow-col"
                  onClick={async () => logOutWallet()}
                >
                  <ExitIcon />
                  <span className="text-blue-600 font-bold px-2">Log Out</span>
                </button>
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>

        {/* <div className="flex justify-end px-1">
              <div className="flex items-center rounded-lg bg-blue-600 px-1 py-1 text-white">
                  <div>
                      <div className="grid grid-cols-1 gap-1 text-xs">
                          { zkLoginUserAddress == ""?
                            <button className="flex items-center px-0.5 bg-white hover:bg-gray-100 rounded-md drop-shadow-md"
                                  onClick={async() => beginZkLogin()}>
                              <GoogleIcon/>
                              <span className="text-blue-600 font-bold">LOGIN</span>
                            </button>: 
                            <>
                               {zkLoginUserAddress != ''  ? (
                                <div>
                                    <Link href={"/history"}  className="mr-2 hover:text-blue-400">History</Link>
                                    <b className="ml-2">|</b>
                                    <Link className="ml-2" href={"/profile"}>Profile</Link>
                                </div>
                                ):(<div></div>)}
                                <button className="flex bg-white hover:bg-gray-100 rounded-md"
                                  onClick={async() => logOutWallet()}>
                                  <GoogleIcon/>
                                  <div className="text-blue-600 font-bold px-1.5">
                                    <div className="px-1">
                                      {email.split('@')[0]}
                                    </div>
                                    <div className="bg-gray-500 text-white px-1">
                                      100 DGT
                                    </div>
                                  </div>
                                </button>
                            </>
                            
                          }
                          <div>
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
                                      <DropdownItem key="suidevnet"  startContent={<SUIWallet className={iconClasses} />} onClick={()=>setSelectedKeys(<><SUIWallet className={iconClasses}/>Sui<Down/></>)}>
                                          Sui
                                      </DropdownItem>
                                      <DropdownItem key="klaytntestnet"  startContent={<KlayIcon className={iconClasses} />} onClick={()=>setSelectedKeys(<><KlayIcon className={iconClasses}/>Klaytn<Down/></>)} >
                                          Klaytn
                                      </DropdownItem>
                                      <DropdownItem key="aptos"  startContent={<AptosIcon className={iconClasses} />} onClick={()=>setSelectedKeys(<><ArbitrumIcon className={iconClasses}/>Aptos<Down/></>)}>
                                      Aptos
                                      </DropdownItem>
                                      <DropdownItem key="algorandtestnet"  startContent={<AlgorandIcon className={iconClasses} />} onClick={()=>setSelectedKeys(<><AlgorandIcon className={iconClasses}/>Algorand<Down/></>)}>
                                          Algorand
                                      </DropdownItem>
                                  </DropdownMenu>
                              </Dropdown>
                          </div>           
                      </div>
                  </div> 
              </div>
          </div> */}
      </header>
    </Fragment>
  );
}

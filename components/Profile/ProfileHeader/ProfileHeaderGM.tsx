"use client";
import Link from "next/link";
import { useOnborda } from "onborda";
import { Fragment, useEffect, useState, useMemo } from "react";
import SUIWalletIcon from "@/icons/SUIWalletIcon";
import KlayIcon from "@/icons/KlayIcon";
import { useFormatter } from "next-intl";
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
import digitrustWhiteLogo from "@/assets/images/digitrust_white.png";
import digitrustNoTextWhiteLogo from "@/assets/images/digitrust_white_notext.png";
import digitrustLogo from "@/assets/images/digitrust.png";
import digitrustNoTextLogo from "@/assets/images/digitrust_notext.png";
import MenuIcon from "@/icons/MenuIcon";
import ExitIcon from "@/icons/ExitIcon";
import WalletIcon from "@/icons/WalletIcon";
import { scriptURLPost, scriptURLGet } from "@/constants/google";
import { setBalance } from "viem/actions";
import ProfileIcon from "@/icons/ProfileIcon";
import HistoryIcon from "@/icons/HistoryIcon";
import Hot from "@/assets/images/Hot.png";
import { useGlobalContext } from "@/Context/store";

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

// async function generateAddress(account_id: string, address_id: string) {
//   const evmURL = `https://dgt-dev.vercel.app/v1/evm_adr?account_id=${account_id}&address_id=${address_id}`;
//   const resEVM = await fetch(evmURL);
//   const evmAddress = await resEVM.json();

//   return { evmAddress };
// }

// async function generateAPTAddress(account_id: string) {
//   const apturl = `https://dgt-dev.vercel.app/v1/apt_adr?account_id=${account_id}`;
//   const resApt = await fetch(apturl);
//   const aptAddress = await resApt.json();

//   return { aptAddress };
// }

async function generateAlgorandAddress(email: string) {
  const url = `https://dgt-dev.vercel.app/v1/algo_Adr?email=${email}`;
  const res = await fetch(url);
  const algoAddress = await res.json();

  return { algoAddress };
}

async function getBalance(_email: string) {
  const url = `https://dgt-dev.vercel.app/v1/user_balance?email=${_email}`;
  const resApt = await fetch(url);
  const balance = await resApt.json();

  return { balance };
}

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

export default function Header(props: { isHome: boolean }) {
  const format = useFormatter();
  const { startOnborda } = useOnborda();
  const { userEmail, setUserEmail } = useGlobalContext();
  const handleStartOnborda = () => {
    startOnborda();
  };

  const [selectedKeys, setSelectedKeys] = useState(
    <>
      <AlgorandIcon />
      Algorand
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
  const [walletAddress, setWalletAddress] = useState("");
  const [point, setPoint] = useState(0);

  useEffect(() => {
    const getOauthParams = async () => {
      // let curEmail = window.localStorage.getItem("userEmail");
      let curEmail = userEmail;
      const location = window.location.hash;
      if (
        location != null &&
        location != "" &&
        (curEmail == "" || curEmail == null)
      ) {
        const res = queryString.parse(location);
        setOauthParams(res);
      } else if (curEmail != "" && curEmail != null) {
        let myToast = toast.loading("Loading...");
        setEmail(curEmail != null ? curEmail : "");
        toast.dismiss(myToast);
      } else return;
    };
    getOauthParams();
  }, []);

  const logOutWallet = () => {
    setEmail("");
    window.location.hash = "";
    // window.location.href = window.location.origin + "/home";
  };

  const beginZkLogin = async () => {
    var myToast = toast.loading("Getting key pair...");
    const ephemeralKeyPair = Ed25519Keypair.generate();
    window.sessionStorage.setItem(
      process.env.NEXT_PUBLIC_KEY_PAIR_SESSION_STORAGE_KEY as string,
      ephemeralKeyPair.export().privateKey
    );
    setEphemeralKeyPair(ephemeralKeyPair);

    //Get epoch
    const { epoch } = await suiClient.getLatestSuiSystemState();

    setCurrentEpoch(epoch);
    window.localStorage.setItem(
      process.env.NEXT_PUBLIC_MAX_EPOCH_LOCAL_STORAGE_KEY as string,
      String(Number(epoch) + 10)
    );
    console.log(currentEpoch);
    setMaxEpoch(Number(epoch) + 10);

    //Get randomness
    const randomness = generateRandomness();

    //Set Nonce
    const newNonce = generateNonce(
      ephemeralKeyPair?.getPublicKey(),
      maxEpoch,
      randomness
    );
    setNonce(newNonce);

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
      if (oauthParams && oauthParams?.id_token && email == "") {
        const myToast = toast.loading("Loading your account...");

        const NewdecodedJwt = jwtDecode(oauthParams.id_token as string);

        const url = `${scriptURLGet}?email=${NewdecodedJwt?.email}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data == null) {
          //Get EVM address
          // const account_id = generateRandomness().substring(0, 4);
          // const address_id = generateRandomness().substring(0, 3);

          // const { evmAddress } = await generateAddress(account_id, address_id);

          // const { aptAddress } = await generateAPTAddress(account_id);

          //Get Algorand address
          const { algoAddress } = await generateAlgorandAddress(NewdecodedJwt?.email);

          if (algoAddress != null) {
            const form = {
              Email: NewdecodedJwt?.email,
              AlgorandAddress: algoAddress.address,
              Date: new Date(),
            };

            var keyValuePairs = [];

            for (let [key, value] of Object.entries(form)) {
              keyValuePairs.push(key + "=" + value);
            }

            var formDataString = keyValuePairs.join("&");

            const response = await fetch(scriptURLPost, {
              redirect: "follow",
              mode: "no-cors",
              method: "POST",
              body: formDataString,
              headers: {
                "Content-Type": "text/plain;charset=utf-8",
              },
            });
            setEmail(NewdecodedJwt?.email);
            await postData("https://dgt-dev.vercel.app/v1/claim_token", {
              receiver: NewdecodedJwt?.email,
              amount: 1024,
              created_at: new Date(),
              email: NewdecodedJwt?.email,
            }).then((data) => {
              console.log(data); // JSON data parsed by `data.json()` call
              toast.success(
                "Claim your first token success!\n Let's try Digitrust!",
                {
                  style: {
                    maxWidth: "900px",
                  },
                  duration: 5000,
                }
              );
              //startOnborda();
            });
          }
        } else {
          setEmail(data?.email);
        }
        window.location.hash = "";
        toast.dismiss(myToast);
      }
    };
    getUserAddress();
  }, [oauthParams]);

  useEffect(() => {
    // window.localStorage.setItem("userEmail", email);
    setUserEmail(email);
    // window.localStorage.setItem("userEmail", email);
    setUserEmail(email);
    async function updateBalance() {
      const { balance } = await getBalance(email);
      if (balance != null)
        setPoint(balance?.amount);
    }

    if (email != '') {
      updateBalance();
    }
  }, [email]);

  useEffect(() => {
    const email = window.localStorage.getItem("userEmail");
    async function getWalletAddress(email: string) {
      const url = `${scriptURLGet}?email=${email}`;
      const res = await fetch(url);
      const data = await res.json();
      setWalletAddress(data.wallet)
    }

    if (email != '') {
      getWalletAddress(email || "");
    }
  }, [email]);

  const classes = `flex items-center justify-between px-[35px] py-[18px] text-sm xl:px-[120px] xl:text-base ${props.isHome ? "bg-white" : "bg-blue-600 text-white"
    }`;

  return (
    <Fragment>
      {email == '' && <div className="bg-blue-400 text-white flex items-center justify-center py-2">
        <Image
          src={Hot}
          alt="hot logo"
          height={30}
          className="animate-pulse"
        />
        <p>Login now and get a valuable gift worth 100 DGT!</p>
        <Image
          src={Hot}
          alt="hot logo"
          height={30}
          className="animate-pulse"
        />
      </div>
      }
      <header className={classes}>
        {/* Logo */}
        <div>
          {props.isHome ? (
            <Link href="/">
              <Image
                src={digitrustLogo}
                alt="digitrust logo"
                height={50}
                className="hidden sm:block"
              />
            </Link>
          ) : (
            <Link href="/">
              <Image
                src={digitrustWhiteLogo}
                alt="digitrust logo"
                height={50}
                className="hidden sm:block"
              />
            </Link>
          )}
          {props.isHome ? (
            <Link href="/">
              <Image
                src={digitrustNoTextLogo}
                alt="digitrust logo"
                className="sm:hidden object-fit"
                width={60}
              />
            </Link>
          ) : (
            <Link href="/">
              <Image
                src={digitrustNoTextWhiteLogo}
                alt="digitrust logo"
                className="sm:hidden object-fit"
                width={60}
              />
            </Link>
          )}
        </div>

        {/* Navigations */}
        {/*<nav className="hidden lg:block ml-20">
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
        </nav>*/}
        {email != "" &&
          <nav className={`hidden sm:block pt-3 ${props.isHome ? "" : "text-white"}`}>
            <ul className="flex justify-center gap-x-10"><li key={'profile'}><Link className="ml-2" href={"/profile"}>Profile</Link></li>
              <li key={'logout'}><button className="astext ml-2" onClick={logOutWallet}>Log out</button></li></ul>
          </nav>
        }
        {email == "" ? (
          <button
            className=" bg-white border-solid border-1 rounded-md hover:bg-gray-50"
            onClick={async () => beginZkLogin()}
          >
            <div className="grid grid-row-auto grid-flow-col my-2 mx-2">
              <GoogleIcon />
              <span className="text-blue-500 mx-2">Google login</span>
            </div>
          </button>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden sm:block">
              <div className="flex flex-1 justify-end gap-x-3 ">


                <div className={`flex items-center pt-3 capitalize w-fit ${props.isHome ? "text-blue-600" : "text-white"}`}>
                  <WalletIcon></WalletIcon>
                  <span className="font-bold pl-2">
                    <div className="px-1">{`${walletAddress.slice(0, 4)}...${walletAddress.slice(-5, -1)}`}</div>
                  </span>
                </div>

                <div className={`flex items-center rounded-lg px-3 py-1 gap-x-2 ${props.isHome ? "border border-blue-600 text-white" : "bg-white text-blue-600"}`}>


                  <div className="flex items-center gap-x-2">
                    <button
                      className=" bg-white rounded-md"
                    >
                      <div className="grid grid-row-auto grid-flow-col mx-1 my-1">
                        <GoogleIcon />
                        <span className="text-blue-600 font-bold mx-2">
                          <div>
                            {email.replace("@gmail.com", "")}
                          </div>
                        </span>
                      </div>
                    </button>
                    <div className="text-gray-400 font-bold">
                      {format.number(point)} DGT
                    </div>

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
                  </div>
                </div>
              </div>
              {/* <Dropdown
                radius="sm"
                classNames={{
                  content: "border-small border-divider bg-white py-0",
                }}

              >
                <DropdownTrigger>
                  <Button isIconOnly variant="bordered" className={`p-4 capitalize w-fit text-blue-600 ${props.isHome ? "" : "bg-white"}`} disableRipple>
                    <WalletIcon></WalletIcon>
                    <span className="font-bold pl-4">
                      <div className="px-1">{"0x1234...6789"}</div>
                    </span>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Custom item styles"
                  className="p-3"
                  variant="light"
                  itemClasses={{
                    base: [
                      "rounded-md",
                      "text-default-500",
                      "transition-opacity",
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
                      className="gap-2 opacity-100  bg-white"
                    >
                      <button
                        className="grid grid-row-auto grid-flow-col hover:bg-gray-100"
                        onClick={async () => beginZkLogin()}
                      >
                        <GoogleIcon />
                        <span className="text-blue-200 font-bold mx-2">
                          Google login
                        </span>
                      </button>
                    </DropdownItem>
                  </DropdownSection>

                  <DropdownSection
                    className="py-1"
                    showDivider
                    hidden={email == ""}
                  >
                    <DropdownItem
                      isReadOnly
                      key="info"
                      className="h-14 gap-2 opacity-100 bg-white py-2"
                    >
                      <div className="grid grid-row-auto grid-flow-col">
                        <GoogleIcon />
                        <span className="text-blue-600 font-bold px-1">
                          <div className="px-1">{email.replace("@gmail.com", "")}</div>
                        </span>
                      </div>
                      <div className="flex justify-center items-center gap-1">
                        <span className="font-bold text-3xl">{format.number(point)}</span>
                        <span className="font-medium text-sm place-items-center">
                          DGT
                        </span>
                      </div>
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownSection
                    showDivider
                    hidden={email == ""}
                  >
                    <DropdownItem key="MyMenu" className="hover:bg-white">
                      <div className="flex justify-center gap-x-10">
                        <Link href={"/profile"}>
                          <div className="flex-col">
                            <ProfileIcon />
                            <p className="text-blue-600">Profile</p>
                          </div>
                        </Link>
                        <div>
                          <button onClick={async () => logOutWallet()}>
                            <p className="ml-3.5">
                              <ExitIcon />
                            </p>
                            <p className="text-blue-600">Log Out</p>
                          </button>
                        </div>
                      </div>
                    </DropdownItem>
                  </DropdownSection>

                  <DropdownSection showDivider hidden={email == ""}>
                    <DropdownItem
                      isReadOnly
                      key="chain"
                      className="cursor-default text-blue-600 font-bold"
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
                </DropdownMenu>
              </Dropdown> */}
            </div>

            {/* Mobile */}
            <div className="sm:hidden object-fit">
              <Dropdown
                radius="sm"
                classNames={{
                  content: "border-small border-divider bg-white py-0",
                }}

              >
                <DropdownTrigger>
                  <Button isIconOnly variant="bordered" className="capitalize" disableRipple>
                    <MenuIcon
                      bgColor={`${props.isHome ? "black" : "white"}`}
                      iconColor={`${props.isHome ? "black" : "white"}`}
                    />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Custom item styles"
                  className="p-3"
                  variant="light"
                  itemClasses={{
                    base: [
                      "rounded-md",
                      "text-default-500",
                      "transition-opacity",
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
                      className="gap-2 opacity-100  bg-white"
                    >
                      <button
                        className="grid grid-row-auto grid-flow-col hover:bg-gray-100"
                        onClick={async () => beginZkLogin()}
                      >
                        <GoogleIcon />
                        <span className="text-blue-200 font-bold mx-2">
                          Google login
                        </span>
                      </button>
                    </DropdownItem>
                  </DropdownSection>

                  <DropdownSection
                    className="py-1"
                    showDivider
                    hidden={email == ""}
                  >
                    <DropdownItem
                      isReadOnly
                      key="info"
                      className="h-14 gap-2 opacity-100 bg-white"
                    >
                      <div className="grid grid-row-auto grid-flow-col">
                        <span>Wallet</span>
                        <span className="text-blue-600 font-bold px-1">
                          <div className="px-1">{`${walletAddress.slice(0, 4)}...${walletAddress.slice(-5, -1)}`}</div>
                        </span>
                      </div>

                      <div className="grid grid-row-auto grid-flow-col mt-2">
                        <GoogleIcon />
                        <span className="text-blue-600 font-bold px-1">
                          <div className="px-1">{email.replace("@gmail.com", "")}</div>
                        </span>
                      </div>
                    </DropdownItem>
                    <DropdownItem
                      isReadOnly
                      key="balance"
                      className="h-14 gap-2 opacity-100 bg-white py-2"
                    >
                      <div className="flex justify-center items-center gap-1">
                        <span className="font-bold text-3xl">{format.number(point)}</span>
                        <span className="font-medium text-sm place-items-center">
                          DGT
                        </span>
                      </div>
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownSection
                    showDivider
                    hidden={email == ""}
                  >
                    <DropdownItem key="MyMenu" className="hover:bg-white">
                      <div className="flex justify-center gap-x-10">
                        <Link href={"/profile"}>
                          <div className="flex-col">
                            <ProfileIcon />
                            <p className="text-blue-600">Profile</p>
                          </div>
                        </Link>
                        <div>
                          <button onClick={async () => logOutWallet()}>
                            <p className="ml-3.5">
                              <ExitIcon />
                            </p>
                            <p className="text-blue-600">Log Out</p>
                          </button>
                        </div>
                      </div>
                    </DropdownItem>
                  </DropdownSection>

                  <DropdownSection showDivider hidden={email == ""}>
                    <DropdownItem
                      isReadOnly
                      key="chain"
                      className="cursor-default text-blue-600 font-bold"
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
                </DropdownMenu>
              </Dropdown>
            </div>
          </>

        )}
      </header>
    </Fragment>
  );
}

import Copy from "@/icons/Copy";
import Discord from "@/icons/Discord";
import ExternalLink from "@/icons/ExternalLink";
import Telegram from "@/icons/Telegram";
import TwitterWithoutTitle from "@/icons/TwitterWithoutTitle";
import X from "@/icons/X";
import { isImageUrl } from "@/utils";
import Link from "next/link";
import React from "react";

type TGeneralInfoProps = {
  name: string;
  userAddress?: string;
  description?: string;
  avatar?: string;
  addressUrl?: string;
};

const GeneralInfo = (props: TGeneralInfoProps) => {
  const { name, userAddress, description, avatar = "", addressUrl } = props;
  return (
    <div className="px-6 py-8 border-[1px] border-solid border-[#C3D4E9] rounded-[12px] bg-[#fff] shadow-sm flex flex-col lg:flex-row">
      <div className="flex flex-col min-[425px]:flex-row">
        <div className="w-full max-[425px]:flex max-[425px]:justify-center min-[425px]:w-[140px] h-[140px] max-[425px]:text-center max-[425px]:mb-2">
          <img
            alt="avatasr"
            src={isImageUrl(avatar) ? avatar : "/avatar-example.png"}
            className="w-full h-auto object-contain max-w-[140px] max-h-[140px]"
          />
        </div>
        <div className="min-[425px]:ml-4">
          <div className="font-semibold text-[20px]">{name}</div>
          <div className="flex items-center my-2">
            <span className="text-[16px] text-[#1F2937]">{userAddress}</span>
            <div className="flex items-center">
              <div className="cursor-pointer">
                <Copy />
              </div>
              <div className="cursor-pointer">
                <Link href={addressUrl || "https://app.dappflow.org/explorer"}><ExternalLink /></Link>
              </div>
            </div>
          </div>
          {/* <div className="flex items-center gap-1">
            <div className="cursor-pointer">
              <TwitterWithoutTitle />
            </div>
            <div className="cursor-pointer">
              <Discord />
            </div>
            <div className="cursor-pointer">
              <X />
            </div>
            <div className="cursor-pointer">
              <Telegram />
            </div>
          </div> */}
        </div>
      </div>
      <div className="h-[2px] w-full lg:h-[140px] lg:w-[2px] bg-[#C3D4E9] my-6 lg:my-0 lg:mx-10" />
      <div>
        <div className="font-semibold	text-[20px]">PROFILE DESCRIPTION</div>
        <small className="text-[16px] text-[#1F2937]">
          {description || "This address has not written any information yet"}
        </small>
      </div>
    </div>
  );
};

export default GeneralInfo;

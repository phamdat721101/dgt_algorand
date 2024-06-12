import Image from "next/image";

import bitcoin from "@/assets/images/crypto/bitcoin.svg";
import usdc from "@/assets/images/crypto/usdc.svg";
import ethereum from "@/assets/images/crypto/ethereum.svg";
import optimism from "@/assets/images/crypto/optimism.svg";
import tether from "@/assets/images/crypto/tether.svg";
import ripple from "@/assets/images/crypto/ripple.svg";
import bnb from "@/assets/images/crypto/bnb.svg";
import seeMore from "@/assets/images/icons/see-more-ic.png";
import downIc from "@/assets/images/icons/down-ic.png";
import chart from "@/assets/images/chart.png";
import depositIcon from "@/assets/images/icons/deposit-ic.png";

const TopVault = () => {
  return (
    <div className="w-[22%] h-[360px] bg-white border border-[#C3D4E9] rounded-[10px]">
      <div className="px-3">
        <div>
          <div className="flex items-center pt-[18px]">
            <Image
              className="h-[50px] w-[50px]"
              src={bitcoin}
              alt="bitcoin-logo"
            />
            <div className="pl-3.5 w-[122px]">
              <h3 className="text-[#1F2937] font-semibold">Super Trend</h3>
              <p className="text-[#90A3BF] text-xs">By WISEVEST</p>
            </div>
            <Image
              className="h-12 w-12 ml-[21px]"
              src={seeMore}
              alt="see-more-icon"
            />
          </div>
          <div className="flex mt-[15px]">
            <Image
              className="w-[26px] h-[26px] object-cover rounded-[50%] bg-white"
              src={usdc}
              alt="usdc"
            />
            <Image
              className="w-[26px] h-[26px] object-cover rounded-[50%] bg-white -ml-[8px]"
              src={ethereum}
              alt="ethereum"
            />
            <Image
              className="w-[26px] h-[26px] object-cover rounded-[50%] bg-white -ml-[8px]"
              src={optimism}
              alt="optimism"
            />
            <Image
              className="w-[26px] h-[26px] object-cover rounded-[50%] bg-white -ml-[8px]"
              src={tether}
              alt="tether"
            />
            <Image
              className="w-[26px] h-[26px] object-cover rounded-[50%] bg-white -ml-[8px]"
              src={ripple}
              alt="ripple"
            />
            <Image
              className="w-[26px] h-[26px] object-cover rounded-[50%] bg-white -ml-[8px]"
              src={bnb}
              alt="bnb"
            />
            <Image
              className="w-[26px] h-[26px] object-cover rounded-[50%] bg-white -ml-[8px]"
              src={usdc}
              alt="usdc"
            />
            <Image
              className="w-[26px] h-[26px] object-cover rounded-[50%] bg-white -ml-[8px]"
              src={tether}
              alt="tether"
            />
            <Image
              className="w-[26px] h-[26px] object-cover rounded-[50%] bg-white -ml-[8px]"
              src={ethereum}
              alt="ethereum"
            />
          </div>
          <div className="h-px bg-[#1F2937] opacity-[5%] my-[18px]" />
          <div className=" h-[51px] flex items-center justify-between">
            <div>
              <p className="text-xs text-[#90A3BF]">Return</p>
              <p className="text-xl text-[#16A34A]">24,32%</p>
            </div>
            <span className="flex items-center justify-between w-[112px] h-[35px] bg-[#FAFBFF] rounded border border-gray-45">
              <label className="mx-[16px] text-sm text-[#596780]">Month</label>
              <Image className="mr-[8.5px]" src={downIc} alt="down-icon" />
            </span>
          </div>
        </div>
        <div className="mt-[10px]">
          <Image src={chart} alt="chart" />
        </div>
        <button className="w-full h-14 mt-[14px] bg-blue-600 flex items-center justify-center rounded-[10px] gap-2">
          <Image
            className="w-6 h-6 object-cover"
            src={depositIcon}
            alt="deposit-icon"
          />
          <span className="text-xl text-white">Deposit</span>
        </button>
      </div>
    </div>
  );
};

export default TopVault;

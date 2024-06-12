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
import { useEffect,useState } from "react";

type TPoolVaultProps = {
  name: string;
  price: string;
  tlv: string;
  monthy: string;
  price24: string;
  logo:string;
  manager:string;
}

const PoolVault = (props:TPoolVaultProps) => {
  const {name,price,tlv,monthy,price24,logo,manager =""} = props;
  const [logoSVG,setLogoSVG] = useState(bitcoin);


  useEffect(() => {
    switch(logo) {
      case 'ethereum':
        {
          setLogoSVG(ethereum);
          break;
        }
      case 'bitcoin':
        {
          setLogoSVG(bitcoin);
          break;
        }
      case 'usdc':
        {
          setLogoSVG(usdc);
          break;
        }
      case 'optimism':
        {
          setLogoSVG(optimism);
          break;
        }
      case 'tether':
        {
          setLogoSVG(tether);
          break;
        }
      case 'ripple':
        {
          setLogoSVG(ripple);
          break;
        }
      default:
        {
          setLogoSVG(bnb);
          break;
        }
    }
  }, [logo])

  const deposit= ()=>{
    console.log('deposit')
  }

  return (
    <div className="w-[22%] h-[360px] bg-white border border-[#C3D4E9] rounded-[10px]">
      <div className="px-3">
        <div>
          <div className="flex pt-[18px]">
            <Image
              className="h-[50px] w-[50px]"
              src={logoSVG}
              alt="ethereum-logo"
            />
            <div className="text-right text-lg ml-auto">
              <p className="text-xs text-[#90A3BF]">Price</p>
              <p className="text-xl font-bold"> ${price}</p>
            </div>
          </div>
          <div className="h-px bg-[#1F2937] opacity-[5%] my-[18px]" />
          <div>
              <h3 className="text-[#2563EB] font-semibold">{name}</h3>
              <p className="text-[#90A3BF] text-xs">By {manager}</p>
          </div>

          <div className=" h-[51px] flex items-center justify-between">
            <div>
              <p className="text-xl text-[#2563EB]">${tlv}</p>
              <p className="text-xs text-[#90A3BF]">TVL</p>
            </div>
            <div>
              <p className="text-xl text-[#16A34A]">{monthy}</p>
              <p className="text-xs text-[#90A3BF]">MONTHLY</p>
            </div>
            <div>
              <p className="text-xl text-[#EF4444]">{price24}</p>
              <p className="text-xs text-[#90A3BF]">24H</p>
            </div>
          </div>
        </div>
        <div className="mt-[10px]">
          <Image src={chart} alt="chart" />
        </div>
        <button className="w-full h-14 mt-[5px] bg-blue-600 flex items-center justify-center rounded-[10px] gap-2" onClick={deposit}>
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

export default PoolVault;

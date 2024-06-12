'use client';
import React, { useEffect,useState } from "react";
import PoolVault from "./PoolVault";

const fetchPools = async () => {
  const response = await fetch(
    "https://dgt-dev.vercel.app/v1/vaults"
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
};

const PoolsProfile = ()=> {
  const [poolData,setPoolData] = useState([]);

  function getLogo(logo:string): string {
    if(logo.includes('BTC'))
      return 'bitcoin';
    else if(logo.includes('Polygon'))
      return 'polygon';
    else if(logo.includes('FinX'))
      return 'finX';
    else if(logo.includes('Arbitrum'))
      return 'arbitrum';
    else
      return 'ethereum';
  }

  useEffect(()=> {
    const getPoolData = async () => {
      const pools = await fetchPools();
      console.log(pools);
      setPoolData(pools);
    };
    getPoolData();
  }, [])

  return (
    <div className="flex justify-between mt-10">
      {poolData.map((d:any) => (
        <PoolVault 
                name={d.des}
                manager={d.manager}
                price={d.return}
                tlv={d.tvl}
                monthy={d.monthly_return}
                price24={d.daily_return}
                logo={getLogo(d.vault_name)}
              />
        ))}
    </div>
  //   <div className="flex justify-between mt-10">
  //       <PoolVault 
  //         name="Polygon Ecosystem"
  //         price="1000"
  //         tlv="3.5"
  //         monthy="50"
  //         price24="-2.5"
  //         logo="ethereum"
  //       />
  //       <PoolVault 
  //           name="Arbtrum Derivatives"
  //           price="2740"
  //           tlv="5.5"
  //           monthy="24.3"
  //           price24="-1.06"
  //           logo="bitcoin"
  //       />
  //       <PoolVault 
  //            name="Etherum devnet"
  //            price="3140"
  //            tlv="8.5"
  //            monthy="27.3"
  //            price24="-1.06"
  //            logo="usdc"
  //       />
  //       <PoolVault 
  //            name="Bit coin halvings"
  //            price="6540"
  //            tlv="3.5"
  //            monthy="20.3"
  //            price24="2.06"
  //            logo="optimism"
  //       />
  // </div>
  );
};

export default PoolsProfile;

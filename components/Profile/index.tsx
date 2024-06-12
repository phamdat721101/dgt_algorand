"use client";
import { formatNumberByCurrency } from "@/utils";
import React, { useEffect, useState } from "react";
import BlockBalance from "./BlockBalance";
import GeneralInfo from "./GeneralInfo";
import SkeletonProfile from "./SkeletonProfile/SkeletonProfile";
import Strategy from "@/components/HistoryPage/Strategy";
import { useGlobalContext } from "@/Context/store";

type TVault = {
  name: string;
  balance: number;
  list_price: string;
  current_price: string;
  manager: string;
  tvl: number;
  monthly_return: string;
  daily_return: string;
  logo_url: string;
};

type TProfileContainerProps = {
  name: string;
  wallet?: string;
  description?: string;
  holdingAmount: number;
  managedAmount: number;
  dgtAmount: number;
  logoUrl?: string;
  adrUrl?: string;
  vaults: TVault[];
};

const ProfileContainer = (props: TProfileContainerProps) => {
  const {
    name,
    holdingAmount,
    managedAmount,
    vaults,
    description,
    logoUrl,
    adrUrl,
    wallet,
    dgtAmount,
  } = props;
  const { userEmail } = useGlobalContext();

  return (
    <div>
      {userEmail != "" ? (
        <div>
          <GeneralInfo
            name={name}
            userAddress={wallet}
            description={description}
            avatar={logoUrl}
            addressUrl={adrUrl}
          />
          <div className="md:grid-cols-2 gap-3 grid mt-6">
            <BlockBalance
              title="HOLDINGS"
              // value={formatNumberByCurrency(holdingAmount, "USD")}
              value={holdingAmount.toFixed(2)}
            />
            <BlockBalance
              title="TOTAL MANAGED"
              // value={formatNumberByCurrency(managedAmount, "USD")}
              value={holdingAmount.toFixed(2)}
            />
            {/* <BlockBalance
              title="VOTING POWER"
              value={formatNumberByCurrency(dgtAmount, "USD")}
            /> */}
          </div>
          {/* <TabInfoProfile /> */}
          <Strategy />
        </div>
      ) : (
        <div>
          <SkeletonProfile />
        </div>
      )}
    </div>
  );
};

export default ProfileContainer;

"use client";
import React from "react";

import useTab from "@/components/Tabbar/useTab";
import Tabs from "@/components/Tabbar/Tabs";
import Tab from "@/components/Tabbar/Tab";
import PieChart from "@/icons/PieChart";
import BarChart from "@/icons/BarChart1";
import Square from "@/icons/Square";
import File from "@/icons/File";
import Staking from "@/icons/Staking";
import Question from "@/icons/Question";
import Coupon from "@/icons/Coupon";
import World from "@/icons/World";
import Wallet from "@/icons/Wallet";

const TabDetails: React.FC<{
  selectedTab: string;
  onChangeTab: (value: string) => void;
}> = ({ selectedTab, onChangeTab }) => {
  // const [selectedTab, setSelectedTab] = useTab("allocations");
  // function changeTabHandler(value: string) {
  //   setSelectedTab(value);
  // }

  return (
    <div className="mt-[55px]">
      <Tabs
        className="flex gap-8 border-b border-b-[#E0E9F4]"
        value={selectedTab}
        onChange={onChangeTab}
      >
        <Tab
          className="flex gap-2.5 font-medium text-[#90A3BF] text-base tracking-tight"
          index="assets"
        >
          <Wallet />
          <span
            className={`pb-3 ${
              selectedTab == "assets" && "text-[#2563EB] font-semibold"
            }`}
          >
            My Assets
          </span>
        </Tab>
        <Tab
          className="flex gap-2.5 font-medium text-[#90A3BF] text-base tracking-tight"
          index="coupons"
        >
          <Coupon />
          <span
            className={`pb-3 ${
              selectedTab == "coupons" && "text-[#2563EB] font-semibold"
            }`}
          >
            My Coupons
          </span>
        </Tab>
        <Tab
          className="flex gap-2.5 font-medium text-[#90A3BF] text-base tracking-tight"
          index="financial"
        >
          <PieChart />
          <span
            className={`pb-3 ${
              selectedTab == "financial" && "text-[#2563EB] font-semibold"
            }`}
          >
            Financial History
          </span>
        </Tab>
        <Tab
          className="flex gap-2.5 font-medium text-[#90A3BF] text-base tracking-tight"
          index="transfer"
        >
          <File />
          <span
            className={`pb-3 ${
              selectedTab == "transfer" && "text-[#2563EB] font-semibold"
            }`}
          >
            Transfer History
          </span>
        </Tab>
        <Tab
          className="flex gap-2.5 font-medium text-[#90A3BF] text-base tracking-tight"
          index="address"
        >
          <World />
          <span
            className={`pb-3 ${
              selectedTab == "address" && "text-[#2563EB] font-semibold"
            }`}
          >
            Address Management
          </span>
        </Tab>
        <Tab
          className="flex gap-2.5 font-medium text-[#90A3BF] text-base tracking-tight"
          index="strategy"
        >
          <BarChart width="22" height="22" />
          <span
            className={`pb-3 ${
              selectedTab == "strategy" && "text-[#2563EB] font-semibold"
            }`}
          >
            Strategy Management
          </span>
        </Tab>
      </Tabs>
    </div>
  );
};

export default TabDetails;

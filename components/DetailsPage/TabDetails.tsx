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

const TabDetails: React.FC<{
  selectedTab: string;
  onChangeTab: (value: string) => void;
}> = ({ selectedTab, onChangeTab }) => {
  // const [selectedTab, setSelectedTab] = useTab("allocations");
  // function changeTabHandler(value: string) {
  //   setSelectedTab(value);
  // }

  return (
    <div className="mt-[52px]">
      <Tabs
        className="w-[67%] flex gap-8 border-b border-b-[#E0E9F4]"
        value={selectedTab}
        onChange={onChangeTab}
      >
        <Tab
          className="flex gap-2.5 font-medium text-[#90A3BF] leading-normal tracking-tight"
          index="overview"
        >
          <BarChart width="22" height="22" />
          <span
            className={`pb-3 ${
              selectedTab == "overview" && "text-[#2563EB] font-semibold"
            }`}
          >
            Overview
          </span>
        </Tab>
        <Tab
          className="flex gap-2.5 font-medium font-medium text-[#90A3BF] leading-normal tracking-tight"
          index="allocations"
        >
          <PieChart />
          <span
            className={`pb-3 ${
              selectedTab == "allocations" && "text-[#2563EB] font-semibold"
            }`}
          >
            Allocations
          </span>
        </Tab>
        <Tab
          className="flex gap-2.5 font-medium text-[#90A3BF] leading-normal tracking-tight"
          index="activity"
        >
          <Square />
          <span
            className={`pb-3 ${
              selectedTab == "activity" && "text-[#2563EB] font-semibold"
            }`}
          >
            Activity
          </span>
        </Tab>
        <Tab
          className="flex gap-2.5 font-medium text-[#90A3BF] leading-normal tracking-tight"
          index="contracts"
        >
          <File />
          <span
            className={`pb-3 ${
              selectedTab == "contracts" && "text-[#2563EB] font-semibold"
            }`}
          >
            Contracts
          </span>
        </Tab>
        <Tab
          className="flex gap-2.5  font-medium text-[#90A3BF] leading-normal tracking-tight"
          index="staking"
        >
          <Staking />
          <span
            className={`pb-3 ${
              selectedTab == "staking" && "text-[#2563EB] font-semibold"
            }`}
          >
            Staking
          </span>
        </Tab>
        <Tab
          className="flex gap-2.5 font-medium text-[#90A3BF] leading-normal tracking-tight"
          index="faqs"
        >
          <Question />
          <span
            className={`pb-3 ${
              selectedTab == "faqs" && "text-[#2563EB] font-semibold"
            }`}
          >
            FAQs
          </span>
        </Tab>
      </Tabs>
    </div>
  );
};

export default TabDetails;

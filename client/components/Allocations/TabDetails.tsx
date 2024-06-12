"use client";
import useTab from "@/components/Tabbar/useTab";
import Tabs from "@/components/Tabbar/Tabs";
import Tab from "@/components/Tabbar/Tab";
import PieChart from "@/icons/PieChart";
import BarChart from "@/icons/BarChart1";
import Square from "@/icons/Square";
import File from "@/icons/File";
import Staking from "@/icons/Staking";
import Question from "@/icons/Question";

export default function TabDetails() {
  const [selectedTab, setSelectedTab] = useTab("allocations");
  function changeTabHandler(value: string) {
    setSelectedTab(value);
  }

  return (
    <div className="mt-[52px]">
      <Tabs
        className="w-[67%] flex gap-8 border-b border-b-[#E0E9F4]"
        value={selectedTab}
        onChange={changeTabHandler}
      >
        <Tab className="flex gap-2.5" index="overview">
          <BarChart width="22" height="22" />
          <span className="pb-3 font-medium text-[#90A3BF] leading-normal tracking-tight">
            Overview
          </span>
        </Tab>
        <Tab className="flex gap-2.5" index="allocations">
          <PieChart />
          <span className="pb-3 font-medium text-[#2563EB] font-semibold leading-normal tracking-tight">
            Allocations
          </span>
        </Tab>
        <Tab className="flex gap-2.5" index="activity">
          <Square />
          <span className="pb-3 font-medium text-[#90A3BF] leading-normal tracking-tight">
            Activity
          </span>
        </Tab>
        <Tab className="flex gap-2.5" index="contracts">
          <File />
          <span className="pb-3 font-medium text-[#90A3BF] leading-normal tracking-tight">
            Contracts
          </span>
        </Tab>
        <Tab className="flex gap-2.5" index="staking">
          <Staking />
          <span className="pb-3 font-medium text-[#90A3BF] leading-normal tracking-tight">
            Staking
          </span>
        </Tab>
        <Tab className="flex gap-2.5" index="faqs">
          <Question />
          <span className="pb-3 font-medium text-[#90A3BF] leading-normal tracking-tight">
            FAQs
          </span>
        </Tab>
      </Tabs>
    </div>
  );
}

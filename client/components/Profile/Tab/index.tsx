'use client';
import React from "react";
import Tabs from "@/components/Tabbar/Tabs";
import Tab from "@/components/Tabbar/Tab";
import useTab from "@/components/Tabbar/useTab";
import Transactions_fill from "@/icons/Transactions_fill";
import PieChart from "@/icons/PieChart";
import App from "@/icons/App";
import PortfolioProfile from "../portfolio";
import PoolsProfile from "../pools";
import GovernanceProfile from "../governance";

const TabInfoProfile = () => {
  const [tabSelected, onSelectTabChange] = useTab("pools");
  function handleTabChange(value: any) {
    // TODO: fetch api and change data here
    onSelectTabChange(value);
  }
  return (
    <div className="mt-3">
        <Tabs value={tabSelected} onChange={handleTabChange}>
            <Tab index="portfolio"><Transactions_fill state={tabSelected=='portfolio'}/> Portfolio</Tab>
            <Tab index="pools"><PieChart state={tabSelected=='pools'}/>Managed Pools</Tab>
            <Tab index="governance"><App state={tabSelected=='governance'}/>Governance Data</Tab>
        </Tabs>
        <div className="outlet">
          {tabSelected === "portfolio" ?   <PortfolioProfile /> : tabSelected === "pools" ?<PoolsProfile />:<GovernanceProfile/>} 
      </div>
    </div>
  );
};

export default TabInfoProfile;

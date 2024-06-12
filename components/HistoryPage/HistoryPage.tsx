"use client";

import Strategy from "./Strategy";
import useTab from "@/components/Tabbar/useTab";
import TabHistory from "./TabHistory";

export default function HistoryPage() {
  const [selectedTab, setSelectedTab] = useTab("strategy");
  function changeTabHandler(value: string) {
    setSelectedTab(value);
  }

  let content = (
    <div className="h-[100px] flex items-center justify-center">
      <span>Coming soon</span>
    </div>
  );

  if (selectedTab == "assets") {
  }

  if (selectedTab == "coupons") {
  }

  if (selectedTab == "financial") {
  }

  if (selectedTab == "transfer") {
  }

  if (selectedTab == "address") {
  }

  if (selectedTab == "strategy") {
    content = <Strategy />;
  }
  return (
    <>
      <main className="px-[90px]">
        <div>
          <TabHistory
            selectedTab={selectedTab}
            onChangeTab={changeTabHandler}
          />
        </div>
        {content}
      </main>
    </>
  );
}

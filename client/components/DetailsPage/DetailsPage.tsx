"use client";

import dynamic from "next/dynamic";
import detailBg from "@/assets/images/bg-detail.svg";
import useTab from "@/components/Tabbar/useTab";
import Info from "./Info";
import TabDetails from "./TabDetails";

const Allocations = dynamic(
  () => import("@/components/DetailsPage/Allocations"),
  {
    ssr: false,
  }
);

const Overview = dynamic(() => import("@/components/DetailsPage/Overview"), {
  ssr: false,
  loading: () => (
    <p className="p-12 text-center text-lg font-medium leading-4 text-gray-300">
      Loading...
    </p>
  ),
});

const MorePools = dynamic(() => import("@/components/DetailsPage/MorePools"), {
  ssr: false,
  loading: () => (
    <p className="p-12 text-center text-lg font-medium leading-4 text-gray-300">
      Loading...
    </p>
  ),
});

export default function DetailsPage() {
  const [selectedTab, setSelectedTab] = useTab("overview");
  function changeTabHandler(value: string) {
    setSelectedTab(value);
  }

  let content = (
    <div className="h-[100px] flex items-center justify-center">
      <span>Coming soon</span>
    </div>
  );

  if (selectedTab == "overview") {
    content = (
      <>
        <Overview />
        <MorePools />
      </>
    );
  }

  if (selectedTab == "allocations") {
    content = <Allocations />;
  }

  if (selectedTab == "activity") {
  }

  if (selectedTab == "contracts") {
  }

  if (selectedTab == "staking") {
  }

  if (selectedTab == "faqs") {
  }

  return (
    <>
      <Info />
      <main className="px-[90px] pb-24">
        <div>
          <TabDetails
            selectedTab={selectedTab}
            onChangeTab={changeTabHandler}
          />
        </div>
        {content}
      </main>
    </>
  );
}

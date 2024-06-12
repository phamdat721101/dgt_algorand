import Info from "@/icons/Info";
import React from "react";

type TBlockBalance = {
  title: string;
  tooltipContent?: string;
  value: string | number;
};

const BlockBalance = (props: TBlockBalance) => {
  const { title, tooltipContent, value } = props;
  return (
    <div className="px-4 py-5 border-[1px] border-solid border-[#C3D4E9] rounded-[12px] bg-[#fff] shadow-sm">
      <div className="flex">
        <span className="font-semibold mr-2 uppercase">{title}</span>
        <div className="cursor-pointer">
          <Info />
        </div>
      </div>
      <div className="pt-2 text-2xl sm:text-[40px] font-semibold">{value} DGT</div>
    </div>
  );
};

export default BlockBalance;

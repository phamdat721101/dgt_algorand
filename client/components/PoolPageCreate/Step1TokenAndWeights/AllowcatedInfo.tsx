import { useTypedForm } from "@/hooks/useTypedForm";
import React from "react";

type Props = {};

const AllowcatedInfo = (props: Props) => {
  const { register, control, watch } = useTypedForm("CreateVaults");
  const watchTokens = watch("tokens");
  const listHasNameAndPercent = watchTokens?.filter(
    (x) => x?.name && +x?.percent > 0
  );
  const actualTotal = listHasNameAndPercent.reduce((acc, currentValue) => {
    return acc + +currentValue.percent;
  }, 0);
  const total = Math.min(actualTotal, 100);

  return (
    <div className="p-2 px-4 my-4 w-full bg-slate-800 text-white">
      <div className="flex justify-between w-full">
        <span>Total allocated</span>
        <span className={`${actualTotal > total ? "text-red-600" : ""}`}>
          {total}%
        </span>
      </div>
      <div
        className="progress-track my-2"
        style={{ background: "rgb(51 65 85)" }}
      >
        <div
          className="progress-bar h-1 bg-green-400"
          style={{ width: `${total}%` }}
        ></div>
      </div>
    </div>
  );
};

export default AllowcatedInfo;

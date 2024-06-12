import React from "react";
import cn from "classnames";

import styles from "./styles.module.scss";
import { STEPS } from "../const";

type Props = {
  active?: number;
  onChangeStep?: (e: number) => void;
};

const PoolSteps = (props: Props) => {
  const { active, onChangeStep } = { ...props };
  return (
    <div className={cn("flex flex-col rounded-lg", styles.root)}>
      <div className="text-base text-center px-4 py-4">
        Create a weighted pool steps
      </div>
      <div>
        <div className={styles["divider"]}></div>
      </div>
      <div className="text-base text-center px-4 py-4">
        {STEPS.map((step, idx) => {
          const defaultCircleClassName =
            "relative text-sm rounded-full w-7 h-7 flex justify-center items-center border-2 border-gray-300 dark:border-gray-600 text-secondary circle-line mr-2";
          const activeCircleClassName =
            "relative text-sm rounded-full w-7 h-7 flex justify-center items-center border-2 border-none bg-gradient-from-l bg-gradient-to-r from-blue-600 to-blue-400 text-white active circle-line mr-2";
          const activeClassName = "text-blue-600 font-semibold";
          const isActive = idx === active;
          return (
            <div
              className="flex items-center mb-4"
              onClick={() => onChangeStep?.(idx)}
            >
              <button className="" type="button">
                <div className="flex flex-row items-center">
                  <div
                    className={cn(
                      isActive ? activeCircleClassName : defaultCircleClassName,
                      idx < STEPS.length - 1 ? styles["circle-line"] : null
                    )}
                  >
                    <div className="flex absolute top-0 right-0 bottom-0 left-0 justify-center items-center mx-auto w-4">
                      <span>{step.value}</span>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "text-sm",
                      isActive ? activeClassName : "text-gray-400"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PoolSteps;

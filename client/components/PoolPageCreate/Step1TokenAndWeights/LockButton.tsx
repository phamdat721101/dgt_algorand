import React from "react";

type Props = {
  onClick?: (e: any) => void;
  name?: string;
  value?: boolean;
};

const LockButton = (props: Props) => {
  const { value, ...rest } = props;
  return (
    <button
      className="ml-2 ease-color mt-1 text-secondary hover:text-blue-800 dark:hover:text-blue-800 flex items-center shadow-sm border dark:border-0 bg-gray-50 dark:bg-gray-850 rounded-full p-1 justify-center border-transparent mr-0"
      type="button"
      {...rest}
    >
      {value ? (
        <svg
          data-v-7b243f8a=""
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="feather feather-unlock"
          style={{
            transform: "translateY(0px)",
          }}
        >
          <rect
            data-v-7b243f8a=""
            x="3"
            y="11"
            width="18"
            height="11"
            rx="2"
            ry="2"
          ></rect>
          <path data-v-7b243f8a="" d="M7 11V7a5 5 0 0 1 10 0v4 "></path>
        </svg>
      ) : (
        <svg
          data-v-7b243f8a=""
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="feather feather-unlock"
        >
          <rect
            data-v-7b243f8a=""
            x="3"
            y="11"
            width="18"
            height="11"
            rx="2"
            ry="2"
          ></rect>
          <path data-v-7b243f8a="" d="M7 11V7a5 4 0 0 1 10 -2v-1"></path>
        </svg>
      )}
    </button>
  );
};

export default LockButton;

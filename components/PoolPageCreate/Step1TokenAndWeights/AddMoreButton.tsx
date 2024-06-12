import React from "react";

type Props = {
  onClick: (e: any) => void;
};

const AddMoreButton = (props: Props) => {
  return (
    <button
      className="bal-btn px-3 h-9 text-base bg-transparent text-blue-500  dark:text-blue-400 border border-blue-200 dark:border-blue-700 dark:hover:border-blue-600 dark:focus:border-blue-600 hover:text-gray-600 dark:hover:text-gray-200 dark:focus:text-gray-200 inline-block rounded-lg shadow hover:shadow-none cursor-pointer"
      type="button"
      {...props}
    >
      Add a token
    </button>
  );
};

export default AddMoreButton;

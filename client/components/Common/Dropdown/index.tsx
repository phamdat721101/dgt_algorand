import React, { useState } from "react";
import Select, { Option } from "rc-select";

import styles from "./styles.module.scss";

type Props = {
  placeholder?: string;
  list?: any[];
  onChange?: (e?: any) => void;
};

const Dropdown = (props: Props) => {
  const { list = [], onChange, ...rest } = { ...props };
  const [keyword, setKeyword] = useState("");
  const options = list.filter((x) =>
    x?.label?.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <Select
      {...rest}
      onChange={onChange}
      className={styles.root}
      suffixIcon={({ searchValue }) => {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="feather feather-chevron-down"
            color="white"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        );
      }}
      dropdownRender={(menu) => {
        return (
          <div className={styles["custom-dropdown-container"]}>
            <div className={styles["search-container"]}>
              <div className={styles["input-container"]}>
                <img
                  className="icon"
                  src="https://salt.tikicdn.com/ts/ta/bd/45/9c/2a445b62fee43016af7526ee9df53a84.png"
                  width={24}
                  height={24}
                />
                <input
                  className="input"
                  // @ts-ignore
                  onChange={(e) => setKeyword(e?.target?.value)}
                  value={keyword}
                />
              </div>
            </div>
            {menu}
          </div>
        );
      }}
      filterOption={(inputValue, option) => {
        if (!keyword) {
          return true;
        }
        console.log(">>>>> option", option); //TODO: to-remove
        return true;
        // return (option.value as string).includes(inputValue);
      }}
    >
      {/* @ts-ignore */}
      {options?.map((x, idx) => (
        <Option value={x?.value} key={idx}>
          <div className="flex space-x-2 px-2 py-4">
            {x?.icon && <img src={x?.icon} width={24} height={24} />}
            <div className="text-base">{x?.label}</div>
          </div>
        </Option>
      ))}
    </Select>
  );
};

export default Dropdown;

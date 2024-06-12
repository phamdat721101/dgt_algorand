import React, { useEffect, useState } from "react";
import { useFormatter } from "next-intl";
import MyInput from "../DigiTrust/DateInput";

interface Data {
  date: string;
  manager: string;
  package_type: string;
  amount: number;
  price: number;
  expected_return: number;
  tx_hash: string;
  expire_date: string;
}

const Strategy = () => {
  const format = useFormatter();
  const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  });
  let datas: Data[];

  // Call Api
  const [data, setData] = useState<any[]>();

  useEffect(() => {
    const fetchDataDetails = async () => {
      // Api Default
      const response = await fetch(
        "https://dgt-dev.vercel.app/v1/user_history?email=a@gmail.com"
      );
      const data = await response.json();

      setData(data);
    };

    fetchDataDetails();
  }, []);
  // End call api
  datas = data || [];

  return (
    <>
      <div className="flex gap-[18px] py-4 sm:py-6 sm:mt-8">
        <span className="text-2xl sm:text-3xl text-gray-800 font-semibold">
          History
        </span>
        {/* <span className="px-3 bg-blue-100 font-medium text-blue-600 text-base leading-7 rounded-[7px]">
          Current Strategy
        </span>
        <span className="px-3 bg-[#E0E9F4] font-medium text-[#90A3BF] text-base leading-7 rounded-[7px]">
          Historical Strategy
        </span> */}
      </div>
      {/* <div className="flex justify-between">
        <div className="w-[18%]">
          <span className="font-normal text-sm text-gray-800 leading-normal">
            Strategy Status
          </span>
          <form className="mt-1 w-full h-[52px] bg-white flex font-normal text-base text-gray-800 rounded-lg">
            <select className="px-3 w-full border border-[#C3D4E9] rounded-lg focus-visible:bg-gray-100 focus:outline-none">
              <option value="all">All</option>
              <option value="something">Something</option>
              <option value="other">Other</option>
            </select>
          </form>
        </div>
        <div className="w-[18%]">
          <span className="font-normal text-sm text-gray-800 leading-normal">
            Trading Currency
          </span>
          <form className="mt-1 w-full h-[52px] bg-white flex font-normal text-base text-gray-800 rounded-lg">
            <select className="px-3 w-full border border-[#C3D4E9] rounded-lg focus-visible:bg-gray-100 focus:outline-none">
              <option value="all">All</option>
              <option value="somethine">Something</option>
              <option value="other">Other</option>
            </select>
          </form>
        </div>
        <div className="w-[18%]">
          <span className="font-normal text-sm text-gray-800 leading-normal">
            Pricing Currency
          </span>
          <form className="mt-1 w-full h-[52px] bg-white flex font-normal text-base text-gray-800 rounded-lg">
            <select className="px-3 w-full border border-[#C3D4E9] rounded-lg focus-visible:bg-gray-100 focus:outline-none">
              <option value="all">All</option>
              <option value="somethine">Something</option>
              <option value="other">Other</option>
            </select>
          </form>
        </div>
        <div>
          <span className="font-normal text-sm text-gray-800 leading-normal">
            Date
          </span>
          <div className="flex gap-2.5">
            <div className="flex items-center justify-between mt-1 w-[210px] h-[52px] bg-white flex font-normal text-base text-gray-800 rounded-lg">
              <MyInput
                type="date"
                label="Start day"
                size="custom"
                radius="lg"
                value={"2024-01-01"}
              />
            </div>
            <div className="flex items-center justify-between mt-1 w-[210px] h-[52px] bg-white flex font-normal text-base text-gray-800 rounded-lg">
              <MyInput
                type="date"
                label="End day"
                size="custom"
                radius="lg"
                value={"2024-05-01"}
              />
            </div>
          </div>
        </div>
      </div> */}
      <div className="sm:py-8 overflow-x-auto">
        <table className="bg-white min-w-full border border-[#C3D4E9]">
          <thead>
            <tr>
              <th className="px-6 py-6 border-b border-b-[#C3D4E9] text-nowrap text-left text-base leading-4 text-gray-800 tracking-wider">
                Date
              </th>
              <th className="px-6 py-6 border-b border-b-[#C3D4E9] text-nowrap text-left text-base leading-4 text-gray-800 tracking-wider">
                Manager
              </th>
              <th className="px-6 py-6 border-b border-b-[#C3D4E9] text-nowrap text-left text-base leading-4 text-gray-800 tracking-wider">
                Package Type
              </th>
              <th className="px-6 py-6 border-b border-b-[#C3D4E9] text-nowrap text-left text-base leading-4 text-gray-800 tracking-wider">
                Amount
              </th>
              {/* <th className="px-6 py-6 border-b border-b-[#C3D4E9] text-nowrap text-left text-base leading-4 text-gray-800 tracking-wider">
                Price
              </th> */}
              <th className="px-6 py-6 border-b border-b-[#C3D4E9] text-nowrap text-left text-base leading-4 text-gray-800 tracking-wider">
                Expected Return
              </th>
              <th className="px-6 py-6 border-b border-b-[#C3D4E9] text-nowrap text-left text-base leading-4 text-gray-800 tracking-wider">
                Expiration Date
              </th>
            </tr>
          </thead>
          <tbody className="text-sm sm:text-base text-gray-800 tracking-tight">
            {datas.length != 0 ? (
              datas.map((data: any) => (
                <tr className="border-b border-b-[#C3D4E9] text-sm sm:text-base text-gray-800 font-medium leading-normal">
                  <td className="px-6 py-6 whitespace-no-wrap text-nowrap border-b border-b-[#C3D4E9]">
                    {dateTimeFormatter.format(new Date(data.date))}
                  </td>
                  <td className="px-6 py-6 whitespace-no-wrap text-nowrap border-b border-b-[#C3D4E9]">
                    {data.manager}
                  </td>
                  <td className="px-6 py-6 whitespace-no-wrap text-nowrap border-b border-b-[#C3D4E9]">
                    {data.package_type}
                  </td>
                  <td className="px-6 py-6 whitespace-no-wrap text-nowrap border-b border-b-[#C3D4E9]">
                    {format.number(data.amount)} DGT
                  </td>
                  {/* <td className="px-6 py-6 whitespace-no-wrap text-nowrap border-b border-b-[#C3D4E9]">
                    {format.number(data.price)} DGT
                  </td> */}
                  <td className="px-6 py-6 whitespace-no-wrap text-nowrap border-b border-b-[#C3D4E9]">
                    {format.number(data.expected_return)} DGT
                  </td>
                  <td className="px-6 py-6 whitespace-no-wrap text-nowrap border-b border-b-[#C3D4E9]">
                    {dateTimeFormatter.format(new Date(data.expire_date))}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center py-5 animate-pulse">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Strategy;

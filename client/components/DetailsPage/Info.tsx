"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { copyVault } from "@/constants/suiSignTransaction";
import { useWallet } from "@suiet/wallet-kit";
import { useOnborda } from "onborda";
import { useFormatter } from "next-intl";
import { env } from "process";

export default function Info() {
  const format = useFormatter();
  // Call Api
  const [dataDetails, setDataDetails] = useState<any[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isUnFollowedDisplayed, setIsUnFollowedDisplayed] = useState(false);
  const { isOnbordaVisible } = useOnborda();

  //Value for copy vault
  const wallet = useWallet();

  function clickHandler() {
    setIsFollowing((prevState) => !prevState);
  }

  useEffect(() => {
    const fetchDataDetails = async () => {
      // Api Default
      const response = await fetch(
        "https://dgt-dev.vercel.app/v1/vault_detail?vault_id=dgt1"
      );
      const data = await response.json();
      setDataDetails(data);
    };

    fetchDataDetails();
  }, []);
  // End call api

  const goToCopyVault = async () => {
    if (isOnbordaVisible) return;
    const res = await copyVault(wallet);
    if (res != "fall" && res != null)
      toast.success("Transaction Success!\n Hash transaction block is " + res, {
        style: {
          maxWidth: "800px",
        },
        duration: 5000,
      });
    if (res == "fall") {
      const loadingToast = toast.loading("Loading...");
      setTimeout(() => {
        toast.dismiss(loadingToast);
      }, 2000);
    }
  };

  useEffect(() => {
    async function doWork3() {
      if (isOnbordaVisible) return;
      else {
        await goToCopyVault();
      }
    }
    doWork3();
  }, []);

  return (
    <section className="px-10 sm:px-[90px] bg-blue-50 lg:bg-details xl:object-contain 2xl:bg-none">
      <div className="container mx-auto pt-[55px] pb-[108px]">
        <div className="space-y-6">
          <div className="flex items-center gap-x-6">
            {/* <Image src={""} alt={"logo"}></Image> */}
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_242_12349)">
                <path
                  d="M40 0C62.0884 0 80 17.9116 80 40C80 62.0884 62.0884 80 40 80C17.9116 80 0 62.0884 0 40C0 17.9116 17.9116 0 40 0Z"
                  fill="#0033AD"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M39.8567 18.1391C40.682 18.1812 41.3809 17.5496 41.4399 16.7244C41.4988 15.8991 40.8504 15.2001 40.0251 15.1412C39.1999 15.0991 38.5009 15.7138 38.442 16.5391C38.3999 17.3728 39.0315 18.0801 39.8567 18.1391ZM53.8526 18.3411C53.4989 18.8884 52.7747 19.0484 52.2273 18.6863C51.6883 18.3242 51.5283 17.5916 51.882 17.0442C52.2357 16.5137 52.9599 16.3537 53.5073 16.7158C54.0547 17.0695 54.2147 17.7937 53.8526 18.3411ZM27.562 18.7958C28.1347 18.5094 28.3705 17.7852 28.0841 17.2126C27.7978 16.64 27.0736 16.4042 26.501 16.6905C25.9284 16.9768 25.6926 17.6842 25.9789 18.2652C26.2652 18.8547 26.9726 19.0989 27.562 18.7958ZM31.2168 43.7644C29.2126 43.6549 27.6715 41.937 27.7894 39.9328C27.8905 37.9959 29.4904 36.4802 31.4189 36.4886C33.4399 36.4717 35.0652 38.097 35.0652 40.1181C35.082 42.1391 33.4568 43.7644 31.4357 43.7644H31.2168ZM12.9768 40.1013C13.002 39.4528 13.5662 38.9476 14.2147 38.9897C14.8631 39.0318 15.3683 39.5792 15.3262 40.2276C15.2841 40.876 14.7368 41.3813 14.0883 41.3392C13.4399 41.3139 12.9515 40.7497 12.9768 40.1013ZM32.0589 22.8041C32.5052 23.6968 32.1431 24.7915 31.2504 25.2378C30.3578 25.6841 29.2631 25.3305 28.8168 24.4294C28.3704 23.5368 28.7325 22.442 29.6252 21.9957C30.5178 21.5494 31.6125 21.9115 32.0589 22.8041ZM18.8294 29.6673C19.5199 30.1136 20.4462 29.9284 20.901 29.2378C21.3473 28.5473 21.162 27.621 20.4715 27.1663C19.781 26.7199 18.8547 26.9052 18.3999 27.5957C17.9368 28.2863 18.1304 29.221 18.8294 29.6673ZM19.1157 40.0589C19.1746 39.0484 20.0252 38.282 21.0357 38.341C22.0378 38.3999 22.8041 39.2673 22.7536 40.261C22.6946 41.2715 21.8441 42.0378 20.8336 41.9789C19.8231 41.9199 19.0567 41.0694 19.1157 40.0589ZM19.0231 50.5514C18.2904 50.9304 17.9873 51.823 18.3578 52.5725C18.7368 53.3051 19.6294 53.6083 20.3789 53.2377C21.1115 52.8588 21.4147 51.9661 21.0441 51.2167C20.6736 50.484 19.7641 50.1809 19.0231 50.5514ZM29.0441 33.9623C28.4126 34.9644 27.082 35.2338 26.0883 34.5854C25.0947 33.937 24.8252 32.6065 25.4652 31.6296C26.0968 30.6275 27.4273 30.3581 28.421 31.0065C29.4231 31.6381 29.6926 32.9686 29.0441 33.9623ZM48.5052 25.0948C49.3388 25.6422 50.4757 25.4148 51.0315 24.5727C51.5788 23.739 51.3515 22.6022 50.5094 22.0464C49.6757 21.499 48.5388 21.7264 47.983 22.5685C47.4273 23.4274 47.6546 24.5474 48.5052 25.0948ZM48.7747 36.4549C46.7704 36.337 45.0441 37.8781 44.9431 39.8823C44.8252 41.8865 46.3662 43.6128 48.3704 43.7138H48.5725C50.5768 43.7138 52.202 42.0886 52.202 40.0675C52.2189 38.156 50.7115 36.556 48.7747 36.4549ZM35.7052 36.3283C34.3241 36.3283 33.0694 35.5451 32.4462 34.3241C31.5368 32.5388 32.261 30.3409 34.0631 29.423C35.8484 28.5135 38.0378 29.2378 38.9473 31.0399C39.2084 31.5535 39.3347 32.1177 39.3347 32.682C39.3347 34.703 37.7094 36.3283 35.7052 36.3283ZM60.9683 29.6673C61.701 29.2883 61.9957 28.3873 61.6168 27.6462C61.2462 26.9136 60.3368 26.6189 59.5957 26.9978C58.8631 27.3768 58.5683 28.2694 58.9305 29.002C59.3262 29.7347 60.2273 30.0378 60.9683 29.6673ZM50.7957 33.6928C50.2652 32.6402 50.6947 31.3517 51.7473 30.8212C52.7999 30.2991 54.0799 30.7201 54.6189 31.7728C55.1494 32.8254 54.7199 34.1138 53.6673 34.6444C52.6147 35.1749 51.3262 34.7454 50.7957 33.6928ZM42.0884 25.5243C42.0294 26.7117 41.0189 27.6212 39.8399 27.5454C38.661 27.4864 37.7683 26.4843 37.8189 25.297C37.8778 24.1096 38.8884 23.2001 40.0673 23.2759C41.2547 23.3348 42.1641 24.3454 42.0884 25.5243ZM28.2526 49.3978C29.3052 48.8673 29.7347 47.5789 29.2041 46.5262C28.6736 45.4736 27.3852 45.0441 26.3326 45.5747C25.2799 46.1052 24.8505 47.3936 25.381 48.4462C25.9199 49.4989 27.1999 49.9283 28.2526 49.3978ZM42.282 35.7051C40.5978 34.6104 40.1346 32.362 41.2294 30.6777C41.9031 29.6504 43.0399 29.0356 44.2694 29.0356C44.9768 29.0356 45.6673 29.2377 46.2567 29.6251C47.941 30.7199 48.4041 32.9683 47.3094 34.6525C46.2146 36.3367 43.9662 36.7999 42.282 35.7051ZM47.5536 45.8946C46.6441 44.0925 44.4547 43.3683 42.6694 44.2777C40.8673 45.1872 40.1431 47.3767 41.0526 49.162C41.962 50.9641 44.1515 51.6883 45.9368 50.7788C47.722 49.8862 48.4631 47.722 47.562 45.9199C47.5705 45.9114 47.5705 45.9114 47.5536 45.8946ZM50.9557 46.2569C51.5873 45.2548 52.9178 44.9853 53.9115 45.6338C54.9051 46.2822 55.1746 47.6127 54.5346 48.5895C53.903 49.5916 52.5725 49.8611 51.5788 49.2127C50.5767 48.5811 50.3073 47.2506 50.9557 46.2569ZM60.8841 40.1768C60.9431 39.1662 60.1768 38.3157 59.1662 38.2568C58.1557 38.1978 57.3052 38.9641 57.2462 39.9747C57.1873 40.9852 57.9536 41.8357 58.9641 41.8947C59.9662 41.9452 60.8252 41.1704 60.8841 40.1768ZM64.6736 39.9914C64.6989 39.343 65.2631 38.8377 65.9115 38.8798C66.5683 38.9219 67.0568 39.4693 67.0231 40.1177C66.981 40.7661 66.4336 41.2714 65.7852 41.2293C65.1367 41.204 64.6483 40.6398 64.6736 39.9914ZM61.1704 50.5517C60.4799 50.1054 59.5536 50.2906 59.0989 50.9812C58.6525 51.6717 58.8378 52.598 59.5283 53.0527C60.2188 53.4991 61.1452 53.3138 61.5999 52.6233C62.0631 51.9327 61.8694 50.998 61.1704 50.5517ZM26.1389 61.8611C26.4926 61.3306 27.2168 61.1706 27.7641 61.5327C28.3115 61.8948 28.4715 62.6274 28.0926 63.158C27.7389 63.6885 27.0147 63.8485 26.4673 63.4864C25.9368 63.1327 25.7768 62.4085 26.1389 61.8611ZM52.4378 61.4233C51.8652 61.7096 51.6294 62.4338 51.9157 63.0065C52.202 63.5791 52.9262 63.8149 53.4989 63.5286C54.0715 63.2423 54.3073 62.5349 54.021 61.9538C53.7347 61.3644 53.0273 61.1202 52.4378 61.4233ZM37.7178 44.4967C39.402 45.6083 39.8652 47.8567 38.7704 49.5409C38.0967 50.5767 36.9599 51.1998 35.7136 51.183C35.0062 51.183 34.3157 50.9809 33.7262 50.5935C32.042 49.4819 31.562 47.2335 32.6736 45.5493C33.7852 43.8651 36.0336 43.4019 37.7178 44.4967ZM31.4946 55.1242C30.661 54.5768 29.5241 54.8042 28.9683 55.6463C28.421 56.48 28.6483 57.6168 29.4904 58.1726C30.3241 58.72 31.461 58.4926 32.0168 57.6505C32.581 56.8084 32.3452 55.6715 31.4946 55.1242ZM38.3999 63.4948C38.4589 62.6695 39.1578 62.0379 39.9831 62.08C40.8084 62.139 41.4399 62.8463 41.3978 63.68C41.3389 64.5053 40.6399 65.12 39.8147 65.0779C38.9894 65.019 38.341 64.32 38.3999 63.4948ZM39.9999 52.6737C38.8209 52.5979 37.8104 53.5074 37.7515 54.6947C37.6757 55.8737 38.5851 56.8842 39.7725 56.9432C40.9515 57.0021 41.962 56.1095 42.0209 54.9221C42.0883 53.7516 41.1788 52.7326 39.9999 52.6737ZM47.9578 57.4316C47.4946 56.539 47.8568 55.4443 48.7494 54.9811C49.6589 54.518 50.7536 54.8885 51.2168 55.7895C51.6631 56.6822 51.301 57.7769 50.4083 58.2232C49.5157 58.6864 48.421 58.3243 47.9578 57.4316Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_242_12349">
                  <rect width="80" height="80" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <div className="text-4xl font-semibold leading-10 -tracking-[0.84px] text-gray-800">
              {/* {dataDetails && <p>{dataDetails.vault_name}</p>} */}
              $aHYPE
            </div>
          </div>
          {/* <div className="flex items-center gap-x-3">
            {dataDetails.map((data) => (
              <div
                key={data.vault_id}
                className="flex rounded-full border border-gray-45 bg-blue-600 px-[10px] py-1 text-base font-medium leading-6 text-white shadow-currency"
              >
                <span>{data.currency}</span>
                aHYPE
              </div>
            ))} */}
          {/* <div className="flex rounded-full border border-gray-45 bg-blue-600 px-[10px] py-1 text-base font-medium leading-6 text-white shadow-currency">
              {dataDetails && (
                  <span>{dataDetails.currency}</span>
              )}
              aHYPE
          </div> */}
          {/* <div className="rounded-full border border-blue-600 bg-indigo-100 px-[10px] py-1 text-base font-medium leading-6 text-gray-800 shadow-elevation">
              Live on Avalanche
            </div>
          </div> */}

          {dataDetails.map((data) => (
            <p
              key={data.vault_id}
              className="font-feature-settings max-w-5xl text-base font-normal text-gray-800"
            >
              {data.vault_desc}
            </p>
          ))}

          <div className="flex gap-x-3">
            <div className="flex items-center gap-x-2 rounded-[10px] border border-gray-45 bg-white px-4 py-3">
              <div className="flex gap-x-4 text-base font-semibold leading-4">
                <p className="uppercase text-blue-600">MY BALANCE</p>
                {dataDetails.map((data) => (
                  <div key={data.vault_id} className="flex text-gray-800">
                    <span>{data.currency}</span>
                    <p>{format.number(+data.price)}</p>
                  </div>
                ))}
              </div>

              <button>
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 4.5C7.58172 4.5 4 8.08172 4 12.5C4 16.9183 7.58172 20.5 12 20.5C16.4183 20.5 20 16.9183 20 12.5C20 8.08172 16.4183 4.5 12 4.5ZM2 12.5C2 6.97715 6.47715 2.5 12 2.5C17.5228 2.5 22 6.97715 22 12.5C22 18.0228 17.5228 22.5 12 22.5C6.47715 22.5 2 18.0228 2 12.5Z"
                    fill="#C3D4E9"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11 17.5V11.5H13V17.5H11Z"
                    fill="#C3D4E9"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11 9.5V7.5H13V9.5H11Z"
                    fill="#C3D4E9"
                  />
                </svg>
              </button>
            </div>
            {/* <div className="flex flex-wrap sm:flex-nowrap gap-y-3 gap-x-3">
              <div className="flex items-center gap-x-2 rounded-[10px] border border-gray-45 bg-white px-4 py-3">
                <div className="flex gap-x-4 text-base font-semibold leading-4">
                  <p className="uppercase text-blue-600">STAKED</p>
                  {dataDetails.map((data) => (
                    <div key={data.vault_id} className="flex text-gray-800">
                      <span>{data.currency}</span>
                      <p>{data.tvl}</p>
                    </div>
                  ))}
                </div>

                <button>
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 4.5C7.58172 4.5 4 8.08172 4 12.5C4 16.9183 7.58172 20.5 12 20.5C16.4183 20.5 20 16.9183 20 12.5C20 8.08172 16.4183 4.5 12 4.5ZM2 12.5C2 6.97715 6.47715 2.5 12 2.5C17.5228 2.5 22 6.97715 22 12.5C22 18.0228 17.5228 22.5 12 22.5C6.47715 22.5 2 18.0228 2 12.5Z"
                      fill="#C3D4E9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11 17.5V11.5H13V17.5H11Z"
                      fill="#C3D4E9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11 9.5V7.5H13V9.5H11Z"
                      fill="#C3D4E9"
                    />
                  </svg>
                </button>
              </div>
            </div> */}
          </div>

          <div className="flex items-center gap-x-[14px]">
            <button
              onClick={clickHandler}
              className={`w-24 sm:w-36 py-3 rounded-[10px] border ${isFollowing && !isUnFollowedDisplayed
                  ? "border-blue-600 text-blue-600"
                  : "bg-blue-600 text-white"
                } ${isFollowing && isUnFollowedDisplayed
                  ? "bg-red-300 text-white"
                  : ""
                } text-base sm:text-xl leading-normal font-medium tracking-tight`}
              onMouseEnter={() => setIsUnFollowedDisplayed(true)}
              onMouseLeave={() => setIsUnFollowedDisplayed(false)}
            >
              {/* {isFollowing ? "Following" : "Follow"} */}
              {isFollowing && !isUnFollowedDisplayed && "Following"}
              {isFollowing && isUnFollowedDisplayed && "Unfollow"}
              {!isFollowing && "Follow"}
            </button>

            <button
              id="onborda-step2"
              className="w-24 sm:w-36 py-3 rounded-[10px] border border-green-600 text-xl leading-normal font-medium tracking-tight text-green-600"
              onClick={async () => goToCopyVault()}
            >
              Invest
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

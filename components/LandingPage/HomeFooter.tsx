"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import LFooter from "./Footer";
import bgNewsletter from "@/assets/images/bg-newsletter.png";
import { scriptURLPost } from "@/constants/google";
import toast, { Toaster } from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");

  async function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = {
      Wallet: "0x12345",
      Email: email,
      Date: new Date(),
    };

    var keyValuePairs = [];

    for (let [key, value] of Object.entries(form)) {
      keyValuePairs.push(key + "=" + value);
    }

    var formDataString = keyValuePairs.join("&");

    const response = await fetch(scriptURLPost, {
      redirect: "follow",
      mode: "no-cors",
      method: "POST",
      body: formDataString,
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    });

    toast.success("Thank you for subscribing!");

    setEmail("");
    const url = `https://script.google.com/macros/s/AKfycbwpKywlfgvuc_P_6ZYtAArtiKW9pgEmGuuKpmWOsqcAqQbG2C1My2kaV3eQkUdMicTK/exec?email=${email}`;
    const res = await fetch(url);
    const da = await res.json();
  }

  return (
    <footer className="text-sm xl:text-base">
      <Toaster />
      {/* Newsletter */}
      <div className="sm:p-[90px] border-b border-b-[#C3D4E9]">
        <div className="relative h-full w-full overflow-hidden rounded-[10px] object-cover">
          <Image
            className="absolute h-full w-full scale-110"
            src={bgNewsletter}
            alt="bgNewsletter"
          ></Image>

          <div className="relative space-y-[30px] py-[100px] px-5 sm:pl-[70px] text-white">
            <div className="space-y-[13px]">
              <h1 className="text-3xl sm:text-4xl font-bold leading-[110%] xl:text-[50px]">
                Get Started with DigiTrust Today!
              </h1>
              <p className="text-base font-normal leading-[150%] xl:text-xl">
                Subscribe to our newsletter to get early information and special
                calls.
              </p>
            </div>
            <div className="text-gray-800">
              <form onSubmit={submitHandler} method="post">
                <input
                  className="w-[370px] sm:w-[500px] rounded-full py-[25px] pl-[30px] md:pr-[200px] focus:outline-none xl:text-base"
                  type="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <button
                  type="submit"
                  className="absolute left-[265px] sm:left-[436px] mt-[6px] items-center rounded-full bg-gray-800 px-[45px] py-[19px] text-white duration-300 hover:bg-gray-800/90"
                >
                  Start
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <LFooter />
    </footer>
  );
}

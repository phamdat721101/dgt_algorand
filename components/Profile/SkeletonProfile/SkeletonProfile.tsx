"use client"
import Copy from "@/icons/Copy";
import Discord from "@/icons/Discord";
import ExternalLink from "@/icons/ExternalLink";
import Telegram from "@/icons/Telegram";
import TwitterWithoutTitle from "@/icons/TwitterWithoutTitle";
import X from "@/icons/X";
import React from "react";
import ContentLoader from "react-content-loader"
import Tabs from "@/components/Tabbar/Tabs";
import Tab from "@/components/Tabbar/Tab";



const SkeletonProfile = () => {
  return (
    <div>
      <div className="px-6 py-8 border-[1px] border-solid border-[#C3D4E9] rounded-[12px] bg-[#fff] shadow-sm flex flex-col lg:flex-row">
        <div className="flex flex-col min-[425px]:flex-row">
          <div className="w-full max-[425px]:flex max-[425px]:justify-center min-[425px]:w-[140px] h-[140px] max-[425px]:text-center max-[425px]:mb-2">
            <ContentLoader 
                speed={2}
                width={400}
                height={160}
                viewBox="0 0 400 160"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
              <circle cx="75" cy="65" r="55" />
            </ContentLoader>
          </div>
          <div className="min-[425px]:ml-4">
            <ContentLoader 
                  speed={2}
                  width={100}
                  height={30}
                  viewBox="0 0 500 160"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                <rect x="0" y="100" rx="3" ry="4" width="800" height="200" /> 
            </ContentLoader>
            <div className="flex items-center my-2">
              <ContentLoader 
                    speed={2}
                    width={100}
                    height={30}
                    viewBox="0 0 400 160"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                  <rect x="0" y="50" rx="3" ry="4" width="800" height="60" /> 
              </ContentLoader>
              <div className="flex items-center">
                <div className="cursor-pointer">
                  <ContentLoader 
                      speed={2}
                      width={50}
                      height={50}
                      viewBox="0 0 200 160"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                    >
                     <rect x="0" y="50" rx="3" ry="4" width="200" height="200" /> 
                  </ContentLoader>
                </div>
                <div className="cursor-pointer">
                  <ContentLoader 
                      speed={2}
                      width={50}
                      height={50}
                      viewBox="0 0 200 160"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                    >
                     <rect x="0" y="50" rx="3" ry="4" width="200" height="200" /> 
                  </ContentLoader>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="cursor-pointer">
                  <ContentLoader 
                    speed={2}
                    width={50}
                    height={50}
                    viewBox="0 0 200 160"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                  <circle cx="75" cy="65" r="70" />
                </ContentLoader>
              </div>
              <div className="cursor-pointer">
              <ContentLoader 
                    speed={2}
                    width={50}
                    height={50}
                    viewBox="0 0 200 160"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                  <circle cx="75" cy="65" r="70" />
                </ContentLoader>
              </div>
              <div className="cursor-pointer">
              <ContentLoader 
                    speed={2}
                    width={50}
                    height={50}
                    viewBox="0 0 200 160"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                  <circle cx="75" cy="65" r="70" />
                </ContentLoader>
              </div>
              <div className="cursor-pointer">
              <ContentLoader 
                    speed={2}
                    width={50}
                    height={50}
                    viewBox="0 0 200 160"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                  <circle cx="75" cy="65" r="70" />
                </ContentLoader>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[2px] w-full lg:h-[140px] lg:w-[2px] bg-[#C3D4E9] my-6 lg:my-0 lg:mx-10" />
        <div>
          <ContentLoader 
                speed={2}
                width={1100}
                height={100}
                viewBox="1200 0 1200 300"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
              <rect x="0" y="50" rx="3" ry="4" width="8000" height="60" /> 
            </ContentLoader>
        </div>
      </div>
      <div>
        <Tabs>
            <Tab disabled> 
              <ContentLoader 
                      speed={2}
                      width={100}
                      height={30}
                      viewBox="0 0 400 160"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                    >
                    <rect x="0" y="50" rx="3" ry="4" width="800" height="60" /> 
                </ContentLoader>
            </Tab>
            <Tab disabled>
              <ContentLoader 
                      speed={2}
                      width={100}
                      height={30}
                      viewBox="0 0 400 160"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                    >
                    <rect x="0" y="50" rx="3" ry="4" width="800" height="60" /> 
                </ContentLoader>
            </Tab>
            <Tab disabled>
              <ContentLoader 
                      speed={2}
                      width={100}
                      height={30}
                      viewBox="0 0 400 160"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                    >
                    <rect x="0" y="50" rx="3" ry="4" width="800" height="60" /> 
              </ContentLoader>
            </Tab>
        </Tabs>
        <div className="ml-5">
          <ContentLoader 
                  speed={2}
                  width={1100}
                  height={100}
                  viewBox="1200 0 1200 300"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                <rect x="0" y="50" rx="3" ry="4" width="8000" height="60" /> 
            </ContentLoader>
        </div>
        <div className="ml-5">
          <ContentLoader 
                  speed={2}
                  width={1100}
                  height={100}
                  viewBox="1200 0 1200 300"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                <rect x="0" y="50" rx="3" ry="4" width="8000" height="60" /> 
            </ContentLoader>
        </div>
        <div className="ml-5">
          <ContentLoader 
                  speed={2}
                  width={1100}
                  height={100}
                  viewBox="1200 0 1200 300"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                <rect x="0" y="50" rx="3" ry="4" width="8000" height="60" /> 
            </ContentLoader>
        </div>
    </div>
    </div>
  );
};

export default SkeletonProfile;

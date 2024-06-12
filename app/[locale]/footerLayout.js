'use client';

import React from 'react';
import { usePathname } from "next/navigation";
import Footer from '@/components/LandingPage/HomeFooter';
import dynamic from 'next/dynamic';

const SecondFooter = dynamic(() => import('@/components/HomePage/Layout/HomeFooter'), {
    ssr: false,
  });

const FooterLayout = () => {
    const pathname = usePathname().replace('/','');
  return (
    <>
    {
       pathname != '' && <SecondFooter></SecondFooter>
    }
    {
       pathname == '' && <Footer></Footer>
    }
    </>
  );
};
export default FooterLayout;
"use client"


import SHeader from "@/components/skeleton/SHeader";
import SHome from "@/components/skeleton/SHome";
import { ConfigProvider } from "antd";

import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";

const Navbar = dynamic(() => import('@/components/layout/navbar/Navbar'), {
  ssr: false, loading: () => <SHeader/>
});

const Slider = dynamic(() => import('@/components/common/Slider'), {
  ssr: false, loading: () => <SHome/>
});

const Cabs = dynamic(() => import('@/components/layout/cabs/Cabs'), {
  ssr: false, loading: () => <SHome/>
});

const Cruize = dynamic(() => import('@/components/layout/cruize/Cruize'), {
  ssr: false, loading: () => <SHome/>
});

const Activities = dynamic(() => import('@/components/layout/activity/Activities'), {
  ssr: false, loading: () => <SHome/>
});

const Footer = dynamic(() => import('@/components/layout/Footer'), {
  ssr: false, loading: () => <SHome/>
});


export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, [])
  
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <SHome />
      </div>
    );
  }

  return (
    <ConfigProvider
    theme={{
      components: {
        Rate: {
          /* here is your component tokens */
          starSize:14
        },
      },
    }}
    >
      <Navbar />
      <Slider />
      <Cabs/>
      <Cruize />
      <Activities />
      <Footer />
    </ConfigProvider>
  );
}

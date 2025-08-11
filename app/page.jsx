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

const OurStory = dynamic(() => import('@/components/layout/OurStory'), {
  ssr: false, loading: () => <SHome/>
});

const TestiMonials = dynamic(() => import('@/components/layout/Testimonials'), {
  ssr: false, loading: () => <SHome/>
});

const SocialMedia = dynamic(() => import('@/components/layout/SocialMedia'), {
  ssr: false, loading: () => <SHome/>
});

const FAQ = dynamic(() => import('@/components/layout/FAQ'), {
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
          starSize:14
        },
        Select: {
          optionFontSize:16,
        },
        Segmented:{
          itemActiveBg:"rgba(0,0,0,2)",
          trackPadding:4
        }
      },
      token: {

        /* here is your global tokens */
        fontSize:16,
        marginXS:2
      },
    }}
    >
      <Navbar />
      <Slider />
      <Cabs/>
      <Cruize />
      <Activities />
      <OurStory />
      <TestiMonials />
      <FAQ />
      <SocialMedia />
      <Footer />
    </ConfigProvider>
  );
}

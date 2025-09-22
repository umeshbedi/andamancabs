export const dynamic = "force-dynamic";
import Slider from "@/components/common/Slider";
import Activities from "@/components/layout/activity/Activities";
import Cabs from "@/components/layout/cabs/Cabs";
import Cruize from "@/components/layout/cruize/Cruize";
import FAQ from "@/components/layout/FAQ";
import Footer from "@/components/layout/Footer";
import LocationPage from "@/components/layout/location/LocationPage";
import Navbar from "@/components/layout/navbar/Navbar";
import OurStory from "@/components/layout/OurStory";
import PackagePage from "@/components/layout/package/PackagePage";
import SocialMedia from "@/components/layout/SocialMedia";
import TestiMonials from "@/components/layout/testimonilas/Testimonials";
import { db } from "@/firebase";
import { ConfigProvider } from "antd";

export default async function Home() {

  const res = await db.doc(`pages/homepage`).get();
  const data = res.data();

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
      <Slider sliderData={data.banner}/>
      <Cabs/>
      <Cruize />
      <a target="_blank" href="/online-ferry-booking"><img src="/img/ferry logo/Final Cruise Image .webp" loading="lazy" alt="cruize banner" className="w-full mt-8"/></a>
      <Activities />
      <PackagePage/>
      <LocationPage />
      <OurStory />
      <TestiMonials />
      <FAQ />
      <SocialMedia />
      <Footer />
    </ConfigProvider>
  );
}

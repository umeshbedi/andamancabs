export const dynamic = "force-dynamic";
import Slider from "@/components/common/Slider";
import Activities from "@/components/layout/activity/Activities";
import Cabs from "@/components/layout/cabs/Cabs";
import Cruize from "@/components/layout/cruize/Cruize";
import FAQ from "@/components/layout/FAQ";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/navbar/Navbar";
import OurStory from "@/components/layout/OurStory";
import SocialMedia from "@/components/layout/SocialMedia";
import TestiMonials from "@/components/layout/Testimonials";
import { ConfigProvider } from "antd";

export default async function Home() {
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

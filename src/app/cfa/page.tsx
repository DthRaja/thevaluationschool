import type { Metadata } from "next";
import ServerApi from "@/utils/Server";
import convertData from "@/utils/convartData";
import Banner, { IBannerApi } from "./components/Banner";
import BannerDownSection from "./components/BannerDownSection";
import CfaDetails from "./components/CfaDetails";
import LearningModules from "./components/LearningModules";
import PracticalModules from "./components/PracticalModules";
import Practicallearning from "./components/Practicallearning";
import ReviewSection from "./components/ReviewSection";
import FAQ from "./components/FAQ";
import PlansEveryone from "./components/PlansEveryone";
import CarrierAfterCfa from "./components/CarrierAfterCfa";
import YoutubeSection from "./components/YoutubeSection";

export const metadata: Metadata = {
  title: "CFA Level 1 Course in India | Live + Recorded | The Valuation School",
  description:
    "Crack CFA Level 1 with 300+ hours classes, revision, MCQs, study notes, practical finance teaching & mentor support. Enroll for May 2026.",
  alternates: {
    canonical: "/cfa",
  },
};

export default async function CFA() {
  const BannerApi = new ServerApi({
    withAuth: false,
    spName: "SPClientAnonymous",
    mode: 53,
  });

  const [BannerApiJson] = await Promise.all([
    BannerApi.request({
      PageName: "CFA",
    }),
  ]);

  const bannerApiData: Partial<IBannerApi> =
    convertData(BannerApiJson?.result) || {};

  return (
    <>
      <Banner data={bannerApiData} />
      <BannerDownSection />
      <PlansEveryone linkId={bannerApiData.LinkId} />
      <CfaDetails />
      <LearningModules
        courseId={1932}
        demoVideoLink={bannerApiData.WebsiteDemoVideoLink}
      />
      <PracticalModules />
      <Practicallearning />
      <CarrierAfterCfa />
      <ReviewSection />
      <FAQ courseId={1932} />
      <YoutubeSection />
    </>
  );
}

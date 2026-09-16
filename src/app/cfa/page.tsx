import { getOrigin } from "@/app/lib/getOrigin";
import { buildSocialMetadata } from "@/app/lib/seo";
import ServerApi from "@/utils/Server";
import convertData from "@/utils/convartData";
import type { Metadata } from "next";
import Banner, { IBannerApi } from "./components/Banner";
import BannerDownSection from "./components/BannerDownSection";
import CarrierAfterCfa from "./components/CarrierAfterCfa";
import CfaDetails from "./components/CfaDetails";
import FAQ from "./components/FAQ";
import LearningModules from "./components/LearningModules";
import PlansEveryone from "./components/PlansEveryone";
import PracticalModules from "./components/PracticalModules";
import Practicallearning from "./components/Practicallearning";
import ReviewSection from "./components/ReviewSection";
import YoutubeSection from "./components/YoutubeSection";

export async function generateMetadata(): Promise<Metadata> {
  const title = "CFA Level 1 Course in India | Live + Recorded | The Valuation School";
  const description =
    "Crack CFA Level 1 with 300+ hours classes, revision, MCQs, study notes, practical finance teaching & mentor support. Enroll for May 2026.";

  return {
    title,
    description,
    alternates: {
      canonical: new URL(await getOrigin("/cfa")),
    },
    ...buildSocialMetadata({ title, description, path: "/cfa" }),
  };
}

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

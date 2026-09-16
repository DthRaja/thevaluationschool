import { getOrigin } from "@/app/lib/getOrigin";
import { buildSocialMetadata } from "@/app/lib/seo";
import ServerApi from "@/utils/Server";
import convertData from "@/utils/convartData";
import type { Metadata } from "next";
import Banner, { IBannerApi } from "./Components/Banner";
import BannerDownSection from "./Components/BannerDownSection";
import FAQ from "./Components/FAQ";
import LearningModules from "./Components/LearningModules";
import PlansEveryone from "./Components/PlansEveryone";
import ReviewSection from "./Components/ReviewSection";
import TakeThisCourse from "./Components/TakeThisCourse";
import WhatLearn from "./Components/WhatLearn";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Chart Reading Workshop | Learn Technical Analysis & Price Action";
  const description =
    "Learn to read charts, price action, and technical indicators with The Valuation School's Chart Reading Workshop.";

  return {
    title,
    description,
    alternates: {
      canonical: new URL(await getOrigin("/crw")),
    },
    ...buildSocialMetadata({ title, description, path: "/crw" }),
  };
}

export default async function CRW() {
  const BannerApi = new ServerApi({
    withAuth: false,
    spName: "SPClientAnonymous",
    mode: 53,
  });

  const [BannerApiJson] = await Promise.all([
    BannerApi.request({
      PageName: "Chart Reading",
    }),
  ]);

  const bannerApiData: Partial<IBannerApi> =
    convertData(BannerApiJson?.result) || {};

  console.log(bannerApiData)
  return (
    <>
      <Banner data={bannerApiData} />
      <BannerDownSection />
      <PlansEveryone linkId={bannerApiData.LinkId} />
      <WhatLearn />
      <LearningModules
        courseId={bannerApiData.CourseId}
        demoVideoLink={bannerApiData.WebsiteDemoVideoLink}
      />
      <ReviewSection />
      <TakeThisCourse />
      <FAQ courseId={2006} />
    </>
  );
}

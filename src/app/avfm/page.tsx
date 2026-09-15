import { getOrigin } from "@/app/lib/getOrigin";
import ServerApi from "@/utils/Server";
import convertData from "@/utils/convartData";
import type { Metadata } from "next";
import Banner, { IBannerApi } from "./Components/Banner";
import BannerDownSection from "./Components/BannerDownSection";
import FAQ from "./Components/FAQ";
import LearningModules from "./Components/LearningModules";
import PlansEveryone from "./Components/PlansEveryone";
import Practicallearning from "./Components/Practicallearning";
import ReviewSection from "./Components/ReviewSection";
import TakeThisCourse from "./Components/TakeThisCourse";
import WhatLearn from "./Components/WhatLearn";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Advanced Valuation & Financial Modelling Course | AVFM by The Valuation School",
    description:
      "Master valuation, financial modelling, DCF, Excel, and real company analysis with hands-on practice. Build career-ready finance skills with AVFM by The Valuation School.",
    alternates: {
      canonical: new URL(await getOrigin("/avfm")),
    },
  };
}

export default async function AVFM() {
  const BannerApi = new ServerApi({
    withAuth: false,
    spName: "SPClientAnonymous",
    mode: 53,
  });

  const [BannerApiJson] = await Promise.all([
    BannerApi.request({
      PageName: "AVFM",
    }),
  ]);

  const bannerApiData: Partial<IBannerApi> =
    convertData(BannerApiJson?.result) || {};

  // console.log(bannerApiData)

  return (
    <>
      <Banner data={bannerApiData} />
      <BannerDownSection />
      <PlansEveryone linkId={bannerApiData.LinkId} />
      <WhatLearn />
      <Practicallearning />
      <LearningModules
        courseId={bannerApiData.CourseId}
        demoVideoLink={bannerApiData.WebsiteDemoVideoLink}
      />
      <ReviewSection />
      <TakeThisCourse />
      <FAQ courseId={bannerApiData.CourseId} />
    </>

  );
}

import React from "react";
import type { Metadata } from "next";
import Banner, { IBannerApi } from "./Components/Banner";
import ServerApi from "@/utils/Server";
import convertData from "@/utils/convartData";
import BannerDownSection from "./Components/BannerDownSection";
import WhatLearn from "./Components/WhatLearn";
import Practicallearning from "./Components/Practicallearning";
import LearningModules from "./Components/LearningModules";
import PlansEveryone from "./Components/PlansEveryone";
import ReviewSection from "./Components/ReviewSection";
import TakeThisCourse from "./Components/TakeThisCourse";
import FAQ from "./Components/FAQ";

export const metadata: Metadata = {
  title: "Advanced Valuation & Financial Modelling Course | AVFM by The Valuation School",
  description:
    "Master valuation, financial modelling, DCF, Excel, and real company analysis with hands-on practice. Build career-ready finance skills with AVFM by The Valuation School.",
  alternates: {
    canonical: "/avfm",
  },
};

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

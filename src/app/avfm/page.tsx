import React from "react";
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

    console.log(bannerApiData)

  return (
    <>
      <Banner data={bannerApiData}/>
      <BannerDownSection />
      <WhatLearn />
      <Practicallearning />
      <LearningModules
        courseId={bannerApiData.CourseId}
        demoVideoLink={bannerApiData.WebsiteDemoVideoLink}
      />
      <PlansEveryone linkId={bannerApiData.LinkId} />
      <ReviewSection />
      <TakeThisCourse />
      <FAQ courseId={bannerApiData.CourseId} />
    </>

  );
}

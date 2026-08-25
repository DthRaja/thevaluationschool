import React from "react";
import Banner, { IBannerApi } from "./components/Banner";
import ServerApi from "@/utils/Server";
import convertData from "@/utils/convartData";
import BannerDownSection from "./components/BannerDownSection";
import CfaDetails from "./components/CfaDetails";
import LearningModules from "./components/LearningModules";
import PracticalModules from "./components/PracticalModules";
import Practicallearning from "./components/Practicallearning";
import ReviewSection from "./components/ReviewSection";
import FAQ from "./components/FAQ";
import PlansEveryone from "./components/PlansEveryone";

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
    console.log(bannerApiData)

  return (
    <>
      <Banner data={bannerApiData} />
      <BannerDownSection />
      <PlansEveryone linkId={bannerApiData.LinkId}/>
      <CfaDetails courseId={bannerApiData.CourseId} />
      <LearningModules
        courseId={1932}
        demoVideoLink={bannerApiData.WebsiteDemoVideoLink}
      />
      <PracticalModules />
      <Practicallearning />
      <ReviewSection />
      <FAQ courseId={1932} />
    </>
  );
}

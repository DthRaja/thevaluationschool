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

export const metadata: Metadata = {
  title: "Equity Research Cohort | Learn Equity Research with Real Company Analysis",
  description:
    "Learn equity research the practical way. Analyze real companies, study annual reports & concalls, detect red flags, build full equity research reports, and prepare for finance interviews with TVS.",
  alternates: {
    canonical: new URL(await getOrigin()),
  },
};

export default async function ERC() {
  const BannerApi = new ServerApi({
    withAuth: false,
    spName: "SPClientAnonymous",
    mode: 53,
  });

  const [BannerApiJson] = await Promise.all([
    BannerApi.request({
      PageName: "Equity Research Cohort",
    }),
  ]);

  const bannerApiData: Partial<IBannerApi> =
    convertData(BannerApiJson?.result) || {};

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
      <FAQ courseId={1675} />
    </>
  );
}

import Banner, { IBannerApi } from "./Components/Banner";
import ServerApi from "@/utils/Server";
import convertData from "@/utils/convartData";
import BannerDownSection from "./Components/BannerDownSection";
import PlansEveryone from "./Components/PlansEveryone";
import WhatLearn from "./Components/WhatLearn";
import LinkedInConnections from "./Components/LinkedInConnections";
import LearningModules from "./Components/LearningModules";
import ReviewSection from "./Components/ReviewSection";
import TakeThisCourse from "./Components/TakeThisCourse";
import FAQ from "./Components/FAQ";

export default async function ERC() {
  const BannerApi = new ServerApi({
    withAuth: false,
    spName: "SPClientAnonymous",
    mode: 53,
  });

  const [BannerApiJson] = await Promise.all([
    BannerApi.request({
      PageName: "LinkedIn Mentoring",
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
      <LinkedInConnections />
      <LearningModules
        courseId={bannerApiData.CourseId}
        demoVideoLink={bannerApiData.WebsiteDemoVideoLink}
      />
      <ReviewSection />
      <TakeThisCourse />
      <FAQ courseId={10145} />
    </>
  );
}

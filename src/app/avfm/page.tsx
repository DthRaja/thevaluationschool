import React from "react";
import Banner, { IBannerApi } from "./Components/Banner";
import ServerApi from "@/utils/Server";
import convertData from "@/utils/convartData";
import BannerDownSection from "./Components/BannerDownSection";
import WhatLearn from "./Components/WhatLearn";
import Practicallearning from "./Components/Practicallearning";

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
    </>

  );
}

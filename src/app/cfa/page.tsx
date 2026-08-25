import React from "react";
import Banner, { IBannerApi } from "./components/Banner";
import ServerApi from "@/utils/Server";
import convertData from "@/utils/convartData";
import BannerDownSection from "./components/BannerDownSection";
import WhatLearn from "./components/WhatLearn";
import CfaDetails from "./components/CfaDetails";

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
            <CfaDetails courseId={bannerApiData.CourseId} />

        </>
    );
}

import ServerApi from "@/utils/Server";
import convertData from "@/utils/convartData";
import Banner, { IBannerApi } from "./components/Banner";
import BannerDownSection from "./components/BannerDownSection";
import CfaDetails from "./components/CfaDetails";
import CarrierAfterCfa from "./components/CarrierAfterCfa";
import YoutubeSection from "./components/YoutubeSection";

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
            <CfaDetails />
            <CarrierAfterCfa />
            <YoutubeSection />
        </>
    );
}

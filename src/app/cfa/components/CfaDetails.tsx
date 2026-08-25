import ServerApi from "@/utils/Server";
import convertData from "@/utils/convartData";
import CfaDetailsClient, { type IEligibilityItem } from "./CfaDetailsClient";

interface IEligibilityApiResponse {
  Eligibility?: {
    ListData?: IEligibilityItem[];
  };
}



const CfaDetails = async () => {
  const eligibilityApi = new ServerApi({
    withAuth: false,
    spName: "SPClientAnonymous",
    mode: 52,
  });

  const eligibilityRes = await eligibilityApi.request({
    UniqueTable: "tblcourse",
    UniqueTable_Pk: 1932,
  });

  const eligibilityParsed: IEligibilityApiResponse =
    convertData(eligibilityRes?.result) || {};
  const eligibilityList: IEligibilityItem[] =
    eligibilityParsed?.Eligibility?.ListData ?? [];

  return <CfaDetailsClient eligibilityList={eligibilityList} />;
};

export default CfaDetails;

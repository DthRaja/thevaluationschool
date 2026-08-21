import AboutSection from "./Components/Home/AboutSection";
import Banner from "./Components/Home/Banner";
import OurCourses from "./Components/Home/OurCourses";
import ServerApi from "@/utils/Server";
import StudentsPlaced, {
  IStudentsPlaced,
} from "./Components/Home/StudentsPlaced";
import YouTubePlaylist, {
  IYouTubePlaylist,
} from "./Components/Home/YouTubePlaylist";
import convertData from "@/utils/convartData";
import JoyBringsSection, { IJoyBrings } from "./Components/Home/JoyBringsSection";

export default async function Home() {
  const StudentsPlacedApi = new ServerApi({
    withAuth: false,
    spName: "SPClientAnonymous",
    mode: 57,
  });

  const getYoutubeVideo = new ServerApi({
    withAuth: false,
    spName: "SPClientAnonymous",
    mode: 54,
  });

  const [studentPlacedJson, youTubeVideoJson, JoyBringsJson] =
    await Promise.all([
      StudentsPlacedApi.request({
        GroupName: "Companies where our students are placed",
        PageId: 16,
      }),

      getYoutubeVideo.request({
        PageName: "Home",
      }),

      StudentsPlacedApi.request({
        GroupName: "Joy brings results. Results bring joy.",
        PageId: 16,
      }),
    ]);

  const studentPlacedData: IStudentsPlaced[] =
    convertData(studentPlacedJson?.result) || [];
  const youTubeVideoData: IYouTubePlaylist[] =
    convertData(youTubeVideoJson?.result) || [];
  const joyBringsData: IJoyBrings[] =
    convertData(JoyBringsJson?.result) || [];

  return (
    <>
      <Banner />
      <AboutSection />
      <OurCourses />
      <StudentsPlaced data={studentPlacedData} />
      <YouTubePlaylist data={youTubeVideoData} />
      <JoyBringsSection data={joyBringsData}/>
    </>
  );
}

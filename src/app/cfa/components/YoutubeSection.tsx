import Image from "next/image";
import Link from "next/link";
import ServerApi from "@/utils/Server";
import convertData from "@/utils/convartData";
import YouTubeHeroSwiper from "../../Components/Home/YouTubeHeroSwiper";
import type { IYouTubePlaylist } from "../../Components/Home/YouTubePlaylist";

const CFA_PLAYLIST_LINKS = [
  { title: "Is CFA® for you?", href: "https://yt.openinapp.co/dzvsa" },
  { title: "CFA® level 1 roadmap", href: "https://yt.openinapp.co/1zvn0" },
  { title: "MBA vs CFA®", href: "https://yt.openinapp.co/w535a" },
];

const VIEW_ALL_HREF =
  "https://www.youtube.com/watch?v=01pP3cu2ZnE&list=PL3uUjzLk6Pumb03UdSCd0j5sGiOMkZ2Nm&pp=0gcJCaIEOCosWNin";

const YoutubeSection = async () => {
  const youtubeApi = new ServerApi({
    withAuth: false,
    spName: "SPClientAnonymous",
    mode: 54,
  });

  const youtubeRes = await youtubeApi.request({
    PageName: "CFA",
  });

  const videos: IYouTubePlaylist[] = convertData(youtubeRes?.result) || [];

  return (
    <div className="container cfa-youtube">
      <div className="row g-4 align-items-start">
        <div className="yout-tube-content-container top">
          <h3>CFA® Program Must Watch Videos</h3>
          <p className="description">
            Get a preview of your
            <br />
            related topic
          </p>
        </div>

        <div className="col-lg-7 youtube-box">
          <YouTubeHeroSwiper data={videos} />
        </div>

        <div className="col-lg-5 yout-tube-content-container">
          <h3>CFA® Program Must Watch Videos</h3>
          <p className="description">
            Get a preview of your
            <br />
            related topic
          </p>
          <ul>
            {CFA_PLAYLIST_LINKS.map((link) => (
              <li key={link.href}>
                <Image
                  src="/img/play-icon.svg"
                  alt="youtube-icon"
                  width={32}
                  height={32}
                />
                <Link
                  className="youtube-playlist"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            className="custom-btn"
            href={VIEW_ALL_HREF}
            target="_blank"
            rel="noopener noreferrer"
          >
            View All
            <Image
              src="/img/arrow-icon.svg"
              alt="arrow-icon"
              className="arrow-icon"
              width={32}
              height={32}
            />
            <Image
              src="/img/3lineseffect.svg"
              alt="arrow-icon"
              className="lines-effect-icon"
              width={43}
              height={48}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default YoutubeSection;

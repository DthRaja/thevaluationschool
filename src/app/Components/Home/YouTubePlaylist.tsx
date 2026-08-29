import Image from "next/image";
import Link from "next/link";
import React from "react";

import YouTubeHeroSwiper from "./YouTubeHeroSwiper";

export interface IYouTubePlaylist {
  url: string;
  title: string;
  img: string;
}

const playlists = [
  {
    title: "CFA Series",
    href: "https://www.youtube.com/playlist?list=PL3uUjzLk6Pumb03UdSCd0j5sGiOMkZ2Nm",
  },
  {
    title: "NISM 15 Research Analyst",
    href: "https://www.youtube.com/playlist?list=PL3uUjzLk6PukmKZU91uTBhDjv1EDxql8-",
  },
  {
    title: "NISM 8 Equity Derivatives",
    href: "https://www.youtube.com/playlist?list=PL3uUjzLk6Pul_eY8vn3SVGqN-5lNskr2F",
  },
];

const YouTubePlaylist = ({ data }: { data: IYouTubePlaylist[] }) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <>
      <div className="you-tube-section">
        <div className="container">
          <div className="row g-4 align-items-start">
            <div className="yout-tube-content-container top">
              <span>FREE</span>
              <h3>YouTube Playlist</h3>
              <p className="description">
                Enjoy our free <br />
                resources on Youtube
              </p>
            </div>

            {/* LEFT: Hero + Bottom strip */}
            <div className="col-lg-7">
              <YouTubeHeroSwiper data={data} />
            </div>

            {/* RIGHT: Playlist card */}
            <div className="col-lg-5 yout-tube-content-container">
              <span>FREE</span>
              <h3>YouTube Playlist</h3>
              <p className="description">
                Enjoy our free <br />
                resources on Youtube
              </p>
              <ul>
                {playlists.map((p) => (
                  <li key={p.href}>
                    <Image
                      src="/img/play-icon.svg"
                      alt=""
                      width={32}
                      height={32}
                    />
                    <Link
                      className="youtube-playlist"
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                className="custom-btn"
                href="https://www.youtube.com/@thevaluationschool/playlists"
                target="_blank"
                rel="noopener noreferrer"
              >
                View All
                <Image
                  src="/img/arrow-icon.svg"
                  alt=""
                  className="arrow-icon"
                  width={32}
                  height={32}
                />
                <Image
                  src="/img/3lineseffect.svg"
                  alt=""
                  className="lines-effect-icon"
                  width={43}
                  height={48}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default YouTubePlaylist;

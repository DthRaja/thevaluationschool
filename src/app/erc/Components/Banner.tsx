import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import React from "react";

export interface IBannerApi {
  HeaderTitle: string;
  HeaderDescription: string;
  YoutubeThumbnailUrl: string;
  HeaderYoutubeLink: string;
  BrochureLink: string;
  CourseId: number;
  WebsiteDemoVideoLink: string;
  LinkId: number;
}

const normalizePath = (path?: string) =>
  typeof path === "string" ? path.replace(/\\/g, "/") : path;

const Banner = ({ data }: { data: Partial<IBannerApi> }) => {
  return (
    <section className="course-banner-section">
      <div className="container">
        <div className="course-banner-container">
          <div className="course-banner-content">
            <span className="hero-badge">Flagship Finance Program • AVFM</span>

            <h1 id="AVFMHeading" className="hero-heading">
              {data.HeaderTitle}
            </h1>

            <p id="AVFMDes" className="hero-description">
              {data.HeaderDescription}
            </p>

            <div
              className="hero-trust-row"
              role="group"
              aria-label="Course trust indicators"
            >
              <div className="hero-trust-item">
                <Image
                  src="/img/course-students.png"
                  alt=""
                  width={79}
                  height={32}
                  className="hero-trust-avatars"
                />
                <div className="hero-trust-copy">
                  <span className="hero-trust-value">5,500+</span>
                  <span className="hero-trust-label">Learners</span>
                </div>
              </div>

              <span className="hero-trust-divider" aria-hidden="true"></span>

              <div className="hero-trust-item">
                <Image
                  src="/img/stars.svg"
                  alt=""
                  width={96}
                  height={19}
                  className="hero-trust-stars"
                />
                <div className="hero-trust-copy">
                  <span className="hero-trust-value">4.8/5</span>
                  <span className="hero-trust-label">Average Rating</span>
                </div>
              </div>
            </div>

            <div className="hero-cta-row">
              <a className="btn-hero-primary" href="#enroll">
                Enroll Now
                <ArrowRight
                  className="btn-hero-arrow"
                  size={18}
                  aria-hidden="true"
                />
              </a>
              {data.BrochureLink && (
                <Link className="btn-hero-secondary" href={data.BrochureLink} target="_blank">
                  <Download size={18} aria-hidden="true" />
                  Download Brochure
                </Link>
              )}
            </div>
          </div>

          <div className="course-banner-image">
            <div className="hero-video-card">
              <span className="hero-video-glow" aria-hidden="true"></span>
              <div className="course-banner-image-content">
                {data.YoutubeThumbnailUrl && (
                  <Image
                    className="main-image"
                    src={normalizePath(data.YoutubeThumbnailUrl) as string}
                    alt="AVFM course preview"
                    fill
                    sizes="(max-width: 1000px) 100vw, 50vw"
                    preload
                  />
                )}
                <span className="hero-video-overlay" aria-hidden="true"></span>

                {data.HeaderYoutubeLink && (
                  <a
                    className="play-btn"
                    href={data.HeaderYoutubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Watch AVFM program overview video"
                  >
                    <span className="play-btn-ring" aria-hidden="true"></span>
                    <Image src="/img/Play.svg" alt="" width={26} height={30} />
                  </a>
                )}

                <span className="hero-video-label">Watch Program Overview</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

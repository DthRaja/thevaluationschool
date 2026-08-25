import { ArrowRight } from "lucide-react";
import Image from "next/image";

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
                        <h1 id="CFAHeading" className="hero-heading">
                            {data.HeaderTitle}
                        </h1>

                        <p id="CFAHeaderDes" className="hero-description">
                            {data.HeaderDescription}
                        </p>

                        <div className="hero-cta-row">
                            <a className="btn-hero-primary" href="#enroll">
                                Enroll Now
                                <ArrowRight
                                    className="btn-hero-arrow"
                                    size={18}
                                    aria-hidden="true"
                                />
                            </a>
                        </div>
                    </div>

                    <div className="course-banner-image">
                        <div className="hero-video-card">
                            <span className="curriculum-badge">
                                Updated as per Feb 2027 curriculum
                            </span>
                            <span className="hero-video-glow" aria-hidden="true"></span>
                            <div className="course-banner-image-content">
                                {data.YoutubeThumbnailUrl && (
                                    <Image
                                        className="main-image"
                                        id="YoutubeImg"
                                        src={normalizePath(data.YoutubeThumbnailUrl) as string}
                                        alt="CFA level 1 course preview"
                                        fill
                                        sizes="(max-width: 1000px) 100vw, 50vw"
                                    />
                                )}
                                <span className="hero-video-overlay" aria-hidden="true"></span>

                                {data.HeaderYoutubeLink && (
                                    <a
                                        className="play-btn"
                                        id="YoutubeLink"
                                        href={data.HeaderYoutubeLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Watch CFA level 1 announcement video"
                                    >
                                        <span className="play-btn-ring" aria-hidden="true"></span>
                                        <Image src="/img/Play.svg" alt="" width={26} height={30} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;

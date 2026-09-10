import Image from "next/image";
import React from "react";

import HeroVideoModal from "./HeroVideoModal";

const Banner = () => {
    return (
        <>
            <div className="hero-section">
                <div className="hero-background">
                    <div className="container">
                        <div className="student-count">
                            <Image
                                src="/img/hero-section-student-icons.png"
                                alt="student-count"
                                width={186}
                                height={76}
                            />
                            <p>Over 5K+ happy students</p>
                        </div>
                        <div className="typography-container">
                            <h1 className="gradient-text">
                                <span className="gradient-text-1">LET’S</span>{" "}
                                <span className="gradient-text-2">TAKE</span>{" "}
                                <span className="gradient-text-3">IT TO</span>{" "}
                                <span className="gradient-text-4">THE</span>
                                <br />
                                NEXT LEVEL TOGETHER!
                            </h1>
                            <p>Stop Memorizing. Start Understanding.</p>
                        </div>

                        <div className="video-section">
                            <Image
                                className="lines-effect"
                                src="/img/3lineseffect.svg"
                                alt=""
                                width={43}
                                height={48}
                            />
                            <div className="video-container" id="videoBox">
                                <Image
                                    className="main-image"
                                    src="/img/Home-video.jpg"
                                    alt="video-icon"
                                    width={1280}
                                    height={720}
                                />
                                <HeroVideoModal />
                            </div>
                            <div className="arrow-icon-container">
                                <Image
                                    src="/img/hero-arrow.svg"
                                    alt=""
                                    width={109}
                                    height={120}
                                />
                                <p>Watch <br />till the end !</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Banner

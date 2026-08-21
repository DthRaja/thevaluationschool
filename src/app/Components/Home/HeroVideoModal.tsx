"use client";

import Image from "next/image";
import React, { useState } from "react";

const YOUTUBE_EMBED_URL = "https://www.youtube.com/embed/KMPXxsY_QPE?autoplay=1";

const HeroVideoModal = () => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const closeVideo = () => setIsVideoOpen(false);

    return (
        <>
            <button
                type="button"
                className="play-btn"
                id="playButton"
                onClick={() => setIsVideoOpen(true)}
            >
                <Image src="/img/Play.svg" alt="" width={39} height={44} />
            </button>

            {/* Video modal  */}
            <div
                id="videoModal"
                className={`video-modal ${isVideoOpen ? "open" : ""}`}
                onClick={(e) => {
                    if (e.target === e.currentTarget) closeVideo();
                }}
            >
                <button type="button" className="close-btn" id="closeModal" onClick={closeVideo}>
                    &times;
                </button>
                <div className="video-modal-content">
                    {isVideoOpen && (
                        <iframe
                            id="youtubeVideo"
                            width="100%"
                            height="100%"
                            title="YouTube video player"
                            src={YOUTUBE_EMBED_URL}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    )}
                </div>
            </div>
        </>
    );
};

export default HeroVideoModal;

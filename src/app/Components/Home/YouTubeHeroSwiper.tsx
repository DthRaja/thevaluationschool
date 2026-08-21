"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";

import "swiper/css";

import type { IYouTubePlaylist } from "./YouTubePlaylist";

const PER_PAGE = 2;

const normalizePath = (path: string) =>
    typeof path === "string" ? path.replace(/\\/g, "/") : path;

interface YouTubeHeroSwiperProps {
    data: IYouTubePlaylist[];
}

const YouTubeHeroSwiper = ({ data }: YouTubeHeroSwiperProps) => {
    const swiperRef = useRef<SwiperInstance | null>(null);
    const [page, setPage] = useState(0);

    const pages = Math.max(1, Math.ceil(data.length / PER_PAGE));
    const start = page * PER_PAGE;
    const bigSlots = [0, 1].map((i) => data[start + i]);
    const miniSlots = [0, 1, 2].map((i) => data[start + 2 + i]);
    const remaining = Math.max(0, data.length - (start + 5));

    const goTo = (idx: number) => {
        swiperRef.current?.slideToLoop(idx, 500);
    };

    return (
        <>
            <Swiper
                className="heroSwiper"
                modules={[Autoplay]}
                speed={500}
                loop={data.length > 1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
                {data.map((v, i) => (
                    <SwiperSlide key={i}>
                        <a
                            className="slide-link"
                            href={v.url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={v.title || `Video ${i + 1}`}
                        >
                            <Image
                                src={normalizePath(v.img)}
                                alt={v.title || `Video ${i + 1}`}
                                width={1280}
                                height={720}
                            />
                            <div className="play-overlay">
                                <Image
                                    src="/img/youtube-play-icon.svg"
                                    alt=""
                                    width={90}
                                    height={64}
                                />
                            </div>
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="bottom-strip">
                {bigSlots.map((v, i) => (
                    <button
                        type="button"
                        className={`big-card ${!v ? "is-empty" : ""}`}
                        key={`big-${i}`}
                        onClick={() => v && goTo(start + i)}
                        aria-label={v?.title || `video ${i + 1}`}
                        disabled={!v}
                    >
                        {v && (
                            <Image
                                src={normalizePath(v.img)}
                                alt=""
                                width={1280}
                                height={720}
                            />
                        )}
                    </button>
                ))}

                <div className="mini-box">
                    {miniSlots.map((v, i) => (
                        <button
                            type="button"
                            className={`mini-avatar ${!v ? "is-empty" : ""}`}
                            key={`mini-${i}`}
                            onClick={() => v && goTo(start + 2 + i)}
                            aria-label={v?.title || `next video ${i + 1}`}
                            disabled={!v}
                        >
                            {v && (
                                <Image
                                    src={normalizePath(v.img)}
                                    alt=""
                                    width={1280}
                                    height={720}
                                />
                            )}
                        </button>
                    ))}

                    {remaining > 0 && (
                        <button
                            type="button"
                            className="more-bubble"
                            onClick={() => setPage((p) => Math.min(p + 1, pages - 1))}
                            aria-label={`${remaining} more videos`}
                        >
                            +{remaining}
                        </button>
                    )}
                </div>
            </div>

            {pages > 1 && (
                <div className="dots">
                    {Array.from({ length: pages }).map((_, i) => (
                        <span
                            key={i}
                            className={`dot ${i === page ? "active" : ""}`}
                            onClick={() => setPage(i)}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export default YouTubeHeroSwiper;

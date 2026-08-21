"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";

import "swiper/css";

import type { IJoyBrings } from "./JoyBringsSection";

const normalizePath = (path: string) =>
    typeof path === "string" ? path.replace(/\\/g, "/") : path;

interface JoyBringsSliderProps {
    data: IJoyBrings[];
}

interface IconBoxProps {
    url?: string;
}

const IconBox = ({ url }: IconBoxProps) => {
    const icon = (
        <Image src="/img/LinkedIn.svg" alt="" width={27} height={25} />
    );

    if (!url) {
        return <div className="icon-box">{icon}</div>;
    }

    return (
        <a
            className="icon-box"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on LinkedIn"
        >
            {icon}
        </a>
    );
};

const JoyBringsSlider = ({ data }: JoyBringsSliderProps) => {
    const swiperRef = useRef<SwiperInstance | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const row1 = data.slice(0, 4);
    const row2 = data.slice(4, 9);

    const goTo = (idx: number) => {
        swiperRef.current?.slideToLoop(idx, 500);
    };

    const renderThumb = (item: IJoyBrings, idx: number) => (
        <div
            className={`student-image ${idx === activeIndex ? "active" : ""}`}
            key={idx}
            onClick={() => goTo(idx)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") goTo(idx);
            }}
        >
            <Image
                src={normalizePath(item.studentPhoto)}
                alt={item.name}
                loading="lazy"
                width={400}
                height={400}
            />
        </div>
    );

    return (
        <>
            <div>
                <div className="testimonial-student">
                    {row1.map((item, i) => renderThumb(item, i))}
                </div>
                <div className="testimonial-student testimonial-student-2">
                    {row2.map((item, i) => renderThumb(item, i + 4))}
                </div>
            </div>

            <Swiper
                className="testimonial-slider"
                modules={[Autoplay]}
                loop={data.length > 1}
                autoHeight
                speed={700}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
                {data.map((item, i) => (
                    <SwiperSlide key={i}>
                        <div className="testimonial-item">
                            <div className="sudent-details">
                                <IconBox url={item.LinkedInUrl} />
                                <div className="content">
                                    <h3>{item.name}</h3>
                                    <p>Student The Valuation School</p>
                                </div>
                            </div>
                            <div className="student-review">
                                <Image
                                    src="/img/message-left-icon.svg"
                                    alt=""
                                    width={48}
                                    height={36}
                                />
                                <Image
                                    src="/img/message-right-icon.svg"
                                    alt=""
                                    width={48}
                                    height={36}
                                />
                                <div
                                    dangerouslySetInnerHTML={{ __html: item.ContentText }}
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default JoyBringsSlider;

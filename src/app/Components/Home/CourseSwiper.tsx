"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CourseSwiperProps {
    children: React.ReactNode;
}

const CourseSwiper = ({ children }: CourseSwiperProps) => {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [navHeight, setNavHeight] = useState<number | null>(null);

    // The nav overlay spans the full swiper width (so the buttons can sit at
    // its true left/right edges), but it needs to be vertically centered on
    // just the card image, not the image+title+description stack below it.
    // The image's rendered height depends on the current slidesPerView
    // breakpoint, so it can't be expressed as a fixed CSS value — track it.
    useEffect(() => {
        const image = sectionRef.current?.querySelector(".course-card-image");

        if (!image) return;

        const observer = new ResizeObserver(([entry]) => {
            setNavHeight(entry.contentRect.height);
        });

        observer.observe(image);

        return () => observer.disconnect();
    }, []);

    return (
        <div className="course-card-section" ref={sectionRef}>
            <Swiper
                className="course-swiper"
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={1.2}
                spaceBetween={40}
                rewind
                autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                pagination={{ clickable: true }}
                onBeforeInit={(swiper) => {
                    const navigation = swiper.params.navigation;

                    if (navigation && typeof navigation !== "boolean") {
                        navigation.prevEl = prevRef.current;
                        navigation.nextEl = nextRef.current;
                    }
                }}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                breakpoints={{
                    768: { slidesPerView: 2.5, spaceBetween: 40, slidesOffsetBefore: 0 },
                    1200: { slidesPerView: 2.5, spaceBetween: 60, slidesOffsetBefore: 160 },
                    1801: { slidesPerView: 3, spaceBetween: 60, slidesOffsetBefore: 160 },
                }}
            >
                {React.Children.map(children, (child) => (
                    <SwiperSlide>{child}</SwiperSlide>
                ))}
            </Swiper>

            <div
                className="course-swiper-nav"
                style={navHeight ? { height: navHeight } : undefined}
            >
                <button
                    ref={prevRef}
                    type="button"
                    className="course-nav course-prev"
                    aria-label="Previous slide"
                >
                    <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M15.5 4.5 8.5 11.5l7 7" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <button
                    ref={nextRef}
                    type="button"
                    className="course-nav course-next"
                    aria-label="Next slide"
                >
                    <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M8.5 4.5 15.5 11.5l-7 7" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CourseSwiper;

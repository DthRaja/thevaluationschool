"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface AboutSwiperProps {
    children: React.ReactNode;
}

const AboutSwiper = ({ children }: AboutSwiperProps) => {
    return (
        <Swiper
            className="about-swiper"
            modules={[Pagination, Autoplay]}
            direction="vertical"
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            rewind
        >
            {React.Children.map(children, (child) => (
                <SwiperSlide>{child}</SwiperSlide>
            ))}
        </Swiper>
    );
};

export default AboutSwiper;

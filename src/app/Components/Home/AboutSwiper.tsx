"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface AboutSwiperProps {
  children: React.ReactNode;
}

const AboutSwiper = ({ children }: AboutSwiperProps) => {
  // On touch screens (phones and tablets alike) a vertical swipe must scroll the
  // page, so Swiper's own swiping is turned off there; the pagination dots and
  // autoplay still change slides. Mouse users can keep dragging.
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: coarse)");
    const update = () => setIsTouch(query.matches);

    update();
    query.addEventListener("change", update);

    return () => {
      query.removeEventListener("change", update);
    };
  }, []);

  return (
    <Swiper
      className="about-swiper"
      modules={[Pagination, Autoplay]}
      direction="vertical"
      pagination={{ clickable: true }}
      autoplay={{ delay: 6000, disableOnInteraction: false }}
      rewind
      allowTouchMove={!isTouch}
      touchStartPreventDefault={false}
    >
      {React.Children.map(children, (child) => (
        <SwiperSlide>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default AboutSwiper;

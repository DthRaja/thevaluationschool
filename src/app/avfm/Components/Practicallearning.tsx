"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

interface LearningCard {
  title: string;
  description: string;
  image: string;
}

const learningCards: LearningCard[] = [
  {
    title: "Case Study Driven",
    description:
      "Work on real companies and case studies to see how finance concepts apply in the real world.",
    image: "/img/Fundamental Analysis.png",
  },
  {
    title: "Interview Prep Classes",
    description:
      "Get ready for core finance interviews with technical Q&As, resume tips, and confidence-building guidance.",
    image: "/img/Real-World Valuation.png",
  },
  {
    title: "Forecasting in Excel",
    description:
      "Master Excel tools to project revenues, costs, and cash flows — the backbone of financial modeling.",
    image: "/img/Forecasting Future Growth.png",
  },
  {
    title: "Report Making",
    description:
      "Create professional valuation reports that present analysis clearly, just like analysts in top firms.",
    image: "/img/Report Writing.png",
  },
];

export const Practicallearning = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="learning-slider-section">
      <div className="container">
        <div className="learning-slider-container">
          <h3>Move for Practical learning</h3>
          <p>
            This program is built on learning by doing & not just theory.
            Every module focuses on practical tasks that mirror what real
            finance professionals work on.
          </p>
        </div>
        <div className="learning-slider-content">
          <Swiper
            className="learning-slider-swiper"
            modules={[Navigation]}
            slidesPerView="auto"
            spaceBetween={15}
            slideToClickedSlide
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              const navigation = swiper.params.navigation;

              if (navigation && typeof navigation !== "boolean") {
                navigation.prevEl = prevRef.current;
                navigation.nextEl = nextRef.current;
              }
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {learningCards.map((card) => (
              <SwiperSlide key={card.title}>
                <div className="learning-slider-card">
                  <div className="image-card">
                    <Image
                      src={card.image}
                      alt="learning-slider-image"
                      width={96}
                      height={96}
                      style={{ width: "96px", height: "auto" }}
                    />
                  </div>
                  <div className="details">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <button
              ref={prevRef}
              type="button"
              className="swiper-button-prev learning-prev"
              aria-label="Previous slide"
            />
            <button
              ref={nextRef}
              type="button"
              className="swiper-button-next learning-next"
              aria-label="Next slide"
            />
          </Swiper>

          <div className="learning-slider-pagination">
            <span>{activeIndex + 1}</span> of <span>{learningCards.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practicallearning;

"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperInstance } from "swiper";

import "swiper/css";

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

const AUTOPLAY_DELAY = 2600;
const TRANSITION_SPEED = 500;
const TOTAL = learningCards.length;

export const Practicallearning = () => {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isPausedRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // All navigation (autoplay, arrows, card clicks) goes through this one
  // path — slideToLoop(realIndex) — instead of Swiper's own slideNext()/
  // slidePrev()/Autoplay module. Those step via Swiper's internal "snap
  // grid," which assumes roughly-uniform slide widths; since the active
  // card is deliberately wider than the rest, that grid doesn't line up
  // one-to-one with real slides. slideTo/slideToLoop target an explicit
  // real index directly, sidestepping that mismatch entirely.
  const goToLoop = useCallback((index: number) => {
    const swiper = swiperRef.current;

    if (!swiper) return;

    const target = ((index % TOTAL) + TOTAL) % TOTAL;

    swiper.slideToLoop(target, TRANSITION_SPEED);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (isPausedRef.current) return;

      const swiper = swiperRef.current;

      if (!swiper) return;

      goToLoop(swiper.realIndex + 1);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(id);
  }, [goToLoop]);

  // The active card's width comes from a CSS class Swiper's own layout
  // engine never queries directly — re-measure once that width transition
  // actually finishes (not a guessed delay) so slideToLoop keeps landing
  // on the correct on-screen position for every subsequent navigation.
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName !== "width") return;

      swiperRef.current?.update();
    };

    container.addEventListener("transitionend", handleTransitionEnd);

    return () => container.removeEventListener("transitionend", handleTransitionEnd);
  }, []);

  // One-time correction for the very first render, before any transition
  // has had a chance to fire — self-heals via the listener above regardless.
  useEffect(() => {
    const timer = setTimeout(() => swiperRef.current?.update(), 100);

    return () => clearTimeout(timer);
  }, []);

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
        <div
          className="learning-slider-content"
          ref={containerRef}
          onMouseEnter={() => {
            isPausedRef.current = true;
          }}
          onMouseLeave={() => {
            isPausedRef.current = false;
          }}
        >
          <Swiper
            className="learning-slider-swiper"
            slidesPerView="auto"
            spaceBetween={15}
            loop={TOTAL > 1}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {learningCards.map((card, index) => (
              <SwiperSlide key={card.title} onClick={() => goToLoop(index)}>
                <div className="learning-slider-card">
                  <div className="image-card">
                    <Image
                      src={card.image}
                      alt="learning-slider-image"
                      fill
                      sizes="(max-width: 900px) 40vw, 20vw"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="details">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            className="learning-prev"
            aria-label="Previous slide"
            onClick={() => goToLoop(activeIndex - 1)}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            className="learning-next"
            aria-label="Next slide"
            onClick={() => goToLoop(activeIndex + 1)}
          >
            <ChevronRight aria-hidden="true" />
          </button>

          <div className="learning-slider-pagination">
            <span>{activeIndex + 1}</span> / <span>{TOTAL}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practicallearning;

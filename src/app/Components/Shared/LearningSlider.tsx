"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperInstance } from "swiper";

import "swiper/css";

export interface LearningSliderCard {
  title: string;
  description: string;
  image: string;
}

interface LearningSliderProps {
  title: string;
  description: string;
  cards: LearningSliderCard[];
}

const AUTOPLAY_DELAY = 2600;
const TRANSITION_SPEED = 500;

export const LearningSlider = ({ title, description, cards }: LearningSliderProps) => {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isPausedRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const total = cards.length;

  // All navigation (autoplay, arrows, card clicks) goes through this one
  // path — slideToLoop(realIndex) — instead of Swiper's own slideNext()/
  // slidePrev()/Autoplay module. Those step via Swiper's internal "snap
  // grid," which assumes roughly-uniform slide widths; since the active
  // card is deliberately wider than the rest, that grid doesn't line up
  // one-to-one with real slides. slideTo/slideToLoop target an explicit
  // real index directly, sidestepping that mismatch entirely.
  const goToLoop = useCallback(
    (index: number) => {
      const swiper = swiperRef.current;

      if (!swiper || total === 0) return;

      const target = ((index % total) + total) % total;

      swiper.slideToLoop(target, TRANSITION_SPEED);
    },
    [total]
  );

  useEffect(() => {
    if (total <= 1) return;

    const id = window.setInterval(() => {
      if (isPausedRef.current) return;

      const swiper = swiperRef.current;

      if (!swiper) return;

      goToLoop(swiper.realIndex + 1);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(id);
  }, [goToLoop, total]);

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
          <h3>{title}</h3>
          <p>{description}</p>
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
            loop={total > 1}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {cards.map((card, index) => (
              <SwiperSlide key={card.title} onClick={() => goToLoop(index)}>
                <div className="learning-slider-card">
                  <div className="image-card">
                    <Image
                      src={card.image}
                      alt="learning-slider-image"
                      width={200}
                      height={200}
                      style={{ width: "auto", height: "auto" }}
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
            <span>{activeIndex + 1}</span> of <span>{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningSlider;

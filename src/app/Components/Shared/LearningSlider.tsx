"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { type CSSProperties, useId, useState } from "react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";

import styles from "./LearningSlider.module.css";

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
const CARD_GAP = 15;
const cardBackground = "#e4f3eb";
const imageBackground =
  "linear-gradient(180deg, rgba(116, 209, 169, 0.40) 0%, rgba(128, 179, 157, 0.20) 100%)";
const headingStyle: CSSProperties = {
  fontFamily: '"Big Soulder Text", sans-serif',
  fontWeight: 700,
  lineHeight: 1.08,
};

export const LearningSlider = ({
  title,
  description,
  cards,
}: LearningSliderProps) => {
  const navigationId = useId().replace(/:/g, "");
  const previousClass = `learning-prev-${navigationId}`;
  const nextClass = `learning-next-${navigationId}`;
  const [activeIndex, setActiveIndex] = useState(0);
  const total = cards.length;

  return (
    <section className="py-5 overflow-hidden" style={{ background: "#f8fffb" }}>
      <div className="container py-lg-4">
        <div className="mb-4">
          <h2 className="mb-2" style={{ ...headingStyle, fontSize: 48 }}>
            {title}
          </h2>
          <p className="mb-0 text-secondary" style={{ maxWidth: 900 }}>
            {description}
          </p>
        </div>

        <div className="position-relative" style={{ height: 420 }}>
          <Swiper
            modules={[Autoplay, EffectFade, Navigation]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            slidesPerView={1}
            spaceBetween={0}
            loop={total > 1}
            speed={500}
            autoplay={
              total > 1
                ? {
                  delay: AUTOPLAY_DELAY,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
                : false
            }
            navigation={{
              prevEl: `.${previousClass}`,
              nextEl: `.${nextClass}`,
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            style={{ height: 420, overflow: "hidden" }}
          >
            {cards.map((_, frameIndex) => {
              const visibleCards = Array.from(
                { length: Math.min(4, total) },
                (__, position) => cards[(frameIndex + position) % total],
              );

              return (
                <SwiperSlide key={`learning-frame-${frameIndex}`}>
                  <div
                    className="d-flex align-items-start h-100"
                    style={{ gap: CARD_GAP }}
                  >
                    {visibleCards.map((card, position) => {
                      const isFeatured = position === 0;

                      return (
                        <article
                          key={`${frameIndex}-${position}-${card.title}`}
                          className={`d-flex flex-shrink-0 p-3 p-lg-4 overflow-hidden ${isFeatured
                            ? "flex-column flex-md-row align-items-stretch gap-3"
                            : "flex-column justify-content-between gap-3"
                            }`}
                          style={{
                            width: isFeatured
                              ? "min(510px, 86vw)"
                              : "min(245px, 62vw)",
                            height: isFeatured ? 420 : 308,
                            background: cardBackground,
                            borderRadius: 20,
                          }}
                        >
                          <div
                            className="d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{
                              width: isFeatured ? undefined : "100%",
                              flex: isFeatured ? "0 0 54%" : "1 1 auto",
                              minHeight: 0,
                              padding: 20,
                              background: imageBackground,
                              borderRadius: 15,
                            }}
                          >
                            <Image
                              src={card.image}
                              alt={card.title}
                              width={200}
                              height={200}
                              sizes={isFeatured ? "355px" : "200px"}
                              style={{
                                width: "auto",
                                height: "auto",
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                              }}
                            />
                          </div>

                          <div
                            className={`d-flex flex-column ${isFeatured
                              ? "flex-grow-1 justify-content-center pb-md-1"
                              : "flex-grow-0 justify-content-center"
                              }`}
                            style={{ minWidth: 0 }}
                          >
                            <h3
                              className="mb-0"
                              style={{
                                ...headingStyle,
                                fontSize: 25,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {card.title}
                            </h3>

                            {isFeatured && (
                              <p
                                className="mt-3 mb-0 text-secondary"
                                style={{ fontSize: 16, lineHeight: 1.5 }}
                              >
                                {card.description}
                              </p>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div
            className="d-flex align-items-center"
            style={{
              position: "absolute",
              bottom: 12,
              left: 0,
              right: 0,
              zIndex: 10,
              gap: 12,
              padding: "0 4px",
            }}
          >
            <div className={`d-flex gap-2 gap-sm-3 ${styles.navButtons}`}>
              {total > 1 && (
                <>
                  <button
                    type="button"
                    className={`btn btn-light d-inline-flex align-items-center justify-content-center rounded-circle shadow-sm border ${previousClass}`}
                    aria-label="Previous slide"
                    style={{
                      width: "clamp(38px, 9vw, 50px)",
                      height: "clamp(38px, 9vw, 50px)",

                    }}
                  >
                    <ChevronLeft aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className={`btn btn-light d-inline-flex align-items-center justify-content-center rounded-circle shadow-sm border ${nextClass}`}
                    aria-label="Next slide"
                    style={{
                      width: "clamp(38px, 9vw, 50px)",
                      height: "clamp(38px, 9vw, 50px)",

                    }}
                  >
                    <ChevronRight aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            <div
              className="text-secondary flex-shrink-0 ms-auto"
              aria-live="polite"
              style={{ zIndex: 10 }}
            >
              <span>{total === 0 ? 0 : activeIndex + 1}</span> of{" "}
              <span>{total}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningSlider;

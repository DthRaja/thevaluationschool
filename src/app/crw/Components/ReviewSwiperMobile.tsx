"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import ReviewCard, { type IReview } from "./ReviewCard";

interface ReviewSwiperMobileProps {
  reviews: IReview[];
}

const ReviewSwiperMobile = ({ reviews }: ReviewSwiperMobileProps) => {
  return (
    <Swiper
      className="review-swiper"
      modules={[Autoplay]}
      loop={reviews.length > 1}
      autoHeight
      speed={700}
      autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
    >
      {reviews.map((review, index) => (
        <SwiperSlide key={`${review.StudentName}-${index}`}>
          <ReviewCard review={review} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ReviewSwiperMobile;

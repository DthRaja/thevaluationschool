import React from "react";
import ServerApi from "@/utils/Server";
import convertData from "@/utils/convartData";
import ReviewCard, { type IReview } from "./ReviewCard";
import ReviewSwiperMobile from "./ReviewSwiperMobile";

const AVFM_REVIEW_PACKAGE_ID = 1368;

const ReviewSection = async () => {
  const reviewApi = new ServerApi({ withAuth: false, spName: "SPClientAnonymous", mode: 50 });
  const reviewRes = await reviewApi.request({ PackageId: AVFM_REVIEW_PACKAGE_ID });
  const reviews: IReview[] = convertData(reviewRes?.result) || [];

  const [review1, review2, review3] = reviews;

  return (
    <div className="review-section">
      <div className="container">
        <div className="review-container" id="avmfReview">
          <div className="review-col">
            <div className="review-col-header">
              <span>REVIEWS</span>
              <h3>What Our Learners Say</h3>
              <p id="iyuvl">Their words. Their journeys. Their results.</p>
            </div>
            {review1 && <ReviewCard review={review1} />}
          </div>

          <div className="review-col">
            {review2 && <ReviewCard review={review2} />}
            {review3 && <ReviewCard review={review3} />}
          </div>

          <div className="review-col mobile">
            <ReviewSwiperMobile reviews={[review1, review2, review3].filter(Boolean)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;

import React from "react";
import Image from "next/image";

export interface IReview {
  ImageUrl: string;
  StudentName: string;
  ContentText: string;
}

const normalizePath = (path?: string) =>
  typeof path === "string" ? path.replace(/\\/g, "/") : path;

const ReviewCard = ({ review }: { review: IReview }) => (
  <div className="review-card">
    <Image
      src="/img/stars.svg"
      alt="stars-icon"
      width={154}
      height={31}
      style={{ width: "150px", height: "auto" }}
    />
    <div dangerouslySetInnerHTML={{ __html: review.ContentText }} />
    <div className="details">
      <div className="student-image">
        <Image
          src={normalizePath(review.ImageUrl) as string}
          alt="linkedin-icon"
          width={64}
          height={64}
        />
      </div>
      <div>
        <h3>{review.StudentName}</h3>
        <p>Student The Valuation School</p>
      </div>
    </div>
  </div>
);

export default ReviewCard;

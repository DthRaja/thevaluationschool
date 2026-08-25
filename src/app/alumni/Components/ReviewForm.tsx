"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const STAR_PATH =
  "M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z";
const STAR_VALUES = [1, 2, 3, 4, 5];
const DRAFT_STORAGE_KEY = "userAluminiReview";

interface AuthenticatedUser {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
}

// TODO: wire this up to the real session lookup once alumni auth exists.
// Until then every visitor is treated as logged out, which reproduces the
// original widget's behavior of bouncing submission through a login page.
async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  return null;
}

const ReviewForm = () => {
  const router = useRouter();
  const starRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [textInvalid, setTextInvalid] = useState(false);
  const [ratingInvalid, setRatingInvalid] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Restores a draft left behind by an earlier visit that bounced through
  // the login redirect, so the user doesn't have to retype their review.
  useEffect(() => {
    const saved = sessionStorage.getItem(DRAFT_STORAGE_KEY);
    // sessionStorage isn't available during SSR, so the draft can only be
    // read post-mount — setting it eagerly here would mismatch the
    // server-rendered (empty) textarea.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setReviewText(saved);
  }, []);

  const canSubmit = reviewText.trim().length > 0 && rating > 0;

  const setRatingValue = (value: number) => {
    setRating(value);
    setRatingInvalid(false);
  };

  const handleStarKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    value: number,
  ) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      setRatingValue(value);
      return;
    }

    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      const next = Math.min(5, (rating || 0) + 1);
      setRatingValue(next);
      starRefs.current[next - 1]?.focus();
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      const next = Math.max(1, (rating || 1) - 1);
      setRatingValue(next);
      starRefs.current[next - 1]?.focus();
    }
  };

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    const trimmed = reviewText.trim();
    const hasText = trimmed.length > 0;
    const hasRating = rating > 0;

    setTextInvalid(!hasText);
    setRatingInvalid(!hasRating);
    if (!hasText || !hasRating) return;

    setSubmitting(true);
    sessionStorage.setItem(DRAFT_STORAGE_KEY, trimmed);

    try {
      const user = await getAuthenticatedUser();

      if (!user) {
        router.push(
          `/login?redirectUrl=${encodeURIComponent(window.location.href)}`,
        );
        return;
      }

      const res = await fetch("/api/alumni/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewText: trimmed,
          rating,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          mobile: user.mobile,
          pageUrl: window.location.href,
          userAgent: navigator.userAgent,
        }),
      });

      const data = await res.json();

      if (data?.isSuccess) {
        toast.success("Thanks for your review!");
        sessionStorage.removeItem(DRAFT_STORAGE_KEY);
        setReviewText("");
        setRating(0);
      } else {
        toast.error(data?.errorMessages?.[0] || "Sorry, submit failed. Please try again.");
      }
    } catch (error) {
      console.error("Review submit failed:", error);
      toast.error("Sorry, submit failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="enter-review-section">
      <div className="container">
        <div className="enter-review-container">
          <form className="input-area" onSubmit={handleSubmit}>
            <h3>Review About Your Experience</h3>
            <textarea
              placeholder="Enter Your Review Here"
              value={reviewText}
              aria-invalid={textInvalid}
              onChange={(event) => {
                setReviewText(event.target.value);
                if (event.target.value.trim().length > 0) setTextInvalid(false);
              }}
            />
            {textInvalid && (
              <div className="field-error">Please enter your review.</div>
            )}

            <p>Give Us A Rating</p>

            <div
              className="rating"
              role="radiogroup"
              aria-label="Star rating"
              aria-invalid={ratingInvalid}
            >
              {STAR_VALUES.map((value) => (
                <button
                  key={value}
                  type="button"
                  ref={(el) => {
                    starRefs.current[value - 1] = el;
                  }}
                  className={`star${value <= rating ? " filled" : ""}`}
                  role="radio"
                  aria-checked={value === rating}
                  aria-label={`${value} star${value > 1 ? "s" : ""}`}
                  tabIndex={value === (rating || 1) ? 0 : -1}
                  onClick={() => setRatingValue(value)}
                  onKeyDown={(event) => handleStarKeyDown(event, value)}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d={STAR_PATH} />
                  </svg>
                </button>
              ))}
            </div>
            {ratingInvalid && (
              <div className="field-error">Please select a star rating.</div>
            )}

            <button
              type="submit"
              className="submit-review-button"
              disabled={!canSubmit || submitting}
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>

          <div className="image-area">
            <img
              src="/img/enter-review-image.png"
              alt="enter-review-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;

const SHEET_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxOC9ZB0wRUwLdZoNf4bxzQNRFT6EatNcrsvzjAWLNrwvxmdR0qB9SKtZCCkBgaCFpU/exec";

interface ReviewSubmitBody {
  reviewText: string;
  rating: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  pageUrl?: string;
  userAgent?: string;
}

// Mirrors src/app/api/avfm/brochure/route.ts: a direct browser POST to the
// Apps Script webhook works (Google allows cross-origin no-cors requests),
// but no-cors makes the response unreadable, so the client can never tell
// success from failure. Proxying server-side gets a real status back.
export async function POST(request: Request) {
  const body: ReviewSubmitBody = await request.json();
  const { reviewText, rating, firstName, lastName, email, mobile, pageUrl, userAgent } = body;

  if (!reviewText?.trim() || !(rating >= 1 && rating <= 5)) {
    return Response.json(
      { isSuccess: false, errorMessages: ["A review and star rating are required."] },
      { status: 400 },
    );
  }

  const reviewer = [firstName, lastName].filter(Boolean).join(" ");
  const fullReviewText = [reviewText.trim(), reviewer, email, mobile]
    .filter(Boolean)
    .join(" - ");

  try {
    const sheetRes = await fetch(SHEET_WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: new URLSearchParams({
        reviewText: fullReviewText,
        rating: String(rating),
        pageUrl: pageUrl ?? "",
        userAgent: userAgent ?? "",
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!sheetRes.ok) {
      return Response.json(
        { isSuccess: false, errorMessages: ["Submission failed. Please try again."] },
        { status: 502 },
      );
    }

    return Response.json({ isSuccess: true });
  } catch (error) {
    console.error("Alumni review: Google Sheets webhook failed", error);
    return Response.json(
      { isSuccess: false, errorMessages: ["Submission failed. Please try again."] },
      { status: 502 },
    );
  }
}

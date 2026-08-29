import ServerApi from "@/utils/Server";

const SHEET_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxq_lO-65v-ZP3YGH5JZtrnmK4y1De__sPv3kOUbwJB-LTEisMLxTbXcq_JZqcQlTJn_Q/exec";

interface ContactSubmitBody {
  firstName: string;
  lastName: string;
  email: string;
  digitsOnly: string;
  dialCode: string;
  queryType: string;
  message: string;
  pageUrl?: string;
  userAgent?: string;
}

// Mirrors src/app/api/avfm/brochure/route.ts: the backend (panel.dthlms.com)
// sends no Access-Control-Allow-Origin header, so a browser-side fetch to it
// is always blocked by CORS — this route runs server-side and proxies the
// submission on the client's behalf, alongside the Google Sheets webhook.
export async function POST(request: Request) {
  const body: ContactSubmitBody = await request.json();
  const { firstName, lastName, email, digitsOnly, dialCode, queryType, message, pageUrl, userAgent } = body;

  const formattedPhone = `${dialCode} ${digitsOnly}`;

  const api = new ServerApi({ withAuth: false, spName: "SPClientAnonymous", mode: 63 });

  const [backendResult, sheetResult] = await Promise.allSettled([
    api.request({
      StudentEmail: email,
      StudentPhoneNumber: formattedPhone,
      StudentName: `${firstName} ${lastName}`,
      StudentMessage: message,
      CourseName: "",
      QueryType: queryType,
    }),
    fetch(SHEET_WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: new URLSearchParams({
        firstName,
        lastName,
        email,
        countryCode: dialCode,
        phone: digitsOnly,
        queryType,
        message,
        submittedAt: new Date().toISOString(),
        source: "Contact Form",
        pageUrl: pageUrl ?? "",
        userAgent: userAgent ?? "",
      }),
    }),
  ]);

  if (sheetResult.status === "rejected") {
    console.error("Contact form: Google Sheets webhook failed (non-blocking)", sheetResult.reason);
  }

  if (backendResult.status === "fulfilled" && backendResult.value?.isSuccess) {
    return Response.json({ isSuccess: true });
  }

  const errorMessage =
    backendResult.status === "fulfilled" ? backendResult.value?.errorMessages?.[0] : undefined;

  return Response.json(
    { isSuccess: false, errorMessages: errorMessage ? [errorMessage] : undefined },
    { status: 502 },
  );
}

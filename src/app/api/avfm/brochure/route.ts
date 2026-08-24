import ServerApi from "@/utils/Server";

const SHEET_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbzzadWmZA4lUD5wo1rpaI07bhZAK5GGoRvGLh2kwBwRgesm37pbUqpIGGtLw2V5mnFP/exec";

interface BrochureSubmitBody {
  firstName: string;
  lastName: string;
  email: string;
  digitsOnly: string;
  dialCode: string;
  country: string;
  employment: string;
  pageUrl?: string;
  userAgent?: string;
}

// The backend (panel.dthlms.com) sends no Access-Control-Allow-Origin header,
// so a browser-side fetch to it is always blocked by CORS — this route runs
// server-side (no CORS involved) and proxies the submission on the client's
// behalf, matching how every other ServerApi call in this app already works.
export async function POST(request: Request) {
  const body: BrochureSubmitBody = await request.json();
  const { firstName, lastName, email, digitsOnly, dialCode, country, employment, pageUrl, userAgent } = body;

  const formattedPhone = `${dialCode} ${digitsOnly}`;

  const api = new ServerApi({ withAuth: false, spName: "SPClientAnonymous", mode: 37 });

  const [backendResult, sheetResult] = await Promise.allSettled([
    api.request({
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Phone: formattedPhone,
      Country: country,
      UserType: employment,
      PackageId: 655,
      PackageName: "AVFM Program",
      PageId: 10,
    }),
    fetch(SHEET_WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: new URLSearchParams({
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        CountryCode: dialCode,
        Phone: digitsOnly,
        Country: country,
        Employment: employment,
        packageId: "655",
        packageName: "AVFM Program",
        submittedAt: new Date().toISOString(),
        source: "Brochure Modal",
        pageUrl: pageUrl ?? "",
        userAgent: userAgent ?? "",
      }),
    }),
  ]);

  if (sheetResult.status === "rejected") {
    console.error("Brochure form: Google Sheets webhook failed (non-blocking)", sheetResult.reason);
  }

  if (backendResult.status === "fulfilled" && backendResult.value?.isSuccess) {
    return Response.json({ isSuccess: true });
  }

  const message =
    backendResult.status === "fulfilled" ? backendResult.value?.errorMessages?.[0] : undefined;

  return Response.json(
    { isSuccess: false, errorMessages: message ? [message] : undefined },
    { status: 502 },
  );
}

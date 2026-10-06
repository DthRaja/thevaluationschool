interface WhatsAppLeadBody {
  name: string;
  email: string;
  topic: string;
  courses: string[];
  message: string;
  pageUrl: string;
}

const GOOGLE_SHEET_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbwQS54JzEPWHQKz-55YO23nG5pwtgyi3hC-9nxuprxLVkJMQvWAyrzF8I8-kwD5P9-b/exec";

// Saves a "Contact us on WhatsApp" submission to Google Sheets via an Apps
// Script web app (scripts/whatsapp-leads.gs). Runs server-side so the script
// URL and shared secret never reach the browser, and so we can read the
// script's response (a browser fetch to script.google.com can't, due to CORS).
export async function POST(request: Request) {
  const webhookUrl = GOOGLE_SHEET_WEBHOOK_URL;

  let body: WhatsAppLeadBody;

  try {
    body = await request.json();
  } catch {
    return Response.json({ isSuccess: false }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const topic = String(body.topic ?? "").trim();
  const message = String(body.message ?? "").trim();
  const courses = Array.isArray(body.courses) ? body.courses.map(String) : [];

  if (!name || !email || !topic || !message || message.length > 500) {
    return Response.json({ isSuccess: false }, { status: 400 });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.GOOGLE_SHEET_SECRET ?? "",
        name,
        email,
        topic,
        courses: courses.join(", "),
        message,
        pageUrl: String(body.pageUrl ?? ""),
      }),
      cache: "no-store",
    });

    const result = await res.json().catch(() => null);

    if (res.ok && result?.ok) {
      return Response.json({ isSuccess: true });
    }

    console.error("Google Sheet webhook rejected submission:", res.status, result);
  } catch (error) {
    console.error("Google Sheet webhook error:", error);
  }

  return Response.json({ isSuccess: false }, { status: 502 });
}

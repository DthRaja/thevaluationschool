import ServerApi from "@/utils/Server";

interface ScheduleSubmitBody {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phoneNumber: string;
  bookDate: string;
  timeSlotId: string;
  topic: string;
  queryText: string;
}

interface ISchedulePayload {
  FirstName: string;
  LastName: string;
  Email: string;
  Country: string;
  PhoneNumber: string;
  BookDate: string;
  TimeSlotId: string;
  Topic: string;
  QueryText: string;
}

const SHEETS_HOOK_URL =
  "https://script.google.com/macros/s/AKfycbyQsyXxb4g-rR5Ytipx9hYOegWBqK2P7zD5AkDniVcvcD1mFzqfAfCyCPB6p1S6H4_7/exec";
const SHEETS_HOOK_SECRET =
  "kTlyKOAnbMTUm1GkZvalsBQN3v4DyyuBuXm0-EMZO0q61E63LpVF26KxRMf9yJr5";

async function sendToGoogleSheet(payloadData: ISchedulePayload) {
  try {
    const sheetPayload = { ...payloadData };

    if (sheetPayload.PhoneNumber) {
      sheetPayload.PhoneNumber = String(sheetPayload.PhoneNumber)
        .replace(/^\+\d+\s*/, "")
        .replace(/\s+/g, "");
    }

    const fd = new FormData();
    fd.append("secret", SHEETS_HOOK_SECRET);
    fd.append("row", JSON.stringify(sheetPayload));
    fd.append(
      "meta",
      JSON.stringify({
        submittedAt: new Date().toISOString(),
        source: "scheduleCallForm",
        utm: "",
      }),
    );

    const res = await fetch(SHEETS_HOOK_URL, { method: "POST", body: fd });
    const json = await res.json();
    // console.log(json);
    // if (!json.ok) throw new Error(json.error || "Sheet hook error");
    return true;
  } catch (e) {
    console.error("Sheet hook error:", e);
    return false;
  }
}

// Mirrors src/app/api/contact/route.ts and src/app/api/avfm/brochure/route.ts:
// the backend (panel.dthlms.com) sends no Access-Control-Allow-Origin header,
// so a browser-side fetch to it is always blocked by CORS — this route runs
// server-side and proxies the Schedule a Call submission on the client's behalf.
export async function POST(request: Request) {
  const body: ScheduleSubmitBody = await request.json();
  const {
    firstName,
    lastName,
    email,
    country,
    phoneNumber,
    bookDate,
    timeSlotId,
    topic,
    queryText,
  } = body;

  const api = new ServerApi({
    withAuth: false,
    spName: "SPClientAnonymous",
    mode: 36,
  });

  const payload: ISchedulePayload = {
    FirstName: firstName,
    LastName: lastName,
    Email: email,
    Country: country,
    PhoneNumber: phoneNumber,
    BookDate: bookDate,
    TimeSlotId: timeSlotId,
    Topic: topic,
    QueryText: queryText,
  };

  const [res1, res2] = await Promise.all([
    api.request(payload),
    sendToGoogleSheet(payload),
  ]);

  if (res1?.isSuccess) {
    return Response.json({ isSuccess: true });
  }

  return Response.json(
    { isSuccess: false, errorMessages: res1?.errorMessages },
    { status: 502 },
  );
}

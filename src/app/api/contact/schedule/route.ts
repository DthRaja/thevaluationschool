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

// Mirrors src/app/api/contact/route.ts and src/app/api/avfm/brochure/route.ts:
// the backend (panel.dthlms.com) sends no Access-Control-Allow-Origin header,
// so a browser-side fetch to it is always blocked by CORS — this route runs
// server-side and proxies the Schedule a Call submission on the client's behalf.
export async function POST(request: Request) {
  const body: ScheduleSubmitBody = await request.json();
  const { firstName, lastName, email, country, phoneNumber, bookDate, timeSlotId, topic, queryText } = body;

  const api = new ServerApi({ withAuth: false, spName: "SPClientAnonymous", mode: 36 });

  const result = await api.request({
    FirstName: firstName,
    LastName: lastName,
    Email: email,
    Country: country,
    PhoneNumber: phoneNumber,
    BookDate: bookDate,
    TimeSlotId: timeSlotId,
    Topic: topic,
    QueryText: queryText,
  });

  if (result?.isSuccess) {
    return Response.json({ isSuccess: true });
  }

  return Response.json(
    { isSuccess: false, errorMessages: result?.errorMessages },
    { status: 502 },
  );
}

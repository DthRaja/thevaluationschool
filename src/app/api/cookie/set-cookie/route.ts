import { cookies } from "next/headers";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ApiResponse } from "@/utils/Server";

type SetCookieBody = Partial<Omit<ResponseCookie, "name" | "value">> & {
  name?: string;
  value?: string;
};

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    const res: ApiResponse = {
      statusCode: 404,
      isSuccess: false,
      errorMessages: ["Not available"],
      result: undefined,
    };
    return Response.json(res, { status: 404 });
  }

  const { name, value, ...options } = (await request.json()) as SetCookieBody;

  if (!name || value === undefined) {
    const res: ApiResponse = {
      statusCode: 400,
      isSuccess: false,
      errorMessages: ["name and value are required"],
      result: undefined,
    };
    return Response.json(res, { status: 400 });
  }

  const cookieStore = await cookies();
  cookieStore.set({ name, value, ...options });

  const res: ApiResponse = {
    statusCode: 200,
    isSuccess: true,
    result: "Cookie set successfully",
  };
  return Response.json(res);
}

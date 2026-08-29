import { cookies } from "next/headers";
import { ApiResponse } from "@/utils/Server";

// Test-only endpoint: GET ?name=xyz to read a single cookie, or omit to read all cookies.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  const cookieStore = await cookies();

  if (name) {
    const cookie = cookieStore.get(name);
    if (!cookie) {
      const res: ApiResponse = {
        statusCode: 404,
        isSuccess: false,
        errorMessages: [`cookie "${name}" not found`],
        result: undefined,
      };
      return Response.json(res, { status: 404 });
    }

    const res: ApiResponse = {
      statusCode: 200,
      isSuccess: true,
      result: cookie,
    };
    return Response.json(res);
  }

  const res: ApiResponse = {
    statusCode: 400,
    isSuccess: false,
    result: undefined,
    errorMessages: ["name is required"],
  };
  return Response.json(res);
}

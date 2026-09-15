import { headers } from "next/headers";

export async function getOrigin(pathname = "") {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";

  return `${protocol}://${host}${pathname}`;
}

import { headers } from "next/headers";

export async function getOrigin() {
  const headersList = await headers();
  // const host = headersList.get('host');
  // const protocol = headersList.get('x-forwarded-proto') || 'http';
  const pathname = headersList.get("referer") || "";
  const origin = `${pathname}`;

  return origin;
}

// app/not-found.tsx
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function NotFound(): Promise<never> {
  const headersList = await headers();
  // Get the full relative path including query params (e.g., "/dashboard?ref=123")
  const rawUrl = headersList.get('x-url') || headersList.get('x-invoke-path') || '';

  // Parse pathname and search string separately
  const [pathname, search] = rawUrl.split('?');
  const queryString = search ? `?${search}` : '';

  // Prevent infinite redirects
  if (pathname.startsWith('/secure')) {
    redirect(`/secure${queryString}`);
  }

  // Redirects /dashboard?ref=123 -> /secure/dashboard?ref=123
  redirect(`/secure${pathname}${queryString}`);
}

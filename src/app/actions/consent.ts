"use server";

import { cookies } from "next/headers";

import { CONSENT_COOKIE, type ConsentValue } from "@/app/lib/consent";

// One year — a cookie-consent choice is meant to stick.
const CONSENT_MAX_AGE = 60 * 60 * 24 * 365;

export const setConsent = async (value: ConsentValue) => {
  const cookieStore = await cookies();
  cookieStore.set(CONSENT_COOKIE, value, {
    maxAge: CONSENT_MAX_AGE,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
};

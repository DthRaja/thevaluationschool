export const CONSENT_COOKIE = "tvs-cookie-consent";
export type ConsentValue = "accepted" | "rejected";

export const isConsentValue = (value: string | undefined): value is ConsentValue =>
  value === "accepted" || value === "rejected";

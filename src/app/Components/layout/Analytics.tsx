"use client";
import { Cookie, X } from "lucide-react";
import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";

interface MetaScript {
  src?: string;
  content?: string;
}

const CONSENT_KEY = "tvs-cookie-consent";
const CONSENT_EVENT = "tvs-cookie-consent-change";

// "unknown" = server render / first hydration pass, so nothing flashes and
// server + client markup match. "none" = visitor has not chosen yet.
type ConsentState = "unknown" | "none" | "accepted" | "rejected";

const subscribe = (onChange: () => void) => {
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onChange); // choice made in another tab
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
};

const getSnapshot = (): ConsentState => {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "rejected" ? value : "none";
  } catch {
    return "none"; // storage blocked: ask every visit, load nothing
  }
};

const getServerSnapshot = (): ConsentState => "unknown";

const saveConsent = (value: "accepted" | "rejected") => {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage blocked — choice only lasts until reload */
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
};

const Analytics = () => {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [scripts, setScripts] = useState<MetaScript[]>([]);
  // Closing the banner is not a choice: it is only hidden until the next full
  // page load, and keeps coming back until the visitor accepts or declines.
  const [dismissed, setDismissed] = useState(false);

  // The meta scripts are only requested once the visitor has accepted.
  useEffect(() => {
    if (consent !== "accepted") return;

    let cancelled = false;

    fetch("/api/meta-scripts")
      .then((res) => (res.ok ? res.json() : { scripts: [] }))
      .then((data: { scripts?: MetaScript[] }) => {
        if (!cancelled) setScripts(data.scripts ?? []);
      })
      .catch(() => {
        /* analytics is optional — fail silently */
      });

    return () => {
      cancelled = true;
    };
  }, [consent]);

  return (
    <>
      {consent === "none" && !dismissed && (
        <div
          className="cookie-consent"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
        >
          <button
            type="button"
            className="cookie-consent-close"
            aria-label="Close cookie banner"
            onClick={() => setDismissed(true)}
          >
            <X aria-hidden="true" />
          </button>
          <h2 className="cookie-consent-title">
            <Cookie className="cookie-consent-icon" aria-hidden="true" />
            We value your privacy
          </h2>
          <p className="cookie-consent-text">
            We use cookies for analytics and marketing to understand how our
            site is used and to improve our courses.
          </p>
          <div className="cookie-consent-actions">
            <button
              type="button"
              className="cookie-consent-btn cookie-consent-btn-secondary"
              onClick={() => saveConsent("rejected")}
            >
              Decline
            </button>
            <button
              type="button"
              className="cookie-consent-btn cookie-consent-btn-primary"
              onClick={() => saveConsent("accepted")}
            >
              Accept
            </button>
          </div>
        </div>
      )}

      {consent === "accepted" &&
        scripts.map(({ src, content }, index) =>
          src ? (
            <Script
              key={index}
              id={`meta-script-${index}`}
              src={src}
              strategy="lazyOnload"
            />
          ) : (
            <Script key={index} id={`meta-script-${index}`} strategy="lazyOnload">
              {content}
            </Script>
          ),
        )}
    </>
  );
};

export default Analytics;

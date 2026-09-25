"use client";
import { Cookie, X } from "lucide-react";
import { useState, useTransition } from "react";

import { setConsent } from "@/app/actions/consent";
import type { ConsentValue } from "@/app/lib/consent";

interface AnalyticsProps {
  // Read server-side from the consent cookie (see HeadScripts/BodyContent,
  // which render the actual GA/GTM/Meta Pixel tags once this is "accepted").
  // undefined = visitor hasn't chosen yet.
  initialConsent: ConsentValue | undefined;
}

const Analytics = ({ initialConsent }: AnalyticsProps) => {
  const [isPending, startTransition] = useTransition();
  const [consent, setLocalConsent] = useState(initialConsent);
  // Closing the banner is not a choice: it is only hidden until the next full
  // page load, and keeps coming back until the visitor accepts or declines.
  const [dismissed, setDismissed] = useState(false);

  const choose = (value: ConsentValue) => {
    setLocalConsent(value);
    startTransition(async () => {
      await setConsent(value);
      // HeadScripts/BodyContent render literal <script>/<noscript> tags in
      // the server HTML. Browsers only execute <script> elements they parse
      // natively out of the document — ones React inserts client-side (which
      // is all a router.refresh() soft-merge would do) never run. A full
      // reload is the only way to get the browser to parse and execute them
      // once accepted.
      window.location.reload();
    });
  };

  return (
    <>
      {consent === undefined && !dismissed && (
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
              disabled={isPending}
              onClick={() => choose("rejected")}
            >
              Decline
            </button>
            <button
              type="button"
              className="cookie-consent-btn cookie-consent-btn-primary"
              disabled={isPending}
              onClick={() => choose("accepted")}
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Analytics;

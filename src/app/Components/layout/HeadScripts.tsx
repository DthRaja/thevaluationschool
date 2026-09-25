import { cookies } from "next/headers";

import { CONSENT_COOKIE } from "@/app/lib/consent";
import { getMetaScripts } from "@/app/lib/getMetaScripts";

// Server-rendered — only appears in the response once the visitor has
// previously accepted the cookie banner (accepting sets the "tvs-cookie-consent"
// cookie and refreshes the page). "script" tags land here, in <head>, as
// literal DOM nodes.
const HeadScripts = async () => {
  const cookieStore = await cookies();
  const consent = cookieStore.get(CONSENT_COOKIE)?.value;

  if (consent !== "accepted") return null;

  const { scripts } = await getMetaScripts();

  return (
    <>
      {scripts.map(({ src, content }, index) =>
        src ? (
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script key={index} src={src} async />
        ) : (
          <script
            key={index}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: content ?? "" }}
          />
        ),
      )}
    </>
  );
};

export default HeadScripts;

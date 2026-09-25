import { cookies } from "next/headers";

import { CONSENT_COOKIE } from "@/app/lib/consent";
import { getMetaScripts } from "@/app/lib/getMetaScripts";

// Server-rendered — only appears once the visitor has accepted the cookie
// banner. "content" tags (raw HTML, e.g. GTM/Meta Pixel <noscript> fallbacks)
// land here, in <body>.
const BodyContent = async () => {
  const cookieStore = await cookies();
  const consent = cookieStore.get(CONSENT_COOKIE)?.value;

  if (consent !== "accepted") return null;

  const { content } = await getMetaScripts();

  return (
    <>
      {content.map((html, index) => (
        <div
          key={index}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ))}
    </>
  );
};

export default BodyContent;

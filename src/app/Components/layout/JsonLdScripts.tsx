import convertData from "@/utils/convartData";
import ServerApi from "@/utils/Server";
import { headers } from "next/headers";

interface MetaTags {
  type?: string;
  content?: string;
  mime?: string;
}

const JsonLdScripts = async () => {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";

//   console.log(pathname)

  const api = new ServerApi({
    withAuth: false,
    spName: "SPClientAnonymous",
    mode: 85,
  });

  const res = await api.request({ Slug: pathname });
  if (res.error) {
    return null;
  }

  const json = convertData(res?.result) || [];

  let allMetaTags: MetaTags[] = [];

  json.forEach((elm: any) => {
    const tags = JSON.parse(elm.Meta_tags);
    if (Array.isArray(tags)) {
      allMetaTags = [...allMetaTags, ...tags];
    } else {
      allMetaTags.push(tags);
    }
  });

  return (
    <>
      {allMetaTags.map((t, i) =>
        t.type === "script" ? (
          <script
            key={`json-ld-${i}`}
            type={t.mime}
            // Escape "<" so content can't close the <script> tag early
            dangerouslySetInnerHTML={{ __html: t.content?.replace(/</g, "\\u003c") ?? '' }}
          />
        ) : null
      )}
    </>
  );
};

export default JsonLdScripts;

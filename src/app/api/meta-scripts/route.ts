import convertData from "@/utils/convartData";
import ServerApi from "@/utils/Server";

interface MetaTagRow {
  MetaTagId: number;
  // JSON string: [{ type: "script" | "meta" | "link", src?, content?, ... }]
  Meta_tags: string;
}

interface MetaTag {
  type: string;
  src?: string;
  content?: string;
}

export interface MetaScript {
  src?: string;
  content?: string;
}

// panel.dthlms.com sends no CORS headers, so the browser can't call it
// directly — the client calls this route instead (only after cookie consent).
// Only tags of type "script" are returned; link/meta tags are ignored.
const getMetaScripts = async (): Promise<MetaScript[]> => {
  const res = await new ServerApi({
    withAuth: false,
    spName: "SPClientAnonymous",
    mode: 85,
  }).request();

  const rows = convertData(res?.result) as MetaTagRow[] | false;
  if (!Array.isArray(rows)) return [];

  const scripts = new Map<string, MetaScript>();

  for (const row of rows) {
    let tags: unknown;
    try {
      tags = JSON.parse(row.Meta_tags);
    } catch {
      continue;
    }
    if (!Array.isArray(tags)) continue;

    for (const tag of tags as MetaTag[]) {
      if (tag?.type !== "script") continue;

      const key = tag.src ?? tag.content;
      if (!key || scripts.has(key)) continue;

      scripts.set(key, { src: tag.src, content: tag.content });
    }
  }

  return [...scripts.values()];
};

export async function GET() {
  try {
    const scripts = await getMetaScripts();

    return Response.json(
      { scripts },
      {
        headers: {
          "Cache-Control": "public, max-age=300, s-maxage=300",
        },
      },
    );
  } catch (error) {
    console.error("Meta scripts API error:", error);
    return Response.json({ scripts: [] as MetaScript[] });
  }
}

import convertData from "@/utils/convartData";
import ServerApi from "@/utils/Server";

export interface MetaScript {
  src?: string;
  content?: string;
}

export interface MetaScriptsResult {
  scripts: MetaScript[];
  // Raw HTML (e.g. GTM/Meta Pixel <noscript> fallbacks) meant to render in
  // <body>, not execute as a script.
  content: string[];
}

interface MetaTagRow {
  MetaTagId: number;
  // JSON string: [{ type: "script" | "content" | "meta" | "link", src?, content?, ... }]
  Meta_tags: string;
}

interface MetaTag {
  type: string;
  src?: string;
  content?: string;
}

// panel.dthlms.com sends no CORS headers, so this can only be called
// server-side. Only tags of type "script" and "content" are returned;
// "meta"/"link" tags are ignored here — those are already handled via the
// Metadata API in layout.tsx's generateMetadata.
//
// Shared by the server-rendered <HeadScripts>/<BodyContent> components and
// the /api/meta-scripts route.
export const getMetaScripts = async (): Promise<MetaScriptsResult> => {
  try {
    const res = await new ServerApi({
      withAuth: false,
      spName: "SPClientAnonymous",
      mode: 85,
    }).request();

    const rows = convertData(res?.result) as MetaTagRow[] | false;
    if (!Array.isArray(rows)) return { scripts: [], content: [] };

    const scripts = new Map<string, MetaScript>();
    const content = new Set<string>();

    for (const row of rows) {
      let tags: unknown;
      try {
        tags = JSON.parse(row.Meta_tags);
      } catch {
        continue;
      }
      if (!Array.isArray(tags)) continue;

      for (const tag of tags as MetaTag[]) {
        if (tag?.type === "script") {
          const key = tag.src ?? tag.content;
          if (!key || scripts.has(key)) continue;

          scripts.set(key, { src: tag.src, content: tag.content });
        } else if (tag?.type === "content" && tag.content) {
          content.add(tag.content);
        }
      }
    }

    return { scripts: [...scripts.values()], content: [...content] };
  } catch (error) {
    console.error("Meta scripts fetch error:", error);
    return { scripts: [], content: [] };
  }
};

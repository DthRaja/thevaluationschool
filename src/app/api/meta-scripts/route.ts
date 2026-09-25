import { getMetaScripts, type MetaScript } from "@/app/lib/getMetaScripts";

// No longer used by the app itself — HeadScripts/BodyContent call
// getMetaScripts() directly, server-side, to render tags without an extra
// round trip. Kept as a thin wrapper around the shared fetcher for any
// external/debugging use.
export async function GET() {
  try {
    const { scripts, content } = await getMetaScripts();

    return Response.json(
      { scripts, content },
      {
        headers: {
          "Cache-Control": "public, max-age=300, s-maxage=300",
        },
      },
    );
  } catch (error) {
    console.error("Meta scripts API error:", error);
    return Response.json({ scripts: [] as MetaScript[], content: [] as string[] });
  }
}

import { getOrigin } from "@/app/lib/getOrigin";

// Follows the llms.txt convention (https://llmstxt.org) so LLMs and AI
// crawlers get a concise, curated map of the site instead of parsing the
// rendered HTML.
export async function GET() {
  const origin = getOrigin().replace(/\/$/, "");

  const content = `# The Valuation School

> The Valuation School (TVS) is a finance education platform offering live and recorded courses in CFA Level 1, valuation & financial modelling (AVFM), equity research, technical analysis, and career mentoring.

## Courses

- [CFA Level 1](${origin}/cfa): Live + recorded CFA Level 1 coaching with 300+ hours of classes, revision, MCQs, study notes, and mentor support.
- [Advanced Valuation & Financial Modelling (AVFM)](${origin}/avfm): Hands-on valuation, financial modelling, DCF, Excel, and real company analysis training.
- [Equity Research Cohort (ERC)](${origin}/erc): Practical equity research training covering annual reports, concalls, red-flag detection, and full research reports.
- [Chart Reading Workshop (CRW)](${origin}/crw): Technical analysis and price action workshop.
- [LinkedIn Mentoring Program](${origin}/linkedin-mentoring-program): LinkedIn profile optimization, content strategy, and personal branding mentoring.

## Company

- [Home](${origin}/): Overview of The Valuation School and its courses.
- [Alumni](${origin}/alumni): Success stories and career journeys of past students.
- [Blog](${origin}/blog): Articles and insights on CA, CFA, and valuation topics.
- [Contact](${origin}/contact): Get in touch with The Valuation School team.

## Optional

- [Privacy Policy](${origin}/PrivacyPolicy)
- [Refund Policy](${origin}/RefundPolicy)
- [Terms](${origin}/Terms)
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

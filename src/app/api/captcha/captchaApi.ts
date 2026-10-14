export async function generateCaptcha(): Promise<Response> {
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_URL;

  if (!endpoint) {
    console.error("Captcha API: NEXT_PUBLIC_ENDPOINT_URL is not configured");
    return Response.json(
      { error: "Captcha service is not configured." },
      { status: 500 },
    );
  }

  let url: URL;
  try {
    url = new URL("/api/captcha/generate", endpoint);
  } catch (error) {
    console.error("Captcha API: invalid NEXT_PUBLIC_ENDPOINT_URL", error);
    return Response.json(
      { error: "Captcha service is not configured correctly." },
      { status: 500 },
    );
  }

  try {
    const upstreamResponse = await fetch(url, { headers: {origin: "https://thevaluationschool.com"}, cache: "no-store" });
    const headers = new Headers();
    const contentType = upstreamResponse.headers.get("content-type");

    if (contentType) {
      headers.set("content-type", contentType);
    }
    headers.set("cache-control", "no-store");

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      headers,
    });
  } catch (error) {
    console.error("Captcha API: upstream request failed", error, url.toString());
    return Response.json(
      { error: "Unable to generate captcha." },
      { status: 502 },
    );
  }
}

export async function validateCaptcha(
  captchaId: string,
  userEnteredCaptchaCode: string,
): Promise<Response> {
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_URL;

  if (!endpoint) {
    console.error("Captcha API: NEXT_PUBLIC_ENDPOINT_URL is not configured");
    return Response.json(
      { error: "Captcha service is not configured." },
      { status: 500 },
    );
  }

  let url: URL;
  try {
    url = new URL("/api/captcha/validate", endpoint);
  } catch (error) {
    console.error("Captcha API: invalid NEXT_PUBLIC_ENDPOINT_URL", error);
    return Response.json(
      { error: "Captcha service is not configured correctly." },
      { status: 500 },
    );
  }

  try {
    const upstreamResponse = await fetch(url, {
      method: "POST",
      cache: "no-store",
      headers: {
        origin: "https://thevaluationschool.com",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        CaptchaId: captchaId,
        CaptchaText: userEnteredCaptchaCode
      })
    });

    const headers = new Headers();
    const contentType = upstreamResponse.headers.get("content-type");

    if (contentType) {
      headers.set("content-type", contentType);
    }

    headers.set("cache-control", "no-store");

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      headers,
    });
  } catch (error) {
    console.error("Captcha API: upstream request failed", error, url.toString());
    return Response.json(
      { error: "Unable to generate captcha." },
      { status: 502 },
    );
  }
}

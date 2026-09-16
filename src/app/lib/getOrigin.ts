export function getOrigin(pathname = ""): string {
  const envOrigin =
    process.env.NEXT_PUBLIC_ORIGIN_URL ?? "https://thevaluationschool.com";

  if (pathname === "") {
    return envOrigin + "/";
  } else if (pathname.startsWith("/")) {
    return `${envOrigin}${pathname}`;
  } else {
    return `${envOrigin}/${pathname}`;
  }
}

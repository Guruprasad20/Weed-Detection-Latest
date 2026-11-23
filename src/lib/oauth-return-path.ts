/** Accept only canonical same-origin paths for post-authentication navigation. */
export function oauthReturnPath(value: unknown): string {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    Array.from(value).some((character) => {
      const code = character.charCodeAt(0);
      return character === "\\" || code <= 31 || code === 127;
    })
  ) {
    return "/";
  }

  const origin = "https://app.invalid";
  try {
    const target = new URL(value, origin);
    if (target.origin !== origin || target.pathname.startsWith("//")) return "/";
    return target.pathname + target.search + target.hash;
  } catch {
    return "/";
  }
}
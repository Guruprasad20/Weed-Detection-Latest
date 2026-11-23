import { describe, expect, it } from "vitest";
import { oauthReturnPath } from "./oauth-return-path";

describe("oauthReturnPath", () => {
  it("preserves a local consent path, query, and fragment", () => {
    expect(oauthReturnPath("/.lovable/oauth/consent?authorization_id=abc#review"))
      .toBe("/.lovable/oauth/consent?authorization_id=abc#review");
  });

  it("rejects external, backslash, and control-character paths", () => {
    expect(oauthReturnPath("//outside.invalid/path")).toBe("/");
    expect(oauthReturnPath("/\\outside.invalid/path")).toBe("/");
    expect(oauthReturnPath("/auth\nnext=/dashboard")).toBe("/");
  });
});
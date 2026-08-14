import { describe, expect, it } from "vitest";
import { buildSecurityHeaders } from "./securityHeaders";

describe("security headers", () => {
  it("sets framing, sniffing, referrer, permissions and provider-aware CSP controls", () => {
    const headers = buildSecurityHeaders(true);
    expect(headers["X-Content-Type-Options"]).toBe("nosniff");
    expect(headers["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["Permissions-Policy"]).toContain("camera=()");
    expect(headers["Strict-Transport-Security"]).toContain("max-age=63072000");
    expect(headers["Content-Security-Policy"]).toContain("frame-ancestors 'self' https://*.manus.im");
    expect(headers["Content-Security-Policy"]).toContain("https://www.googletagmanager.com");
    expect(headers["Content-Security-Policy"]).toContain("https://images.unsplash.com");
  });
});

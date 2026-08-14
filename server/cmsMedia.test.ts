import { describe, expect, it } from "vitest";
import { allowedCmsMediaTypes, sanitiseCmsFileName } from "./routers/adminCms";

describe("CMS media policy", () => {
  it("normalises unsafe filenames without discarding the extension", () => {
    expect(sanitiseCmsFileName("  Marty Profile (Final) 2026.PNG ")).toBe("marty-profile-final-2026.png");
  });

  it("returns a stable fallback for a filename containing no usable characters", () => {
    expect(sanitiseCmsFileName("%%%" )).toBe("upload");
  });

  it("keeps the upload allow-list restricted to intended public media formats", () => {
    expect(allowedCmsMediaTypes).toEqual([
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/svg+xml",
      "application/pdf",
    ]);
  });
});

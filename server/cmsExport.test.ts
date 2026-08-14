import { describe, expect, it } from "vitest";
import { buildMediaManifest } from "./cmsExport";

describe("CMS media export manifest", () => {
  it("includes explicit content usages for each media record", () => {
    const manifest = buildMediaManifest(
      [{ id: 7, publicUrl: "/manus-storage/marty.webp", storageKey: "cms/marty.webp", originalFilename: "marty.webp" }],
      [{ id: 3, slug: "martin-reidy", title: "Martin Reidy", ogImageUrl: "/manus-storage/marty.webp", sections: [{ image: "cms/marty.webp" }] }],
      [],
      [{ id: 4, pageId: 3, fullName: "Martin Reidy", profileMediaId: 7 }],
      [],
    );
    expect(manifest[0]?.usages).toEqual(expect.arrayContaining([
      expect.objectContaining({ entityType: "broker", entityId: 4, slug: "martin-reidy", field: "profileMediaId" }),
      expect.objectContaining({ entityType: "page", entityId: 3, field: "ogImageUrl" }),
      expect.objectContaining({ entityType: "page", entityId: 3, field: "sections" }),
    ]));
  });
});


import { describe, expect, it } from "vitest";
import { organizationSchema } from "../client/src/components/Seo";

describe("verified organization schema", () => {
  it("uses the confirmed FinancialService identity and does not fabricate ratings", () => {
    expect(organizationSchema["@type"]).toEqual(["Organization", "FinancialService"]);
    expect(organizationSchema.address).toMatchObject({ streetAddress: "19 Bair Street", addressLocality: "Leongatha", addressRegion: "VIC", postalCode: "3953", addressCountry: "AU" });
    expect(organizationSchema.telephone).toBe("03 5639 9204");
    expect(organizationSchema).not.toHaveProperty("aggregateRating");
    expect(organizationSchema).not.toHaveProperty("review");
  });
});

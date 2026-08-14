import { describe, expect, it } from "vitest";
import { normaliseCallTrackingConfig, normaliseConversionMappings } from "../client/src/lib/analyticsConfig";

describe("central analytics configuration", () => {
  it("keeps only valid provider-specific conversion mappings", () => {
    expect(normaliseConversionMappings({
      lead_form_success: { googleAdsSendTo: "AW-123456789/Lead_Label", metaEvent: "Lead" },
      unsafe: { googleAdsSendTo: "not-a-label", metaEvent: "<script>" },
    })).toEqual({ lead_form_success: { googleAdsSendTo: "AW-123456789/Lead_Label", metaEvent: "Lead" } });
  });

  it("keeps call tracking disabled until a complete, approved replacement is present", () => {
    expect(normaliseCallTrackingConfig({ enabled: false })).toBeNull();
    expect(normaliseCallTrackingConfig({ enabled: true, originalHref: "tel:+61356399204", originalDisplay: "03 5639 9204", replacementHref: "tel:+61300000000", replacementDisplay: "03 0000 0000" })).toEqual({ enabled: true, originalHref: "tel:+61356399204", originalDisplay: "03 5639 9204", replacementHref: "tel:+61300000000", replacementDisplay: "03 0000 0000" });
  });
});

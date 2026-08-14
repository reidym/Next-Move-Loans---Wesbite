import { describe, expect, it, vi } from "vitest";
import { canAcceptLeadAttempt, deliverLeadEmail, getLeadEmailConfiguration, isLeadSubmissionTooFast, recentLeadAttempts } from "./leadDelivery";

describe("lead email delivery configuration", () => {
  it("stays explicitly disabled when credentials have not been approved", () => {
    expect(getLeadEmailConfiguration({})).toEqual({ configured: false });
    expect(getLeadEmailConfiguration({ RESEND_API_KEY: "example-only" })).toEqual({ configured: false });
  });

  it("requires both a server-side API key and a verified sender identity", () => {
    expect(getLeadEmailConfiguration({ RESEND_API_KEY: "re_example", LEAD_FROM_EMAIL: "Next Move Loans <forms@example.com>" })).toEqual({
      configured: true,
      apiKey: "re_example",
      fromEmail: "Next Move Loans <forms@example.com>",
    });
  });

  it("returns an explicit deferred state without making a request when credentials are absent", async () => {
    const fetcher = vi.fn();
    const result = await deliverLeadEmail({ reference: "NML-1", name: "Alex Example", email: "alex@example.com", mobile: "0400000000", enquiryType: "Purchase", sourcePath: "/plan-your-next-move" }, { configured: false }, fetcher);
    expect(result).toEqual({ status: "not_configured" });
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("sends a text-only enquiry to the confirmed inbox when credentials are configured", async () => {
    const fetcher = vi.fn(async () => new Response(JSON.stringify({ id: "email_123" }), { status: 200, headers: { "Content-Type": "application/json" } }));
    const result = await deliverLeadEmail({ reference: "NML-2", name: "Alex Example", email: "alex@example.com", mobile: "0400000000", enquiryType: "Refinance", message: "Please call after 3pm.", sourcePath: "/plan-your-next-move" }, { configured: true, apiKey: "re_test", fromEmail: "Next Move Loans <forms@example.com>" }, fetcher);
    expect(result).toEqual({ status: "sent", providerId: "email_123" });
    const [, request] = fetcher.mock.calls[0];
    expect(request?.headers).toMatchObject({ Authorization: "Bearer re_test", "Content-Type": "application/json" });
    expect(JSON.parse(String(request?.body))).toMatchObject({ to: ["unlock@nextmoveloans.com.au"], reply_to: "alex@example.com" });
  });

  it("records a failed state without exposing provider responses when delivery is rejected", async () => {
    const fetcher = vi.fn(async () => new Response("rejected", { status: 422 }));
    const result = await deliverLeadEmail({ reference: "NML-3", name: "Alex Example", email: "alex@example.com", mobile: "0400000000", enquiryType: "Business", sourcePath: "/contact" }, { configured: true, apiKey: "re_test", fromEmail: "forms@example.com" }, fetcher);
    expect(result).toEqual({ status: "failed" });
  });
});

describe("lead spam policy", () => {
  it("rejects implausibly fast or future-dated submissions", () => {
    expect(isLeadSubmissionTooFast(9_500, 10_000)).toBe(true);
    expect(isLeadSubmissionTooFast(12_000, 10_000)).toBe(true);
    expect(isLeadSubmissionTooFast(8_000, 10_000)).toBe(false);
  });

  it("keeps only recent attempts and applies the per-window limit", () => {
    const now = 20 * 60 * 1_000;
    const recent = recentLeadAttempts([0, now - 1_000, now - 2_000, now - 3_000, now - 4_000, now - 5_000], now);
    expect(recent).toHaveLength(5);
    expect(canAcceptLeadAttempt(recent, now)).toBe(false);
    expect(canAcceptLeadAttempt(recent.slice(0, 4), now)).toBe(true);
  });
});

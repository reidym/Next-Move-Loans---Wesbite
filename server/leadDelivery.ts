export type LeadEmailConfiguration = {
  configured: boolean;
  apiKey?: string;
  fromEmail?: string;
};

export type LeadEmailPayload = {
  reference: string;
  name: string;
  email: string;
  mobile: string;
  enquiryType: string;
  message?: string;
  sourcePath: string;
};

export type LeadEmailResult = {
  status: "sent" | "failed" | "not_configured";
  providerId?: string;
};

type Fetcher = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

export function getLeadEmailConfiguration(env: NodeJS.ProcessEnv = process.env): LeadEmailConfiguration {
  const apiKey = env.RESEND_API_KEY?.trim();
  const fromEmail = env.LEAD_FROM_EMAIL?.trim();
  if (!apiKey || !fromEmail) return { configured: false };
  return { configured: true, apiKey, fromEmail };
}

export async function deliverLeadEmail(payload: LeadEmailPayload, configuration = getLeadEmailConfiguration(), fetcher: Fetcher = fetch): Promise<LeadEmailResult> {
  if (!configuration.configured || !configuration.apiKey || !configuration.fromEmail) return { status: "not_configured" };
  const text = [
    `Reference: ${payload.reference}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Mobile: ${payload.mobile}`,
    `Enquiry: ${payload.enquiryType}`,
    `Source: ${payload.sourcePath}`,
    "",
    payload.message || "No optional message supplied.",
  ].join("\n");
  try {
    const response = await fetcher("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${configuration.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: configuration.fromEmail,
        to: ["unlock@nextmoveloans.com.au"],
        reply_to: payload.email,
        subject: `${payload.reference} · ${payload.enquiryType} enquiry from ${payload.name}`,
        text,
      }),
    });
    if (!response.ok) return { status: "failed" };
    const body = await response.json().catch(() => undefined) as { id?: string } | undefined;
    return { status: "sent", providerId: body?.id };
  } catch {
    return { status: "failed" };
  }
}

export function isLeadSubmissionTooFast(startedAt: number, now = Date.now(), minimumMs = 1_200) {
  return !Number.isFinite(startedAt) || startedAt > now || now - startedAt < minimumMs;
}

export function recentLeadAttempts(timestamps: number[], now = Date.now(), windowMs = 15 * 60 * 1_000) {
  return timestamps.filter(timestamp => timestamp <= now && now - timestamp < windowMs);
}

export function canAcceptLeadAttempt(timestamps: number[], now = Date.now(), limit = 5) {
  return recentLeadAttempts(timestamps, now).length < limit;
}


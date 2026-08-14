export type ConversionMapping = { googleAdsSendTo?: string; metaEvent?: string };
export type ConversionMappings = Record<string, ConversionMapping>;
export type CallTrackingConfig = { enabled: boolean; originalHref: string; originalDisplay: string; replacementHref: string; replacementDisplay: string };

export function normaliseConversionMappings(value: unknown): ConversionMappings {
  if (!value || Array.isArray(value) || typeof value !== "object") return {};
  const output: ConversionMappings = {};
  for (const [event, raw] of Object.entries(value)) {
    if (!/^[a-z0-9_]{2,80}$/.test(event) || !raw || Array.isArray(raw) || typeof raw !== "object") continue;
    const row = raw as Record<string, unknown>;
    const googleAdsSendTo = typeof row.googleAdsSendTo === "string" && /^AW-\d+\/[A-Za-z0-9_-]+$/.test(row.googleAdsSendTo) ? row.googleAdsSendTo : undefined;
    const metaEvent = typeof row.metaEvent === "string" && /^[A-Za-z][A-Za-z0-9]{1,60}$/.test(row.metaEvent) ? row.metaEvent : undefined;
    if (googleAdsSendTo || metaEvent) output[event] = { googleAdsSendTo, metaEvent };
  }
  return output;
}

export function normaliseCallTrackingConfig(value: unknown): CallTrackingConfig | null {
  if (!value || Array.isArray(value) || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  const config = {
    enabled: row.enabled === true,
    originalHref: typeof row.originalHref === "string" ? row.originalHref : "",
    originalDisplay: typeof row.originalDisplay === "string" ? row.originalDisplay : "",
    replacementHref: typeof row.replacementHref === "string" ? row.replacementHref : "",
    replacementDisplay: typeof row.replacementDisplay === "string" ? row.replacementDisplay : "",
  };
  if (!config.enabled) return null;
  if (!/^tel:\+?\d{8,16}$/.test(config.originalHref) || !/^tel:\+?\d{8,16}$/.test(config.replacementHref)) return null;
  if (config.originalDisplay.length < 8 || config.replacementDisplay.length < 8) return null;
  return config;
}


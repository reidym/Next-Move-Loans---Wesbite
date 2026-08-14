/** Provider-agnostic conversion events with optional Umami, dataLayer, GA4 and Meta forwarding. */
import { useEffect } from "react";

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string>) => void };
    nmlAnalyticsEvents?: Array<{ event: string; data: Record<string, string>; timestamp: string }>;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    nmlConversionMappings?: Record<string, { googleAdsSendTo?: string; metaEvent?: string }>;
  }
  interface WindowEventMap { "nml:conversion": CustomEvent<{ event: string; data?: Record<string, string> }>; }
}

const eventFromHref = (href: string) => {
  if (href.startsWith("tel:")) return "phone_click";
  if (href.startsWith("mailto:")) return "email_click";
  if (href.includes("calendly.com/martin-reidy/discovery-call")) return "calendly_discovery";
  if (href.includes("calendly.com/martin-reidy/strategysession")) return "calendly_game_plan";
  if (href.includes("/plan-your-next-move")) return "cta_plan_next_move";
  if (href.includes("/book-a-call")) return "cta_book_conversation";
  if (href.includes("/reviews")) return "proof_reviews_open";
  if (href.includes("/contact")) return "cta_contact";
  if (href.includes("brokerpages.com.au")) return "external_broker_profile";
  return null;
};

const record = (event: string, data: Record<string, string>) => {
  window.nmlAnalyticsEvents ??= [];
  window.nmlAnalyticsEvents.push({ event, data, timestamp: new Date().toISOString() });
  window.umami?.track(event, data);
  window.dataLayer?.push({ event, ...data });
  window.gtag?.("event", event, data);
  window.fbq?.("trackCustom", event, data);
  const mapping = window.nmlConversionMappings?.[event];
  if (mapping?.googleAdsSendTo) window.gtag?.("event", "conversion", { send_to: mapping.googleAdsSendTo, ...data });
  if (mapping?.metaEvent) window.fbq?.("track", mapping.metaEvent, data);
};

export function AnalyticsBridge() {
  useEffect(() => {
    const click = (event: MouseEvent) => {
      const element = (event.target as HTMLElement | null)?.closest<HTMLElement>("a[href], button[data-analytics]"); if (!element) return;
      const href = element instanceof HTMLAnchorElement ? element.getAttribute("href") || "" : "";
      const eventName = element.dataset.analytics || eventFromHref(href); if (!eventName) return;
      record(eventName, { label: element.textContent?.trim().replace(/\s+/g, " ").slice(0, 90) || "unlabelled", page: window.location.pathname, destination: href || "inline-action" });
    };
    const custom = (event: CustomEvent<{ event: string; data?: Record<string, string> }>) => record(event.detail.event, { page: window.location.pathname, ...(event.detail.data ?? {}) });
    document.addEventListener("click", click); window.addEventListener("nml:conversion", custom);
    return () => { document.removeEventListener("click", click); window.removeEventListener("nml:conversion", custom); };
  }, []);
  return null;
}

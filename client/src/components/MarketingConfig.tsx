import { useEffect, useMemo, useState } from "react";
import { normaliseCallTrackingConfig, normaliseConversionMappings } from "@/lib/analyticsConfig";
import { usePublicData, type PublicSettingRow } from "@/lib/publicApi";

const CONSENT_KEY = "next-move-marketing-consent";
type Consent = "granted" | "denied" | "unknown";

function addScript(id: string, src?: string, content?: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  if (src) script.src = src;
  if (content) script.textContent = content;
  document.head.appendChild(script);
}

export function MarketingConfig() {
  const tracking = usePublicData<PublicSettingRow[]>("/api/public/settings/analytics");
  const rows = tracking.data;
  const values = useMemo(() => Object.fromEntries((rows ?? []).map(row => [row.settingKey, row.valueText ?? ""])), [rows]);
  const conversionMappings = useMemo(() => normaliseConversionMappings(rows?.find(row => row.settingKey === "analytics.conversionMappings")?.valueJson), [rows]);
  const callTracking = useMemo(() => normaliseCallTrackingConfig(rows?.find(row => row.settingKey === "analytics.callTracking")?.valueJson), [rows]);
  const [consent, setConsent] = useState<Consent>(() => {
    const saved = localStorage.getItem(CONSENT_KEY);
    return saved === "granted" || saved === "denied" ? saved : "unknown";
  });
  const ga4 = values["analytics.ga4MeasurementId"]?.trim();
  const gtm = values["analytics.gtmContainerId"]?.trim();
  const meta = values["analytics.metaPixelId"]?.trim();
  const verification = values["analytics.searchConsoleVerification"]?.trim();
  const providerConfigured = Boolean(ga4 || gtm || meta || callTracking);

  useEffect(() => {
    if (!verification || document.querySelector('meta[name="google-site-verification"]')) return;
    const tag = document.createElement("meta");
    tag.name = "google-site-verification";
    tag.content = verification;
    document.head.appendChild(tag);
  }, [verification]);

  useEffect(() => {
    window.nmlConversionMappings = conversionMappings;
  }, [conversionMappings]);

  useEffect(() => {
    if (consent !== "granted") return;
    window.dataLayer ??= [];
    if (gtm && /^GTM-[A-Z0-9]+$/i.test(gtm)) {
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      addScript("nml-gtm", `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtm)}`);
    } else if (ga4 && /^G-[A-Z0-9]+$/i.test(ga4)) {
      addScript("nml-gtag-source", `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4)}`);
      window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
      window.gtag("js", new Date());
      window.gtag("config", ga4, { anonymize_ip: true });
    }
    if (meta && /^\d{6,20}$/.test(meta)) {
      addScript("nml-meta-pixel", undefined, `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${meta}');fbq('track','PageView');`);
    }
  }, [consent, ga4, gtm, meta]);

  useEffect(() => {
    if (consent !== "granted" || !callTracking) return;
    const apply = () => {
      document.querySelectorAll<HTMLAnchorElement>(`a[href="${callTracking.originalHref}"]`).forEach(anchor => {
        anchor.href = callTracking.replacementHref;
        const walker = document.createTreeWalker(anchor, NodeFilter.SHOW_TEXT);
        let node = walker.nextNode();
        while (node) {
          if (node.textContent?.includes(callTracking.originalDisplay)) node.textContent = node.textContent.replace(callTracking.originalDisplay, callTracking.replacementDisplay);
          node = walker.nextNode();
        }
        anchor.dataset.callTracking = "active";
      });
    };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [callTracking, consent]);

  if (!providerConfigured || consent !== "unknown") return null;
  const decide = (next: Exclude<Consent, "unknown">) => {
    localStorage.setItem(CONSENT_KEY, next);
    setConsent(next);
  };
  return <aside aria-label="Marketing analytics consent" className="consent-banner"><div><strong>Optional website measurement</strong><p>Allow configured analytics to measure useful actions such as calls, enquiries and bookings. Essential site functions and the secure enquiry form work without this.</p></div><div><button className="button button-coral" onClick={() => decide("granted")}>Allow analytics</button><button className="button button-outline-light" onClick={() => decide("denied")}>Decline</button></div></aside>;
}

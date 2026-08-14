/**
 * Pathfinder Editorial metadata controller: explicit entities, honest claims, canonical URLs,
 * and route-level context that supports search understanding without awkward SEO copy.
 */

import { useEffect } from "react";
import { assets, contactDetails, founder, siteUrl } from "@/lib/siteData";

type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

type SeoProps = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  jsonLd?: JsonLd;
  noIndex?: boolean;
};

const upsertMeta = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
};

const absoluteImage = (image: string) => (image.startsWith("http") ? image : `${siteUrl}${image}`);

export function Seo({
  title,
  description,
  path,
  type = "website",
  image = assets.hero,
  jsonLd,
  noIndex = false,
}: SeoProps) {
  useEffect(() => {
    const canonical = `${siteUrl}${path === "/" ? "" : path}`;
    document.title = title;
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[name="robots"]', { name: "robots", content: noIndex ? "noindex, nofollow" : "index, follow" });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: type });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: absoluteImage(image) });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: absoluteImage(image) });

    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    const existing = document.getElementById("route-jsonld");
    existing?.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.id = "route-jsonld";
      script.type = "application/ld+json";
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => document.getElementById("route-jsonld")?.remove();
  }, [description, image, jsonLd, noIndex, path, title, type]);

  return null;
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "FinancialService"],
  name: "Next Move Loans",
  url: siteUrl,
  logo: `${siteUrl}${assets.logo}`,
  slogan: "Everyone’s building something. We unlock the path.",
  description:
    "An Australian mortgage and finance brokerage helping people create clarity, build a strategy and finance their next move.",
  telephone: contactDetails.landlineDisplay,
  email: contactDetails.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "19 Bair Street",
    addressLocality: "Leongatha",
    addressRegion: "VIC",
    postalCode: "3953",
    addressCountry: "AU",
  },
  contactPoint: [
    { "@type": "ContactPoint", telephone: contactDetails.landlineDisplay, contactType: "customer service", areaServed: "AU", availableLanguage: "English" },
    { "@type": "ContactPoint", telephone: contactDetails.mobileDisplay, contactType: "customer service", areaServed: "AU", availableLanguage: "English" },
  ],
  sameAs: [founder.publicProfile],
  areaServed: [
    "Leongatha",
    "Warragul",
    "Gippsland",
    "West Gippsland",
    "Pakenham",
    "Berwick",
    "Melbourne South-East",
  ],
};

export const breadcrumbSchema = (items: Array<{ name: string; path: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${siteUrl}${item.path}`,
  })),
});

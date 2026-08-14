/**
 * Pathfinder Editorial location template: honest service-area language, local decision context,
 * and priority services selected for relevance rather than cloned town-name SEO copy.
 */

import { Link, useParams } from "wouter";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { PageHero } from "@/components/PagePrimitives";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Checklist, FaqBlock, FinalCta, SectionIntro } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import NotFound from "@/pages/NotFound";
import { assets, contactDetails, getLocation, getService, siteUrl } from "@/lib/siteData";

export default function LocationPage() {
  const params = useParams<{ slug: string }>();
  const location = getLocation(params.slug);
  if (!location) return <NotFound />;
  const path = `/locations/${location.slug}`;
  const priorityServices = location.priorityServices.map((slug) => getService(slug)).filter(Boolean);
  const faqs = [
    {
      question: `Does Next Move Loans have an office in ${location.title}?`,
      answer: location.physicalOffice
        ? `Yes. The confirmed office is ${location.officeAddress}. In-person meetings are available by arrangement.`
        : `No physical ${location.title} office is claimed. Next Move Loans serves clients in the area by phone, video and appointment, with its confirmed office at ${contactDetails.address}.`,
    },
    {
      question: `Can you help with more than home loans in ${location.title}?`,
      answer: "Yes. The service model spans home and property, investment, self-employed, business, commercial and asset finance, subject to the circumstances and available lender panel.",
    },
    {
      question: "Can the first meeting be remote?",
      answer: "Yes. You can start by phone, send a light enquiry or use the public discovery-call link. In-person availability can be arranged where appropriate.",
    },
  ];
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `Finance broker serving ${location.title}`,
      url: `${siteUrl}${path}`,
      about: { "@type": "Place", name: location.title },
      description: location.intro,
    },
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }, { name: location.title, path }]),
  ];

  return (
    <SiteLayout>
      <Seo description={location.intro} image={assets.regionalAcreage} jsonLd={jsonLd} path={path} title={`${location.physicalOffice ? "Mortgage & Finance Broker in" : "Mortgage & Finance Broker Serving"} ${location.title} | Next Move Loans`} />
      <main id="main-content">
        <PageHero
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Locations", href: "/locations" }, { label: location.title }]}
          challenge="The location shapes the decision. It should never replace the strategy."
          eyebrow={location.eyebrow}
          image={assets.regionalAcreage}
          intro={<><p>{location.intro}</p><p><strong>{location.region}.</strong> {location.physicalOffice ? location.officeAddress : "Genuine service area; no physical office claimed."}</p></>}
          title={<>Finance guidance serving <em>{location.title}.</em></>}
        >
          <div className="flex flex-wrap gap-3"><Link className="button button-coral" href="/plan-your-next-move">Plan Your Next Move<ArrowRight aria-hidden="true" className="size-4" /></Link><a className="button button-outline-dark" href={contactDetails.landlineHref}>{contactDetails.landlineDisplay}</a></div>
        </PageHero>

        <section className="section-space bg-white">
          <div className="container grid gap-14 lg:grid-cols-[0.78fr_1.22fr]">
            <SectionIntro
              body={<p>Local relevance comes from the property, borrower and business situations that actually shape the finance conversation.</p>}
              eyebrow="WHY THIS AREA IS DIFFERENT"
              index="01"
              title={<>Start with real context. <em>Not a suburb template.</em></>}
            />
            <div className="location-context-panel"><Checklist items={location.localContext} /></div>
          </div>
          <div className="container mt-8"><p className="text-sm leading-6 text-[#667080]">Local context source: <a className="font-bold underline decoration-[#EC7354] underline-offset-4" href={location.evidenceUrl} rel="noreferrer" target="_blank">{location.evidenceNote}</a></p></div>
        </section>

        <section className="section-space bg-[#EFEAE2]">
          <div className="container">
            <SectionIntro eyebrow="PRIORITY FINANCE PATHS" index="02" title={`Moves commonly worth discussing across ${location.title}.`} />
            <div className="related-service-grid">
              {priorityServices.map((service, index) => service ? (
                <Link className="related-service-card group" href={`/services/${service.slug}`} key={service.slug}>
                  <span>0{index + 1}</span><h3>{service.title}</h3><p>{service.short}</p><ArrowUpRight aria-hidden="true" className="mt-auto size-5 text-[#EC7354]" />
                </Link>
              ) : null)}
            </div>
          </div>
        </section>

        <section className="nearby-area-band">
          <div className="container grid gap-8 lg:grid-cols-[0.58fr_1.42fr] lg:items-start">
            <div><MapPin aria-hidden="true" /><span>NEARBY AREAS SERVED</span><h2>Connected places. Different property questions.</h2></div>
            <div className="nearby-area-list">{location.nearby.map((place, index) => <div key={place}><span>0{index + 1}</span><p>{place}</p></div>)}</div>
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="container grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <SectionIntro eyebrow="LOCAL QUESTIONS" index="03" title={`Working with Next Move Loans across ${location.title}.`} />
            <FaqBlock items={faqs} />
          </div>
        </section>

        <FinalCta title={`Building something across ${location.title}?`} />
      </main>
    </SiteLayout>
  );
}

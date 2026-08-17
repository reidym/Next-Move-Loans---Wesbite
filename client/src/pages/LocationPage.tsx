import { Link, useParams } from "wouter";
import { ArrowRight, ArrowUpRight, Check, MapPin, Phone } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Eyebrow, FaqBlock } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import NotFound from "@/pages/NotFound";
import { contactDetails, getService, siteUrl } from "@/lib/siteData";
import { getLocationSeoPage } from "@/lib/locationData";

export default function LocationPage() {
  const params = useParams<{ slug: string }>();
  const location = getLocationSeoPage(params.slug);
  if (!location) return <NotFound />;

  const path = `/locations/${location.slug}`;
  const priorityServices = location.priorityServices.map((slug) => getService(slug)).filter(Boolean);
  const faqs = [
    {
      question: `Can Next Move Loans help me if I am in ${location.title}?`,
      answer: location.physicalOffice
        ? `Yes. Next Move Loans has a physical office at ${location.officeAddress}, and appointments can also be handled by phone or video.`
        : `Yes. Next Move Loans works with clients in ${location.title} by phone and video, as well as clients Australia-wide. The physical office is at ${contactDetails.address}.`,
    },
    {
      question: `What type of finance can you help with in ${location.title}?`,
      answer: "Home loans, refinancing, first-home buying, upgrading, construction, investment, self-employed, business, commercial and asset finance may all be available depending on your circumstances and lender policy.",
    },
    {
      question: `Do I need to know which lender or loan product I want before calling?`,
      answer: "No. Start with what you are trying to do, the property or opportunity involved, your timing and what feels unclear. The lender and structure come after that.",
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `Mortgage broker ${location.title}`,
      url: `${siteUrl}${path}`,
      about: { "@type": "Place", name: location.title },
      description: location.intro,
      keywords: location.keywords.join(", "),
    },
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }, { name: location.title, path }]),
  ];

  return (
    <SiteLayout>
      <Seo description={location.intro} jsonLd={jsonLd} path={path} title={`Mortgage Broker ${location.title} | Home Loans & Finance | Next Move Loans`} />
      <main id="main-content">
        <section className="bg-[#F7F5F1] py-9 lg:py-12">
          <div className="container grid gap-7 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <Eyebrow>{location.region}</Eyebrow>
              <h1 className="mt-3 max-w-4xl text-[clamp(2.35rem,4.4vw,4.4rem)] font-black leading-[1] tracking-[-0.045em] text-[#16203A]">Mortgage Broker {location.title}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#4C5566]">{location.intro}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link className="button button-coral" href="/contact-us">Contact Us <ArrowRight className="size-4" /></Link>
                <a className="button button-outline-dark" href={contactDetails.landlineHref}><Phone className="size-4" /> {contactDetails.landlineDisplay}</a>
              </div>
            </div>
            <div className="rounded-[1.2rem] border border-[#16203A]/10 bg-white p-6">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#9A6F00]">WHY {location.title.toUpperCase()} IS DIFFERENT</p>
              <p className="mt-3 leading-7 text-[#4C5566]">{location.localAngle}</p>
              {location.physicalOffice ? <p className="mt-4 flex items-center gap-2 font-black text-[#16203A]"><MapPin className="size-4 text-[#EC7354]" /> {location.officeAddress}</p> : null}
            </div>
          </div>
        </section>

        <section className="border-y border-[#16203A]/10 bg-white py-8 lg:py-10">
          <div className="container">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {location.localContext.map((item) => (
                <div className="flex items-start gap-3" key={item}>
                  <Check className="mt-1 size-4 shrink-0 text-[#EC7354]" />
                  <p className="font-semibold leading-6 text-[#16203A]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 lg:py-14">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <Eyebrow>POPULAR FINANCE QUESTIONS IN {location.title.toUpperCase()}</Eyebrow>
                <h2 className="mt-3 text-[clamp(1.9rem,3vw,3rem)] font-black leading-[1.05] tracking-[-0.035em] text-[#16203A]">What are you trying to solve?</h2>
              </div>
              <Link className="button button-coral button-small" href="/contact-us">Ask Us</Link>
            </div>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {priorityServices.map((service) => service ? (
                <Link className="group rounded-[1.2rem] border border-[#16203A]/10 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg" href={`/services/${service.slug}`} key={service.slug}>
                  <h3 className="text-xl font-black text-[#16203A]">{service.challenge}</h3>
                  <p className="mt-3 leading-7 text-[#4C5566]">{service.short}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-black text-[#16203A]">See {service.title} options <ArrowUpRight className="size-4 text-[#EC7354]" /></span>
                </Link>
              ) : null)}
            </div>
          </div>
        </section>

        <section className="bg-[#16203A] py-8 text-white lg:py-10">
          <div className="container flex flex-wrap items-center justify-between gap-5">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.14em] text-[#EC7354]">SERVING {location.title.toUpperCase()} — AND AUSTRALIA-WIDE</p>
              <h2 className="mt-2 text-2xl font-black">You do not need to be near an office to work with us.</h2>
            </div>
            <Link className="button button-coral" href="/contact-us">Start a Conversation</Link>
          </div>
        </section>

        <section className="bg-[#F7F5F1] py-10 lg:py-12">
          <div className="container grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <Eyebrow>QUESTIONS ABOUT WORKING WITH US</Eyebrow>
              <h2 className="mt-3 text-2xl font-black text-[#16203A]">Mortgage and finance help in {location.title}.</h2>
              <p className="mt-4 text-sm leading-6 text-[#667080]">Local source: <a className="font-bold underline decoration-[#EC7354] underline-offset-4" href={location.evidenceUrl} rel="noreferrer" target="_blank">{location.evidenceNote}</a></p>
            </div>
            <FaqBlock items={faqs} />
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}

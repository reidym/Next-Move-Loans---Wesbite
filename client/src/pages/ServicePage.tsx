/**
 * Brand-first service template: search intent remains explicit for SEO, but the consumer experience
 * starts with the decision and uncertainty behind the product rather than a generic loan pitch.
 */

import { Link, useParams } from "wouter";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PagePrimitives";
import { Seo, breadcrumbSchema, organizationSchema } from "@/components/Seo";
import { ArrowLink, Checklist, FaqBlock, FinalCta, ProcessPath, QuestionsBand, SectionIntro } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { ReviewProof } from "@/components/ReviewProof";
import NotFound from "@/pages/NotFound";
import { contactDetails, getCategory, getService, services, siteUrl } from "@/lib/siteData";

export default function ServicePage() {
  const params = useParams<{ slug: string }>();
  const service = getService(params.slug);
  if (!service) return <NotFound />;

  const category = getCategory(service.category)!;
  const related = services.filter((item) => item.category === service.category && item.slug !== service.slug).slice(0, 3);
  const path = `/services/${service.slug}`;
  const jsonLd = [
    organizationSchema,
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.short,
      url: `${siteUrl}${path}`,
      provider: { "@type": "Organization", name: "Next Move Loans", url: siteUrl },
      areaServed: ["Victoria", "Leongatha", "Warragul", "Berwick", "Gippsland", "Melbourne South-East"],
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: category.title, path: category.path },
      { name: service.title, path },
    ]),
  ];

  return (
    <SiteLayout>
      <Seo description={service.short} image={category.image} jsonLd={jsonLd} path={path} title={`${service.title} | Next Move Loans`} />
      <main className={`service-page service-theme-${service.category}`} id="main-content">
        <PageHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: category.title, href: category.path },
            { label: service.title },
          ]}
          challenge={service.challenge}
          dark={service.category === "business-commercial" || service.category === "asset"}
          eyebrow={service.eyebrow}
          image={category.image}
          intro={<p>{service.short}</p>}
          title={service.title}
        >
          <div className="flex flex-wrap gap-3">
            <Link className="button button-coral" href="/plan-your-next-move">
              Plan Your Next Move <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link className="button button-outline-dark" href="/book-a-call">Book a Call</Link>
          </div>
        </PageHero>

        <section className="service-statement">
          <div className="container grid gap-8 lg:grid-cols-[0.28fr_0.72fr] lg:items-start">
            <div>
              <span className="service-statement-index">THE REAL DECISION</span>
            </div>
            <div>
              <p>{service.challenge}</p>
              <p className="mt-6 max-w-3xl !text-lg !font-normal !leading-8 !tracking-normal opacity-75">{service.intro}</p>
            </div>
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="container grid gap-14 lg:grid-cols-[0.82fr_1.18fr]">
            <SectionIntro
              body={<p>This may be a useful conversation if one or more of these situations sounds familiar.</p>}
              eyebrow="START WITH YOUR SITUATION"
              index="01"
              title={<>The product is not the <em>starting point.</em></>}
            />
            <div className="service-fit-panel">
              <Checklist items={service.fit} />
              <div className="mt-9 border-t border-[#16203A]/12 pt-7">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9A6F00]">What we clarify first</p>
                <p className="mt-3 text-lg leading-8 text-[#4C5566]">Where you are today. What you are trying to build. What is standing in the way. What the current decision needs to leave possible next.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#16203A] py-16 text-[#F7F5F1] lg:py-20">
          <div className="container">
            <div className="mb-9 max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#EC7354]">CHALLENGE THE OBVIOUS</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-white md:text-4xl">Before choosing the loan, answer the questions that can change the strategy.</h2>
            </div>
            <QuestionsBand questions={service.decisions} />
          </div>
        </section>

        <section className="section-space bg-[#F7F5F1]">
          <div className="container grid gap-14 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <SectionIntro
                body={<p>The same four-step method keeps the product connected to the wider plan.</p>}
                eyebrow="HOW WE WORK"
                index="02"
                title={<>Clarity today. Strategy tomorrow. <em>Opportunity always.</em></>}
              />
              <div className="mt-8"><ArrowLink href="/approval-method">Explore The Approval Method™</ArrowLink></div>
            </div>
            <ProcessPath compact />
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="container">
            <SectionIntro eyebrow="WHAT MAY COME NEXT" index="03" title="The decision rarely sits alone." />
            <div className="related-service-grid">
              {related.map((item, index) => (
                <Link className="related-service-card group" href={`/services/${item.slug}`} key={item.slug}>
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.short}</p>
                  <ArrowUpRight aria-hidden="true" className="mt-auto size-5 text-[#EC7354] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space bg-[#EFEAE2]">
          <div className="container grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <SectionIntro
              body={<p>Clear answers start with the right context. These are useful starting points, not personal lending advice.</p>}
              eyebrow="COMMON QUESTIONS"
              index="04"
              title={`Questions about ${service.title.toLowerCase()}.`}
            />
            <FaqBlock items={service.faq} />
          </div>
        </section>

        <ReviewProof compact placement="services" />
        <FinalCta title="What are you trying to build—and what is making the path unclear?" />
      </main>
    </SiteLayout>
  );
}

import { Link, useParams } from "wouter";
import { ArrowRight, Check, Phone } from "lucide-react";
import { Seo, breadcrumbSchema, organizationSchema } from "@/components/Seo";
import { Eyebrow, FaqBlock, ProcessPath } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { ReviewProof } from "@/components/ReviewProof";
import NotFound from "@/pages/NotFound";
import { contactDetails, getCategory, getService, siteUrl } from "@/lib/siteData";

function potentialPath(question: string, serviceTitle: string) {
  const q = question.toLowerCase();
  if (q.includes("buy before") || q.includes("sell first") || q.includes("sale")) return "We can compare sell-first, buy-first and bridging scenarios, including peak debt, buffers and timing.";
  if (q.includes("rate") || q.includes("switch") || q.includes("cost")) return "We can compare the real cost of changing lenders—rate, fees, loan term, cash flow and break-even point—not just the headline rate.";
  if (q.includes("term")) return "We can model different loan terms and repayments to see whether the lower monthly figure actually improves the long-term position.";
  if (q.includes("equity")) return "We can test available equity, purpose, loan splits and the impact of the extra debt before deciding how much to release.";
  if (q.includes("capacity") || q.includes("borrowing") || q.includes("lender")) return "We can compare lender policy, serviceability and sequencing to see whether the constraint is your position—or one lender’s rules.";
  if (q.includes("valuation") || q.includes("security") || q.includes("classify") || q.includes("land")) return "We can check the property characteristics and lender policy early, before a valuation or contract deadline creates the problem.";
  if (q.includes("structure") || q.includes("ownership")) return "We can compare the available structures and explain the lending trade-offs, then coordinate with your accountant or adviser where their advice is needed.";
  if (q.includes("cash") || q.includes("buffer") || q.includes("repayment")) return "We can model repayments, buffers and cash-flow scenarios so the finance supports the move without unnecessarily squeezing everything else.";
  if (q.includes("document") || q.includes("income") || q.includes("business")) return "We can work through how the income is actually earned, identify the evidence different lenders may use and present the position clearly.";
  return `We can compare the lender, structure, timing and trade-offs around ${serviceTitle.toLowerCase()} and show you the practical options before you commit.`;
}

export default function ServicePage() {
  const params = useParams<{ slug: string }>();
  const service = getService(params.slug);
  if (!service) return <NotFound />;

  const category = getCategory(service.category)!;
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
      areaServed: "Australia",
    },
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: category.title, path: category.path }, { name: service.title, path }]),
  ];

  return (
    <SiteLayout>
      <Seo description={service.short} image={category.image} jsonLd={jsonLd} path={path} title={`${service.title} | Next Move Loans`} />
      <main id="main-content">
        <section className="bg-[#F7F5F1] py-9 lg:py-12">
          <div className="container grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Eyebrow>{service.eyebrow}</Eyebrow>
              <h1 className="mt-3 max-w-4xl text-[clamp(2.3rem,4.2vw,4.2rem)] font-black leading-[1] tracking-[-0.045em] text-[#16203A]">{service.title}</h1>
              <p className="mt-4 max-w-3xl text-xl font-black leading-8 text-[#16203A]">{service.challenge}</p>
              <p className="mt-2 max-w-3xl text-lg leading-8 text-[#4C5566]">{service.short}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link className="button button-coral" href="/contact-us">Contact Us <ArrowRight className="size-4" /></Link>
              <a className="button button-outline-dark" href={contactDetails.landlineHref}><Phone className="size-4" /> {contactDetails.landlineDisplay}</a>
            </div>
          </div>
        </section>

        <section className="py-9 lg:py-12">
          <div className="container">
            <div className="grid gap-6 lg:grid-cols-[0.68fr_1.32fr] lg:items-start">
              <div>
                <Eyebrow>QUESTIONS CLIENTS ASK</Eyebrow>
                <h2 className="mt-3 text-[clamp(1.8rem,2.8vw,2.8rem)] font-black leading-[1.05] tracking-[-0.035em] text-[#16203A]">Start with the question. Then compare the options.</h2>
                <p className="mt-4 leading-7 text-[#4C5566]">You do not need to arrive knowing the lender or product. These are the questions that usually change the direction of the conversation.</p>
              </div>
              <div className="grid gap-3">
                {service.decisions.map((question, index) => (
                  <div className="rounded-[1.1rem] border border-[#16203A]/10 bg-white p-5" key={question}>
                    <div className="flex gap-4">
                      <span className="mt-1 text-sm font-black text-[#EC7354]">0{index + 1}</span>
                      <div>
                        <h3 className="text-xl font-black leading-tight text-[#16203A]">{question}</h3>
                        <p className="mt-2 leading-7 text-[#4C5566]">{potentialPath(question, service.title)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-[1rem] bg-[#16203A] px-5 py-4 text-white">
              <p className="font-semibold">Have a different question about {service.title.toLowerCase()}?</p>
              <Link className="button button-coral button-small" href="/contact-us">Ask Us</Link>
            </div>
          </div>
        </section>

        <section className="border-y border-[#16203A]/10 bg-[#F7F5F1] py-9 lg:py-11">
          <div className="container grid gap-7 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <Eyebrow>WHEN THIS MAY FIT</Eyebrow>
              <h2 className="mt-3 text-2xl font-black text-[#16203A]">Common situations we can work through.</h2>
              <p className="mt-3 leading-7 text-[#4C5566]">{service.intro}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {service.fit.map((item) => (
                <div className="flex items-start gap-3 rounded-[1rem] bg-white p-4" key={item}>
                  <Check className="mt-1 size-4 shrink-0 text-[#EC7354]" />
                  <p className="font-semibold leading-6 text-[#16203A]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-9 lg:py-12">
          <div className="container grid gap-7 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <Eyebrow>HOW WE WORK</Eyebrow>
              <h2 className="mt-3 text-2xl font-black text-[#16203A]">The Approval Method™ keeps the loan connected to the bigger plan.</h2>
              <Link className="mt-5 inline-flex font-black text-[#16203A] underline decoration-[#EC7354] underline-offset-4" href="/approval-method">See the full method</Link>
            </div>
            <ProcessPath compact />
          </div>
        </section>

        <ReviewProof compact placement="services" />

        <section className="bg-[#F7F5F1] py-9 lg:py-11">
          <div className="container grid gap-7 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <Eyebrow>COMMON QUESTIONS</Eyebrow>
              <h2 className="mt-3 text-2xl font-black text-[#16203A]">A few practical answers before we talk.</h2>
            </div>
            <FaqBlock items={service.faq} />
          </div>
        </section>

        <section className="bg-[#16203A] py-8 text-white lg:py-10">
          <div className="container flex flex-wrap items-center justify-between gap-5">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.14em] text-[#EC7354]">NEXT STEP</p>
              <h2 className="mt-2 text-2xl font-black">Talk through the question before you commit to the loan.</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link className="button button-coral" href="/contact-us">Contact Us</Link>
              <Link className="button button-outline-light" href="/book-a-call">Book a Call</Link>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}

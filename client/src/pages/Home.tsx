/**
 * Conversion-led homepage: brand clear, sections compact, finance useful, CTAs obvious.
 */

import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, Check, Phone } from "lucide-react";
import { Seo, organizationSchema } from "@/components/Seo";
import { ArrowLink, Eyebrow, ProcessPath } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { ReviewProof } from "@/components/ReviewProof";
import { articles, assets, contactDetails } from "@/lib/siteData";
import { mergeCmsArticles } from "@/lib/cmsContent";
import { usePublicData, type CmsArticleRow } from "@/lib/publicApi";

const financePillars = [
  {
    title: "Home & Property",
    body: "Buying, upgrading, refinancing, building or moving to acreage.",
    reason: "Make the move without losing sight of cash flow, flexibility and what comes next.",
    href: "/finance/home-property",
  },
  {
    title: "Investment",
    body: "First investment, next property, equity or portfolio lending.",
    reason: "Structure today’s loan so it does not unnecessarily limit the next opportunity.",
    href: "/finance/investment",
  },
  {
    title: "Business & Commercial",
    body: "Business finance, commercial property, working capital and self-employed lending.",
    reason: "Help the lender understand the real business—and put finance behind the opportunity.",
    href: "/finance/business-commercial",
  },
  {
    title: "Asset Finance",
    body: "Vehicles, machinery and equipment for business.",
    reason: "Put the asset to work while protecting working capital and cash flow.",
    href: "/finance/asset",
  },
] as const;

export default function Home() {
  const cmsArticles = usePublicData<CmsArticleRow[]>("/api/public/articles");
  const learningArticles = mergeCmsArticles(articles, cmsArticles.data);

  return (
    <SiteLayout>
      <Seo
        description="Next Move Loans helps Australians create clarity, build a finance strategy and fund their next move across home, investment, business, rural and asset finance."
        jsonLd={organizationSchema}
        path="/"
        title="Next Move Loans | Finance Your Next Move"
      />

      <main id="main-content">
        <section className="hero-section overflow-hidden">
          <div className="container grid gap-8 py-10 lg:grid-cols-[0.96fr_1.04fr] lg:items-center lg:py-14">
            <div className="hero-copy min-w-0">
              <Eyebrow>FINANCE YOUR NEXT MOVE</Eyebrow>
              <h1 className="max-w-3xl text-[clamp(2.65rem,5vw,5rem)] font-black leading-[0.98] tracking-[-0.05em] text-[#16203A]">
                Everyone’s building something.
                <span className="mt-1 block text-[#EC7354]">We unlock the path.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#4C5566]">
                A home. A business. Wealth. A better life. We create clarity, build the strategy and help put the right finance behind what comes next.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link className="button button-coral" href="/contact-us">Contact Us <ArrowRight aria-hidden="true" className="size-4" /></Link>
                <Link className="button button-outline-dark" href="/book-a-call">Book a Call</Link>
              </div>

              <a className="mt-6 inline-flex items-center gap-3 text-xl font-black text-[#16203A] hover:text-[#EC7354]" href={contactDetails.landlineHref}>
                <Phone aria-hidden="true" className="size-5 text-[#EC7354]" /> {contactDetails.landlineDisplay}
              </a>
              <p className="mt-2 text-sm text-[#4C5566]">Leongatha office · Phone, video and appointments across Victoria</p>
            </div>

            <div className="overflow-hidden rounded-[1.6rem] bg-[#DDE3EA] shadow-[0_18px_55px_rgba(22,32,58,0.10)]">
              <img
                alt="A pathway connecting home, business and future opportunities"
                className="aspect-[5/4] h-full w-full object-cover"
                decoding="async"
                fetchPriority="high"
                src={assets.hero}
              />
            </div>
          </div>
        </section>

        <section className="border-y border-[#16203A]/10 bg-white py-8 lg:py-10">
          <div className="container grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Eyebrow>A DIFFERENT STARTING POINT</Eyebrow>
              <h2 className="mt-3 max-w-4xl text-[clamp(1.8rem,3vw,3rem)] font-black leading-[1.05] tracking-[-0.035em] text-[#16203A]">
                Most lending conversations start with “How much do you want to borrow?” We start with “What are you trying to build?”
              </h2>
            </div>
            <Link className="button button-coral" href="/contact-us">Talk to Us <ArrowRight aria-hidden="true" className="size-4" /></Link>
          </div>
        </section>

        <section className="py-12 lg:py-16" id="method">
          <div className="container grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <Eyebrow>HOW WE WORK</Eyebrow>
              <h2 className="mt-3 text-[clamp(1.9rem,3.2vw,3.2rem)] font-black leading-[1.04] tracking-[-0.04em] text-[#16203A]">The Approval Method™</h2>
              <p className="mt-4 text-lg leading-8 text-[#4C5566]">Create clarity. Build the Game Plan. Take action. Stay connected for the next move.</p>
              <div className="mt-6"><ArrowLink href="/approval-method">See how it works</ArrowLink></div>
            </div>
            <ProcessPath compact />
          </div>
        </section>

        <section className="bg-[#F7F5F1] py-12 lg:py-16" id="finance">
          <div className="container">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <div>
                <Eyebrow>FINANCE</Eyebrow>
                <h2 className="mt-3 text-[clamp(2rem,3.4vw,3.4rem)] font-black leading-[1.04] tracking-[-0.04em] text-[#16203A]">What are you trying to make happen?</h2>
              </div>
              <p className="text-lg leading-8 text-[#4C5566]">Choose the area that fits the move. We will work out the lender and structure after we understand the outcome.</p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {financePillars.map((pillar) => (
                <Link className="group rounded-[1.25rem] border border-[#16203A]/10 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg" href={pillar.href} key={pillar.title}>
                  <h3 className="text-2xl font-black tracking-[-0.03em] text-[#16203A]">{pillar.title}</h3>
                  <p className="mt-2 leading-7 text-[#4C5566]">{pillar.body}</p>
                  <div className="mt-5 flex items-start gap-2 border-t border-[#16203A]/10 pt-4 text-sm font-semibold leading-6 text-[#16203A]">
                    <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-[#EC7354]" />
                    <span>{pillar.reason}</span>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-2 font-black text-[#16203A]">Explore <ArrowUpRight aria-hidden="true" className="size-4 text-[#EC7354]" /></span>
                </Link>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[1.2rem] bg-[#16203A] px-6 py-5 text-white">
              <p className="font-semibold">Not sure which one fits? That is exactly what the first conversation is for.</p>
              <Link className="button button-coral button-small" href="/contact-us">Contact Us</Link>
            </div>
          </div>
        </section>

        <ReviewProof compact placement="home" />

        <section className="bg-white py-12 lg:py-16">
          <div className="container grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <Eyebrow>WHY NEXT MOVE LOANS</Eyebrow>
              <h2 className="mt-3 max-w-3xl text-[clamp(1.9rem,3vw,3rem)] font-black leading-[1.05] tracking-[-0.035em] text-[#16203A]">A finance business built for the relationship—not the transaction.</h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4C5566]">Next Move Loans was founded by mortgage broker Martin “Marty” Reidy after seeing too many people treated as a transaction rather than a long-term relationship. The aim is simple: ask better questions, challenge the obvious and help clients make confident decisions for the next ten years—not just the next loan.</p>
              <div className="mt-6"><ArrowLink href="/about">About Next Move Loans</ArrowLink></div>
            </div>
            <div className="rounded-[1.25rem] bg-[#F7F5F1] p-6">
              <p className="text-sm font-black uppercase tracking-[0.14em] text-[#9A6F00]">MARTIN “MARTY” REIDY</p>
              <p className="mt-3 text-lg leading-8 text-[#4C5566]">Founder and mortgage broker. Based in Leongatha, working with home buyers, investors, business owners and regional clients across Victoria.</p>
              <div className="mt-5"><ArrowLink href="/team/martin-reidy">Meet Marty</ArrowLink></div>
            </div>
          </div>
        </section>

        <section className="bg-[#F7F5F1] py-12 lg:py-16" id="learn">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <Eyebrow>LEARNING CENTRE</Eyebrow>
                <h2 className="mt-3 text-[clamp(1.9rem,3vw,3rem)] font-black leading-[1.05] tracking-[-0.035em] text-[#16203A]">Useful thinking before the application.</h2>
              </div>
              <ArrowLink href="/learn">View all</ArrowLink>
            </div>
            <div className="article-grid mt-8">
              {learningArticles.slice(0, 3).map((article, index) => (
                <Link className="article-card group" href={`/learn/${article.slug}`} key={article.slug}>
                  <span className="article-card-index">0{index + 1}</span>
                  <p className="article-card-category">{article.category}</p>
                  <h3>{article.title}</h3>
                  <span className="article-card-link">Read <ArrowUpRight aria-hidden="true" className="size-4" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="home-final-cta py-12 lg:py-14">
          <div className="container grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Eyebrow light>READY TO TALK?</Eyebrow>
              <h2 className="!text-[clamp(2rem,3.6vw,3.6rem)]">What’s your next move?</h2>
              <p>Call us, send an enquiry or book a time that works.</p>
              <a className="mt-4 inline-flex items-center gap-2 text-xl font-black text-white" href={contactDetails.landlineHref}><Phone className="size-5 text-[#EC7354]" /> {contactDetails.landlineDisplay}</a>
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

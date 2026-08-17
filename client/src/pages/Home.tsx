/**
 * Brand-first homepage: Why → How → What.
 * Consumer-brand restraint on the surface, deep SEO/service architecture underneath.
 */

import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { Seo, organizationSchema } from "@/components/Seo";
import { ArrowLink, Eyebrow, ProcessPath } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { ReviewProof } from "@/components/ReviewProof";
import { articles, assets, contactDetails, founder } from "@/lib/siteData";
import { mergeCmsArticles } from "@/lib/cmsContent";
import { usePublicData, type CmsArticleRow } from "@/lib/publicApi";

const financePillars = [
  {
    title: "Home & Property",
    body: "Buy. Upgrade. Refinance. Build. Bridge. Move to acreage. The product changes. The bigger decision comes first.",
    href: "/finance/home-property",
    image: assets.homeProperty,
  },
  {
    title: "Investment",
    body: "Use income, equity and lender choice to build assets without boxing in the move after this one.",
    href: "/finance/investment",
    image: assets.investmentProperty,
  },
  {
    title: "Business & Commercial",
    body: "Turn business performance into property, growth, working capital and opportunity beyond the business.",
    href: "/finance/business-commercial",
    image: assets.businessCommercial,
  },
  {
    title: "Asset Finance",
    body: "Vehicles, machinery and equipment should put capital to work—not quietly drain flexibility from the business.",
    href: "/finance/asset",
    image: assets.assetFinance,
  },
] as const;

const uncertaintyQuestions = [
  "Can we buy before we sell?",
  "Will the bank lend on this property?",
  "Have we reached our borrowing limit—or just our lender’s?",
  "Why doesn’t the bank understand the business?",
] as const;

const beliefs = [
  ["Start with possibility", "Begin with what you are trying to build—not a product list."],
  ["Challenge the obvious", "The first answer is not always the best one. Better questions change the conversation."],
  ["Make it easier", "Finance can be complicated. The experience should not be."],
  ["Build momentum", "A good move today should create more options tomorrow."],
] as const;

export default function Home() {
  const cmsArticles = usePublicData<CmsArticleRow[]>("/api/public/articles");
  const learningArticles = mergeCmsArticles(articles, cmsArticles.data);

  return (
    <SiteLayout>
      <Seo
        description="Next Move Loans creates clarity, builds the strategy and arranges home, investment, business, rural and asset finance around what you are trying to build next."
        jsonLd={organizationSchema}
        path="/"
        title="Next Move Loans | Everyone’s Building Something. We Unlock the Path."
      />

      <main id="main-content">
        {/* WHY — the brand proposition comes before product choice. */}
        <section className="hero-section overflow-hidden">
          <div className="container grid gap-10 py-14 lg:min-h-[760px] lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-20">
            <div className="hero-copy min-w-0">
              <Eyebrow>FINANCE YOUR NEXT MOVE</Eyebrow>
              <h1 className="hero-title">
                Everyone’s building something.
                <span>We unlock the path.</span>
              </h1>
              <p className="hero-lede max-w-2xl">
                A home. A family. A business. Wealth. A better life. Whatever you are building, the loan is only one part of the plan.
              </p>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#4C5566]">
                We create clarity, build the strategy and help you confidently take your next move.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link className="button button-coral" href="/plan-your-next-move">
                  Plan Your Next Move <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
                <Link className="button button-outline-dark" href="/book-a-call">Book a Call</Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-[#16203A]">
                <span>★★★★★ Google reviews</span>
                <span>35+ lenders</span>
                <span>Home · Investment · Business</span>
              </div>
            </div>

            <div className="relative min-h-[500px] lg:min-h-[620px]">
              <div className="absolute inset-6 overflow-hidden rounded-[2.25rem] shadow-[0_28px_80px_rgba(22,32,58,0.14)] lg:inset-y-8 lg:left-8 lg:right-0">
                <img
                  alt="A conceptual pathway connecting an Australian home, business and future opportunities"
                  className="h-full w-full object-cover"
                  decoding="async"
                  fetchPriority="high"
                  height={810}
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  src={assets.hero}
                  srcSet={`${assets.heroSmall} 960w, ${assets.hero} 1440w`}
                  width={1440}
                />
              </div>
              <div className="absolute right-0 top-0 max-w-[250px] rounded-[1.6rem] bg-[#16203A] p-6 text-white shadow-xl">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#EC7354]">THE FIRST QUESTION</p>
                <p className="mt-3 text-2xl font-black leading-tight">What are you trying to build?</p>
              </div>
              <div className="absolute bottom-0 left-0 rounded-[1.4rem] border border-[#16203A]/10 bg-[#FFFDF8] p-5 shadow-xl">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#9A6F00]">THE IDEA</p>
                <p className="mt-2 font-bold text-[#16203A]">Clarity today. Strategy tomorrow. Opportunity always.</p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY — uncertainty is the enemy, without turning avatars into the architecture. */}
        <section className="section-space bg-[#F7F5F1]">
          <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <Eyebrow>THE REAL PROBLEM</Eyebrow>
              <h2 className="section-title">You probably know what you want. The uncertainty is in how to get there.</h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-[#4C5566]">
                Big property and finance decisions rarely come down to one question. They usually come with ten more.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {uncertaintyQuestions.map((question, index) => (
                <div className="rounded-[1.5rem] border border-[#16203A]/10 bg-white p-6" key={question}>
                  <span className="text-xs font-black tracking-[0.14em] text-[#EC7354]">0{index + 1}</span>
                  <p className="mt-5 text-xl font-black leading-tight text-[#16203A]">{question}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY → HOW bridge. */}
        <section className="bg-[#16203A] py-20 text-white lg:py-28">
          <div className="container grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <Eyebrow light>A DIFFERENT STARTING POINT</Eyebrow>
              <p className="mt-4 text-[clamp(2.5rem,5.8vw,6rem)] font-black leading-[0.95] tracking-[-0.055em] text-white/45">
                Most lending conversations start with “How much do you want to borrow?”
              </p>
              <p className="mt-8 text-[clamp(2.5rem,5.8vw,6rem)] font-black leading-[0.95] tracking-[-0.055em] text-[#EC7354]">
                We start with “What are you trying to build?”
              </p>
            </div>
            <div className="space-y-6 border-l border-white/15 pl-0 lg:pl-8">
              <div>
                <h3 className="text-xl font-black text-white">Clarity before commitment.</h3>
                <p className="mt-2 text-white/70">Understand the pathways, risks and trade-offs before making the big decision.</p>
              </div>
              <div className="border-t border-white/15 pt-6">
                <h3 className="text-xl font-black text-white">Strategy before finance.</h3>
                <p className="mt-2 text-white/70">Build the plan first. Then choose the lender and structure that support it.</p>
              </div>
              <div className="border-t border-white/15 pt-6">
                <h3 className="text-xl font-black text-white">Opportunity beyond settlement.</h3>
                <p className="mt-2 text-white/70">The loan should help fund today’s move without unnecessarily closing tomorrow’s.</p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW */}
        <section className="section-space bg-white" id="method">
          <div className="container grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>THE APPROVAL METHOD™</Eyebrow>
              <h2 className="section-title">Better outcomes start with better questions.</h2>
              <p className="mt-5 text-lg leading-8 text-[#4C5566]">
                Four steps. One clear path from uncertainty to action—and a relationship designed to continue after settlement.
              </p>
              <div className="mt-8"><ArrowLink href="/approval-method">See how we work</ArrowLink></div>
            </div>
            <ProcessPath />
          </div>
        </section>

        {/* WHAT — intentionally comes after Why and How. */}
        <section className="section-space bg-[#F7F5F1]" id="finance">
          <div className="container">
            <div className="compact-section-heading">
              <div>
                <Eyebrow>WHAT WE DO</Eyebrow>
                <h2>We help people finance their next move.</h2>
              </div>
              <p>The strategy comes first. Then we put the finance behind it.</p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {financePillars.map((pillar) => (
                <Link
                  className="group relative min-h-[360px] overflow-hidden rounded-[1.8rem] bg-[#16203A] shadow-[0_18px_50px_rgba(22,32,58,0.08)]"
                  href={pillar.href}
                  key={pillar.title}
                >
                  <img alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-500 group-hover:scale-[1.03]" loading="lazy" src={pillar.image} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16203A] via-[#16203A]/55 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                    <h3 className="text-3xl font-black tracking-[-0.04em] text-white">{pillar.title}</h3>
                    <p className="mt-3 max-w-xl text-base leading-7 text-white/78">{pillar.body}</p>
                    <span className="mt-6 inline-flex items-center gap-2 font-black text-white">
                      Explore <ArrowUpRight aria-hidden="true" className="size-4 text-[#EC7354]" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-9 flex justify-end"><ArrowLink href="/loan-types">View all loan solutions</ArrowLink></div>
          </div>
        </section>

        {/* PROOF */}
        <ReviewProof compact placement="home" />

        {/* EXPERIENCE / BELIEF */}
        <section className="section-space bg-[#16203A] text-white">
          <div className="container">
            <div className="max-w-4xl">
              <Eyebrow light>THE NEXT MOVE EXPERIENCE</Eyebrow>
              <h2 className="section-title !text-white">Finance should create opportunity. Not more uncertainty.</h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {beliefs.map(([title, body]) => (
                <div className="rounded-[1.4rem] border border-white/15 p-6" key={title}>
                  <h3 className="text-xl font-black text-white">{title}</h3>
                  <p className="mt-3 leading-7 text-white/68">{body}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-[1.8rem] bg-[#EC7354] p-8 md:p-10">
              <p className="text-[clamp(1.8rem,3.7vw,3.8rem)] font-black leading-[1.02] tracking-[-0.045em] text-white">
                We do not want you thinking, “That was a good mortgage experience.” We want you thinking, “I didn’t know that was possible.”
              </p>
            </div>
          </div>
        </section>

        {/* LEARN — SEO depth stays under a consumer-brand homepage. */}
        <section className="section-space bg-[#F7F5F1]" id="learn">
          <div className="container">
            <div className="compact-section-heading">
              <div>
                <Eyebrow>LEARN BEFORE YOU MOVE</Eyebrow>
                <h2>Better questions lead to better decisions.</h2>
              </div>
              <p>Useful thinking on the decisions, contradictions and lender-policy details that can change the move.</p>
            </div>
            <div className="article-grid mt-10">
              {learningArticles.slice(0, 3).map((article, index) => (
                <Link className="article-card group" href={`/learn/${article.slug}`} key={article.slug}>
                  <span className="article-card-index">0{index + 1}</span>
                  <p className="article-card-category">{article.category}</p>
                  <h3>{article.title}</h3>
                  <p className="article-card-summary">{article.summary}</p>
                  <span className="article-card-link">Read the perspective <ArrowUpRight aria-hidden="true" className="size-4" /></span>
                </Link>
              ))}
            </div>
            <div className="mt-10 flex justify-end"><ArrowLink href="/learn">Explore the Learning Centre</ArrowLink></div>
          </div>
        </section>

        {/* ABOUT / authority without turning the brand into a personality business. */}
        <section className="section-space bg-white">
          <div className="container grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div className="overflow-hidden rounded-[1.8rem] bg-[#DDE3EA]">
              <img alt="Regional Victoria landscape" className="aspect-[4/3] h-full w-full object-cover" loading="lazy" src={assets.regionalAcreage} />
            </div>
            <div>
              <Eyebrow>BUILT FROM EXPERIENCE. DESIGNED FOR WHAT COMES NEXT.</Eyebrow>
              <h2 className="section-title">A finance business built around the relationship—not the transaction.</h2>
              <p className="mt-5 text-lg leading-8 text-[#4C5566]">{founder.intro}</p>
              <p className="mt-5 text-lg leading-8 text-[#4C5566]">
                Next Move Loans is being built as a multi-broker business with one standard: ask better questions, challenge the obvious and help clients confidently build what comes next.
              </p>
              <div className="mt-8 flex flex-wrap gap-5">
                <ArrowLink href="/about">Why Next Move Loans</ArrowLink>
                <ArrowLink href="/team/martin-reidy">Meet Marty</ArrowLink>
              </div>
            </div>
          </div>
        </section>

        {/* ACTION */}
        <section className="home-final-cta">
          <div className="container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Eyebrow light>WHAT ARE YOU BUILDING?</Eyebrow>
              <h2>You know where you want to go. Let’s work out the path.</h2>
              <p>Tell us where you are today, where you want to go and what feels unclear. The first step is a conversation.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link className="button button-coral" href="/plan-your-next-move">Plan Your Next Move <ArrowRight aria-hidden="true" className="size-4" /></Link>
              <a className="button button-outline-light" href={contactDetails.landlineHref}><Phone aria-hidden="true" className="size-4" /> Book / Call</a>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}

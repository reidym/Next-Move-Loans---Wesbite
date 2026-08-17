/** Compact conversion-led homepage. */
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, Check, Phone } from "lucide-react";
import { Seo, organizationSchema } from "@/components/Seo";
import { ArrowLink, Eyebrow } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { ReviewProof } from "@/components/ReviewProof";
import { approvalSteps, articles, assets, contactDetails } from "@/lib/siteData";
import { mergeCmsArticles } from "@/lib/cmsContent";
import { usePublicData, type CmsArticleRow } from "@/lib/publicApi";

const financePillars = [
  { title: "Home & Property", reason: "Make the move without losing sight of cash flow, flexibility and what comes next.", href: "/finance/home-property" },
  { title: "Investment", reason: "Protect borrowing capacity and structure the current move around future opportunities.", href: "/finance/investment" },
  { title: "Business & Commercial", reason: "Turn business performance into funding options that support the opportunity in front of you.", href: "/finance/business-commercial" },
  { title: "Asset Finance", reason: "Put the asset to work while protecting working capital and cash flow.", href: "/finance/asset" },
] as const;

export default function Home() {
  const cmsArticles = usePublicData<CmsArticleRow[]>("/api/public/articles");
  const learningArticles = mergeCmsArticles(articles, cmsArticles.data);
  return <SiteLayout>
    <Seo description="Next Move Loans helps Australians create clarity, build a finance strategy and fund their next move across home, investment, business and asset finance." jsonLd={organizationSchema} path="/" title="Next Move Loans | Finance Your Next Move" />
    <main id="main-content">
      <section className="hero-section overflow-hidden"><div className="container grid gap-8 py-9 lg:grid-cols-[0.96fr_1.04fr] lg:items-center lg:py-12"><div><Eyebrow>FINANCE YOUR NEXT MOVE</Eyebrow><h1 className="max-w-3xl text-[clamp(2.5rem,4.5vw,4.5rem)] font-black leading-[0.98] tracking-[-0.05em] text-[#16203A]">Everyone’s building something.<span className="mt-1 block text-[#EC7354]">We unlock the path.</span></h1><p className="mt-5 max-w-2xl text-lg leading-8 text-[#4C5566]">We create clarity, build the strategy and help put the right finance behind what comes next.</p><div className="mt-7 flex flex-wrap gap-3"><Link className="button button-coral" href="/contact-us">Contact Us <ArrowRight className="size-4"/></Link><Link className="button button-outline-dark" href="/book-a-call">Book a Call</Link></div><a className="mt-6 inline-flex items-center gap-3 text-xl font-black text-[#16203A]" href={contactDetails.landlineHref}><Phone className="size-5 text-[#EC7354]"/>{contactDetails.landlineDisplay}</a><p className="mt-2 text-sm text-[#4C5566]">Leongatha office · Working with clients Australia-wide</p></div><div className="overflow-hidden rounded-[1.4rem] bg-[#DDE3EA]"><img alt="Next Move Loans" className="aspect-[5/4] h-full w-full object-cover" onError={(event)=>{event.currentTarget.style.display="none";}} src={assets.hero}/></div></div></section>

      <section className="border-y border-[#16203A]/10 bg-white py-7"><div className="container flex flex-wrap items-center justify-between gap-5"><div><Eyebrow>A DIFFERENT STARTING POINT</Eyebrow><h2 className="mt-2 max-w-4xl text-[clamp(1.55rem,2.4vw,2.4rem)] font-black leading-[1.08] tracking-[-0.03em] text-[#16203A]">Most lenders start with “How much?” We start with “What are you trying to build?”</h2></div><Link className="button button-coral button-small" href="/contact-us">Talk to Us</Link></div></section>

      <section className="bg-[#F1F0EC] py-10 lg:py-12" id="method"><div className="container"><div className="text-center"><p className="text-xs font-black uppercase tracking-[0.18em] text-[#B48416]">HOW IT WORKS</p><h2 className="mt-2 text-[clamp(1.8rem,2.7vw,2.7rem)] font-black tracking-[-0.035em] text-[#16203A]">The Approval Method™</h2><p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-[#4C5566]">Finance is rarely the goal—it’s the vehicle. Every client starts with the same four steps.</p></div><div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-4">{approvalSteps.map(step=><div key={step.number}><span className="text-sm font-black text-[#EC7354]">{step.number}</span><h3 className="mt-3 text-lg font-black text-[#16203A]">{step.title}</h3><p className="mt-2 text-sm leading-6 text-[#4C5566]">{step.short}</p></div>)}</div><div className="mt-7 flex justify-center"><ArrowLink href="/approval-method">See how it works</ArrowLink></div></div></section>

      <section className="bg-white py-10 lg:py-12" id="finance"><div className="container"><div className="flex flex-wrap items-end justify-between gap-5"><div><Eyebrow>FINANCE</Eyebrow><h2 className="mt-2 text-[clamp(1.8rem,2.8vw,2.8rem)] font-black tracking-[-0.04em] text-[#16203A]">What are you trying to make happen?</h2></div><Link className="text-sm font-black text-[#EC7354]" href="/loan-types">View all loan types →</Link></div><div className="mt-7 grid gap-4 md:grid-cols-2">{financePillars.map(pillar=><Link className="group rounded-[1rem] border border-[#16203A]/10 bg-[#F8F7F4] p-5" href={pillar.href} key={pillar.title}><h3 className="text-xl font-black text-[#16203A]">{pillar.title}</h3><div className="mt-4 flex items-start gap-2 text-sm font-semibold leading-6 text-[#16203A]"><Check className="mt-1 size-4 shrink-0 text-[#EC7354]"/><span>{pillar.reason}</span></div><span className="mt-4 inline-flex items-center gap-2 text-sm font-black">See options <ArrowUpRight className="size-4 text-[#EC7354]"/></span></Link>)}</div><div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#16203A] px-5 py-4 text-white"><p className="font-semibold">Not sure where you fit? Ask us.</p><Link className="button button-coral button-small" href="/contact-us">Ask Us</Link></div></div></section>

      <ReviewProof compact placement="home" />

      <section className="border-y border-[#16203A]/10 bg-[#F7F5F1] py-8"><div className="container grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-center"><div><Eyebrow>OUR WHY</Eyebrow><h2 className="mt-2 text-[clamp(1.7rem,2.5vw,2.5rem)] font-black tracking-[-0.035em] text-[#16203A]">We’re not here to sell finance. We’re here to help people build what’s next.</h2></div><div><p className="leading-7 text-[#4C5566]">Everyone’s building something. Too often people know where they want to go but aren’t sure how to get there. That’s where we come in.</p><div className="mt-4"><ArrowLink href="/about">Read Our Why</ArrowLink></div></div></div></section>

      <section className="bg-white py-9 lg:py-10" id="learn"><div className="container"><div className="flex items-end justify-between gap-4"><div><Eyebrow>LEARNING CENTRE</Eyebrow><h2 className="mt-2 text-2xl font-black text-[#16203A]">Latest thinking</h2></div><ArrowLink href="/learn">View all</ArrowLink></div><div className="mt-6 divide-y divide-[#16203A]/10 border-y border-[#16203A]/10">{learningArticles.slice(0,3).map(article=><Link className="grid gap-2 py-4 md:grid-cols-[1fr_auto] md:items-center" href={`/learn/${article.slug}`} key={article.slug}><div><p className="text-xs font-black uppercase tracking-[0.12em] text-[#B48416]">{article.category}</p><h3 className="mt-1 text-lg font-black text-[#16203A]">{article.title}</h3></div><span className="text-sm font-black text-[#EC7354]">Read →</span></Link>)}</div></div></section>

      <section className="home-final-cta py-9 lg:py-10"><div className="container flex flex-wrap items-center justify-between gap-5"><div><Eyebrow light>READY TO TALK?</Eyebrow><h2 className="!text-[clamp(1.8rem,2.7vw,2.7rem)]">What’s your next move?</h2><a className="mt-3 inline-flex items-center gap-2 text-xl font-black text-white" href={contactDetails.landlineHref}><Phone className="size-5 text-[#EC7354]"/>{contactDetails.landlineDisplay}</a></div><div className="flex flex-wrap gap-3"><Link className="button button-coral" href="/contact-us">Contact Us</Link><Link className="button button-outline-light" href="/book-a-call">Book a Call</Link></div></div></section>
    </main>
  </SiteLayout>;
}

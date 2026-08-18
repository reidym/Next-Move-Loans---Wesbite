import { Link } from "wouter";
import { ArrowRight, Check, Mail, Network, Rocket, Users } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Eyebrow } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { contactDetails } from "@/lib/siteData";

const platform = [
  [Rocket, "A brand built to create demand", "Next Move Loans is being built as a consumer brand, not a broker directory. Clear positioning, strong local authority, content, paid acquisition and a message designed to stand out from generic mortgage marketing."],
  [Users, "Support around the broker", "The broker should spend more time on clients, strategy and winning business—not chasing every document, status update and administration task alone. The operating model is being built around broker leverage."],
  [Network, "Aggregation and lender infrastructure", "The business is backed by Viking Aggregation, providing the aggregation and lender-access infrastructure behind the broking operation while Next Move Loans focuses on the client experience, brand and growth system."],
] as const;

const whatWeAreBuilding = [
  "A multi-broker business with a consistent client experience rather than a collection of individual operators sharing a logo.",
  "The Approval Method™ and Game Plan as a repeatable way to run better client conversations and build longer relationships.",
  "A support model that can handle more of the administration, follow-up and process work around the broker.",
  "Marketing that creates demand around specific client problems—upgraders, investors, self-employed clients, regional-rural buyers, first-home professionals and business owners.",
  "A growing Learning Centre, local SEO footprint and paid digital strategy designed to compound rather than start from zero for every broker.",
  "A culture that expects brokers to challenge the obvious, explain the trade-offs and think beyond one approval.",
];

const fit = [
  ["You can already broker", "You understand credit, lender policy and client conversations. We are not looking for someone who wants a brand to do the job for them."],
  ["You want to grow", "You want more clients, better systems and more leverage—not simply a desk and an aggregator agreement."],
  ["You think beyond the transaction", "You like the idea of helping a client plan the next move and the one after it, rather than disappearing once the loan settles."],
  ["You are commercially minded", "You care about conversion, follow-up, client experience, referrals and building a quality book—not just lodging files."],
] as const;

const notFit = [
  "You want complete independence but still want someone else to generate all of the leads.",
  "You see broking as a product-comparison job rather than a relationship and strategy business.",
  "You do not want systems, standards, accountability or a consistent client experience.",
  "You are looking for a guaranteed volume promise before proving you can convert and look after clients well.",
];

export default function ForBrokers(){
  const brokerEmail = `${contactDetails.emailHref}?subject=${encodeURIComponent("Broker conversation – Next Move Loans")}`;
  return <SiteLayout>
    <Seo description="Mortgage broker opportunities with Next Move Loans. Join a growing broker-led, team-supported finance business backed by Viking Aggregation and built around demand generation, systems and long-term client relationships." jsonLd={breadcrumbSchema([{name:"Home",path:"/"},{name:"For Brokers",path:"/for-brokers"}])} path="/for-brokers" title="Mortgage Broker Opportunities | Join Next Move Loans" />
    <main id="main-content" className="bg-white">
      <section className="py-10 lg:py-12">
        <div className="container grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div><Eyebrow>FOR BROKERS</Eyebrow><h1 className="mt-2 max-w-4xl text-[clamp(2.3rem,4vw,4rem)] font-black leading-[1] tracking-[-0.045em] text-[#16203A]">Good brokers do not need another logo. They need a better platform to build from.</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-[#4C5566]">Next Move Loans is being built for brokers who want to grow a serious book, give clients a better experience and stop doing every part of the job themselves.</p></div>
          <div className="lg:text-right"><a className="button button-coral" href={brokerEmail}>Start a Private Conversation <ArrowRight className="size-4"/></a><p className="mt-3 text-sm text-[#667080]">No recruitment funnel. No awkward application form. Start with a conversation.</p></div>
        </div>
      </section>

      <section className="bg-[#F3F7FF] py-10 lg:py-12"><div className="container"><div className="max-w-3xl"><Eyebrow>WHAT IS DIFFERENT</Eyebrow><h2 className="mt-2 text-[clamp(1.9rem,3vw,3rem)] font-black tracking-[-0.035em] text-[#16203A]">We are building the things most brokers are told to build themselves.</h2></div><div className="mt-7 grid gap-4 md:grid-cols-3">{platform.map(([Icon,title,body])=>{const I=Icon;return <article className="rounded-2xl bg-white p-6" key={title}><I className="size-7 text-[#EC7354]"/><h3 className="mt-4 text-xl font-black text-[#16203A]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#4C5566]">{body}</p></article>})}</div></div></section>

      <section className="py-10 lg:py-12"><div className="container grid gap-8 lg:grid-cols-[0.65fr_1.35fr]"><div><Eyebrow>THE MODEL</Eyebrow><h2 className="mt-2 text-[clamp(1.8rem,2.8vw,2.8rem)] font-black leading-[1.05] tracking-[-0.035em] text-[#16203A]">Build your book inside a business that is trying to compound around you.</h2><p className="mt-4 leading-7 text-[#4C5566]">This is not about turning brokers into call-centre staff. The broker still owns the client conversation and the strategy. The business should make the broker more effective.</p></div><div className="grid gap-3 sm:grid-cols-2">{whatWeAreBuilding.map(item=><div className="flex gap-3 rounded-xl bg-[#F3F7FF] p-4" key={item}><Check className="mt-1 size-4 shrink-0 text-[#EC7354]"/><p className="text-sm font-semibold leading-6 text-[#16203A]">{item}</p></div>)}</div></div></section>

      <section className="border-y border-[#16203A]/10 py-10 lg:py-12"><div className="container"><div className="max-w-3xl"><Eyebrow>WHO THIS IS FOR</Eyebrow><h2 className="mt-2 text-[clamp(1.8rem,2.8vw,2.8rem)] font-black text-[#16203A]">The right broker probably recognises themselves pretty quickly.</h2></div><div className="mt-7 grid gap-4 md:grid-cols-2">{fit.map(([title,body])=><article className="rounded-2xl bg-white p-6 ring-1 ring-[#16203A]/10" key={title}><h3 className="text-xl font-black text-[#16203A]">{title}</h3><p className="mt-2 leading-7 text-[#4C5566]">{body}</p></article>)}</div></div></section>

      <section className="bg-[#16203A] py-10 text-white lg:py-12"><div className="container grid gap-8 lg:grid-cols-[0.72fr_1.28fr]"><div><Eyebrow light>PROBABLY NOT FOR EVERYONE</Eyebrow><h2 className="mt-2 text-[clamp(1.8rem,2.8vw,2.8rem)] font-black leading-[1.05]">That is deliberate.</h2></div><div className="grid gap-3 sm:grid-cols-2">{notFit.map(item=><div className="flex gap-3 border-t border-white/20 pt-4" key={item}><span className="font-black text-[#EC7354]">×</span><p className="text-sm font-semibold leading-6 text-white/80">{item}</p></div>)}</div></div></section>

      <section className="py-10 lg:py-12"><div className="container grid gap-7 lg:grid-cols-[0.75fr_1.25fr] lg:items-center"><div><Eyebrow>THE NEXT MOVE</Eyebrow><h2 className="mt-2 text-[clamp(1.8rem,2.8vw,2.8rem)] font-black tracking-[-0.035em] text-[#16203A]">If you are a broker thinking, “I want to build more than this,” we should probably talk.</h2></div><div className="rounded-2xl bg-[#F3F7FF] p-6"><p className="leading-7 text-[#4C5566]">Tell us where you are now, what you are trying to build and what is getting in the way—lead flow, support, systems, brand, isolation or simply not having enough leverage. If there is a fit, we can work through what a future role with Next Move Loans could look like.</p><a className="button button-coral mt-5" href={brokerEmail}><Mail className="size-4"/> Start a Broker Conversation</a></div></div></section>
    </main>
  </SiteLayout>;
}

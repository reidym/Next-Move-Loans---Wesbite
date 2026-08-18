import { Link } from "wouter";
import { ArrowRight, Check, Network, Phone, Users } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Eyebrow } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { contactDetails } from "@/lib/siteData";

const foundations = [
  [Users, "Broker-led. Team-supported.", "Your broker owns the strategy and advice. A support team helps keep documentation, lender follow-up and the process moving behind the scenes."],
  [Network, "Backed by Viking Aggregation", "Next Move Loans operates with the aggregation, lender-access and broking infrastructure of Viking Aggregation behind the business."],
  [Check, "Built for the next ten years", "The aim is not to win one transaction. It is to build a finance relationship that stays useful as your home, family, business and wealth change."],
] as const;

export default function About() {
  return <SiteLayout>
    <Seo description="About Next Move Loans: an Australia-wide mortgage and finance business based in Leongatha, supported by a client support team and backed by Viking Aggregation." jsonLd={breadcrumbSchema([{name:"Home",path:"/"},{name:"About Us",path:"/about"}])} path="/about" title="About Us | Next Move Loans" />
    <main id="main-content" className="bg-white">
      <section className="py-10 lg:py-12">
        <div className="container grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <Eyebrow>ABOUT NEXT MOVE LOANS</Eyebrow>
            <h1 className="mt-2 max-w-4xl text-[clamp(2.3rem,4vw,4rem)] font-black leading-[1] tracking-[-0.045em] text-[#16203A]">We are building a finance business for what comes after the approval.</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4C5566]">Next Move Loans is an Australia-wide mortgage and finance business with its home base in Leongatha. We combine broker strategy, a support team and strong aggregation infrastructure so clients get more than one person trying to do everything.</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link className="button button-coral" href="/contact-us">Contact Us <ArrowRight className="size-4"/></Link>
            <a className="button button-outline-dark" href={contactDetails.landlineHref}><Phone className="size-4"/>{contactDetails.landlineDisplay}</a>
          </div>
        </div>
      </section>

      <section className="bg-[#F3F7FF] py-10 lg:py-12">
        <div className="container grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <Eyebrow>WHY THE BUSINESS EXISTS</Eyebrow>
            <h2 className="mt-2 text-[clamp(1.9rem,3vw,3rem)] font-black leading-[1.05] tracking-[-0.035em] text-[#16203A]">People are rarely just asking for a loan.</h2>
          </div>
          <div className="space-y-4 text-lg leading-8 text-[#4C5566]">
            <p>Next Move Loans was founded by mortgage broker Martin “Marty” Reidy after seeing too many people treated as a transaction rather than a long-term relationship.</p>
            <p>A loan might be the immediate need. Behind it is usually something bigger: a family needing more space, a first buyer wanting a start, an investor building financial freedom, a business owner turning hard work into personal wealth, or a family creating a different lifestyle.</p>
            <p className="font-black text-[#16203A]">That is why we begin with the person, the ambition and the Game Plan—not the product.</p>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-12">
        <div className="container">
          <div className="max-w-3xl"><Eyebrow>THE BUSINESS BEHIND THE BROKER</Eyebrow><h2 className="mt-2 text-[clamp(1.9rem,3vw,3rem)] font-black tracking-[-0.035em] text-[#16203A]">One relationship. A team behind it.</h2></div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {foundations.map(([Icon,title,body])=>{const I=Icon;return <article className="rounded-2xl bg-[#F3F7FF] p-6" key={title}><I className="size-6 text-[#EC7354]"/><h3 className="mt-4 text-xl font-black text-[#16203A]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#4C5566]">{body}</p></article>})}
          </div>
        </div>
      </section>

      <section className="border-y border-[#16203A]/10 py-9 lg:py-10">
        <div className="container grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div><Eyebrow>HOW WE ARE BUILDING</Eyebrow><h2 className="mt-2 text-2xl font-black text-[#16203A]">A scalable broking business, not a personality brand.</h2></div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["A support team around the broker so clients are not dependent on one person for every update.","Systems and documented processes designed to keep the experience consistent as the team grows.","Specialist lending capability across home, investment, self-employed, regional-rural, business and asset finance.","A brand and Game Plan that future brokers can deliver without changing what Next Move Loans stands for."].map(item=><div className="flex gap-3 rounded-xl bg-white p-3" key={item}><Check className="mt-1 size-4 shrink-0 text-[#EC7354]"/><p className="text-sm font-semibold leading-6 text-[#16203A]">{item}</p></div>)}
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-12">
        <div className="container flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-[#16203A] px-6 py-7 text-white md:px-8">
          <div><p className="text-xs font-black uppercase tracking-[0.14em] text-[#EC7354]">THE GAME PLAN</p><h2 className="mt-2 text-2xl font-black">Want to see how the thinking turns into a lending process?</h2></div>
          <Link className="button button-coral" href="/game-plan">Explore The Game Plan</Link>
        </div>
      </section>
    </main>
  </SiteLayout>;
}

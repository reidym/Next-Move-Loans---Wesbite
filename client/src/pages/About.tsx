/** Company-first About page. */
import { Link } from "wouter";
import { ArrowRight, Eye, Gauge, Lightbulb, Sparkles, Telescope } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Eyebrow, FinalCta } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { ReviewProof } from "@/components/ReviewProof";
import { assets } from "@/lib/siteData";

const principles = [
  [Lightbulb, "Start With Possibility", "Begin with the person, the ambition and what they are trying to build."],
  [Eye, "Challenge the Obvious", "Ask better questions and test the path instead of defaulting to the obvious answer."],
  [Gauge, "Make It Easy", "Simplify the complexity and make the next decision easier to understand."],
  [Sparkles, "Build Momentum", "Use today’s approval to support what may come next."],
  [Telescope, "Think Longer", "Build relationships measured in years and outcomes—not transactions."],
] as const;

export default function About() {
  return <SiteLayout>
    <Seo description="Why Next Move Loans exists: a finance business built around long-term relationships, better questions and helping people build what comes next." image={assets.hero} jsonLd={breadcrumbSchema([{name:"Home",path:"/"},{name:"About",path:"/about"}])} path="/about" title="About Next Move Loans | Why We Exist" />
    <main id="main-content">
      <section className="bg-[#16203A] py-12 text-white lg:py-16">
        <div className="container max-w-5xl">
          <Eyebrow light>WHY NEXT MOVE LOANS EXISTS</Eyebrow>
          <h1 className="mt-4 text-[clamp(2.5rem,5vw,5rem)] font-black leading-[0.98] tracking-[-0.05em] text-white">We are not building another finance business.<span className="mt-2 block text-[#EC7354]">We are building a business that helps people build what’s next.</span></h1>
          <div className="mt-7"><Link className="button button-coral" href="/contact-us">Contact Us <ArrowRight className="size-4" /></Link></div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-16">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div><Eyebrow>THE IDEA</Eyebrow><h2 className="mt-3 text-[clamp(2rem,3.5vw,3.4rem)] font-black leading-[1.04] tracking-[-0.04em] text-[#16203A]">The loan is usually only the immediate need.</h2></div>
          <div className="space-y-5 text-lg leading-8 text-[#4C5566]">
            <p>Next Move Loans was founded by mortgage broker Marty Reidy after seeing too many people treated as a transaction rather than a long-term relationship.</p>
            <p>A loan might be the immediate need. But behind it is usually something much bigger:</p>
            <div className="grid gap-2 font-semibold text-[#16203A]"><p>A family needing more space.</p><p>A first buyer wanting a start.</p><p>An investor building financial freedom.</p><p>A business owner turning hard work into personal wealth.</p><p>A family creating a different lifestyle.</p></div>
            <p>That is why we begin with the person, the ambition and the Game Plan—not the product.</p>
            <p>Today, we are building a team of brokers who believe in asking better questions, challenging the obvious and helping clients make confident decisions for the next ten years—not just the next transaction.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F5F1] py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl"><Eyebrow>HOW WE WANT TO WORK</Eyebrow><h2 className="mt-3 text-[clamp(2rem,3.4vw,3.3rem)] font-black leading-[1.04] tracking-[-0.04em] text-[#16203A]">A better finance relationship starts with better questions.</h2></div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">{principles.map(([Icon,title,body]) => {const I=Icon;return <article className="rounded-[1.25rem] border border-[#16203A]/10 bg-white p-5" key={title}><I className="size-5 text-[#EC7354]"/><h3 className="mt-4 text-lg font-black text-[#16203A]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#4C5566]">{body}</p></article>})}</div>
        </div>
      </section>

      <ReviewProof compact placement="about" />
      <FinalCta title="What are you building next?" body="Start with a conversation. We will help you work out the useful next step." />
    </main>
  </SiteLayout>;
}

import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Eyebrow } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { contactDetails } from "@/lib/siteData";

export default function About() {
  return <SiteLayout>
    <Seo description="Everyone's building something. Next Move Loans exists to create clarity, build strategy and help people move forward with confidence." jsonLd={breadcrumbSchema([{name:"Home",path:"/"},{name:"Our Why",path:"/about"}])} path="/about" title="Our Why | Next Move Loans" />
    <main id="main-content">
      <section className="bg-[#16203A] py-12 text-white lg:py-14"><div className="container max-w-5xl"><Eyebrow light>OUR WHY</Eyebrow><h1 className="mt-3 text-[clamp(2.4rem,4.7vw,4.7rem)] font-black leading-[0.98] tracking-[-0.05em] text-white">Everyone's building something.<span className="block text-[#EC7354]">We unlock the path.</span></h1></div></section>

      <section className="bg-white py-11 lg:py-14"><div className="container max-w-4xl"><div className="space-y-5 text-lg leading-8 text-[#4C5566]"><p className="font-black text-[#16203A]">Everyone's building something.</p><div className="space-y-1 text-2xl font-black text-[#16203A]"><p>A home.</p><p>A family.</p><p>A business.</p><p>Wealth.</p><p>A better life.</p></div><p>Too often, people know where they want to go but aren't sure how to get there.</p><p>That's where we come in.</p><p className="text-2xl font-black text-[#EC7354]">We unlock the path.</p><p>We create clarity, build the strategy and surround people with the right support so they can move forward with confidence.</p><p className="font-black text-[#16203A]">Because we're not here to sell finance.<br/>We're here to help people build what's next.</p></div></div></section>

      <section className="bg-[#F7F5F1] py-11 lg:py-14"><div className="container max-w-4xl"><Eyebrow>OUR ENEMY = UNCERTAINTY</Eyebrow><h2 className="mt-3 text-[clamp(1.9rem,3vw,3rem)] font-black tracking-[-0.04em] text-[#16203A]">The uncertainty that stops people taking the next step.</h2><ul className="mt-6 grid gap-3 text-lg text-[#4C5566] md:grid-cols-2"><li>• Not knowing where to start.</li><li>• Not knowing what's possible.</li><li>• Not knowing who to trust.</li><li>• Trying to make life's biggest decisions alone.</li></ul><div className="mt-8 space-y-1 text-2xl font-black text-[#16203A]"><p>We believe people deserve clarity.</p><p>A strategy.</p><p>The right support.</p><p>And the confidence to move forward.</p><p className="pt-3 text-[#EC7354]">That's why we exist.</p></div></div></section>

      <section className="bg-white py-9"><div className="container flex flex-wrap items-center justify-between gap-5"><div><p className="text-xl font-black text-[#16203A]">Want to see how we turn that into action?</p><p className="mt-1 text-[#4C5566]">The Approval Method™ is the four-step process behind every client relationship.</p></div><div className="flex flex-wrap gap-3"><Link className="button button-outline-dark" href="/approval-method">How We Work</Link><Link className="button button-coral" href="/contact-us">Contact Us <ArrowRight className="size-4"/></Link></div></div></section>

      <section className="bg-[#16203A] py-8 text-white"><div className="container flex flex-wrap items-center justify-between gap-4"><p className="font-black">Prefer to talk? <a className="underline decoration-[#EC7354] underline-offset-4" href={contactDetails.landlineHref}>{contactDetails.landlineDisplay}</a></p><Link className="button button-coral button-small" href="/book-a-call">Book a Call</Link></div></section>
    </main>
  </SiteLayout>;
}

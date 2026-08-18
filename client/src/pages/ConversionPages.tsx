import { Link } from "wouter";
import { ArrowRight, CalendarDays, Phone, PhoneCall } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Eyebrow } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { contactDetails } from "@/lib/siteData";

export function PlanYourMove() {
  return <SiteLayout><Seo description="Contact Next Move Loans to talk through your next move." path="/plan-your-next-move" title="Contact Us | Next Move Loans" />
    <main id="main-content" className="bg-white"><section className="py-12"><div className="container max-w-3xl text-center"><Eyebrow>CONTACT US</Eyebrow><h1 className="mt-3 text-[clamp(2.2rem,3.8vw,3.8rem)] font-black text-[#16203A]">Start with a conversation.</h1><p className="mt-4 text-lg leading-8 text-[#4C5566]">The contact form, phone details and booking options are all in one place.</p><Link className="button button-coral mt-6" href="/contact-us">Go to Contact Us <ArrowRight className="size-4"/></Link></div></section></main>
  </SiteLayout>;
}

export function BookCall() {
  return <SiteLayout><Seo description="Book a discovery call or Game Plan strategy meeting with Next Move Loans." jsonLd={breadcrumbSchema([{name:"Home",path:"/"},{name:"Book a Call",path:"/book-a-call"}])} path="/book-a-call" title="Book a Call | Next Move Loans" />
    <main id="main-content" className="bg-white">
      <section className="py-10 lg:py-12"><div className="container grid gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-end"><div><Eyebrow>BOOK A CALL</Eyebrow><h1 className="mt-2 max-w-4xl text-[clamp(2.2rem,3.7vw,3.7rem)] font-black leading-[1] tracking-[-0.04em] text-[#16203A]">Choose the conversation that fits where you are.</h1></div><p className="text-lg leading-8 text-[#4C5566]">Still working out the move? Start with a Discovery Call. Ready to go deeper? Book a Game Plan strategy meeting.</p></div></section>

      <section className="bg-[#F3F7FF] py-10 lg:py-12"><div className="container grid gap-4 md:grid-cols-2"><a className="group flex min-h-[260px] flex-col justify-between rounded-2xl bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-md" data-analytics="calendly_discovery" href={contactDetails.discoveryCall} rel="noreferrer" target="_blank"><div><PhoneCall className="size-7 text-[#EC7354]"/><p className="mt-5 text-xs font-black uppercase tracking-[0.14em] text-[#667080]">15–20 MINUTES</p><h2 className="mt-2 text-2xl font-black text-[#16203A]">Discovery Call</h2><p className="mt-3 leading-7 text-[#4C5566]">Tell us what you are trying to do, the timing and what feels unclear. Best when you want to work out the useful next step.</p></div><span className="mt-6 inline-flex items-center gap-2 font-black text-[#16203A]">Book Discovery Call <ArrowRight className="size-4 text-[#EC7354]"/></span></a><a className="group flex min-h-[260px] flex-col justify-between rounded-2xl bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-md" data-analytics="calendly_game_plan" href={contactDetails.gamePlan} rel="noreferrer" target="_blank"><div><CalendarDays className="size-7 text-[#EC7354]"/><p className="mt-5 text-xs font-black uppercase tracking-[0.14em] text-[#667080]">DEEPER STRATEGY SESSION</p><h2 className="mt-2 text-2xl font-black text-[#16203A]">Game Plan Meeting</h2><p className="mt-3 leading-7 text-[#4C5566]">A structured conversation around your position, the options, the trade-offs and what the current finance needs to make possible next.</p></div><span className="mt-6 inline-flex items-center gap-2 font-black text-[#16203A]">Book Game Plan Meeting <ArrowRight className="size-4 text-[#EC7354]"/></span></a></div></section>

      <section className="py-8"><div className="container flex flex-wrap items-center justify-between gap-5"><div><p className="font-black text-[#16203A]">Prefer to call now?</p><a className="mt-1 inline-flex items-center gap-2 text-xl font-black text-[#16203A]" href={contactDetails.landlineHref}><Phone className="size-5 text-[#EC7354]"/>{contactDetails.landlineDisplay}</a></div><Link className="button button-coral" href="/contact-us">Contact Us</Link></div></section>
    </main>
  </SiteLayout>;
}

export function Contact() { return <PlanYourMove/>; }

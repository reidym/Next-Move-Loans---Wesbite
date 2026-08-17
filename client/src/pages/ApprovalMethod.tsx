import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Eyebrow } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { approvalSteps, contactDetails } from "@/lib/siteData";

const discovery = ["Where are you today?", "Where do you want to be?", "What is standing in your way?", "What’s your next move?"];

export default function ApprovalMethod() {
  return (
    <SiteLayout>
      <Seo description="The Next Move Loans Game Plan combines our Why, the Approval Method™ and the Next Move Framework™ to create clarity, strategy and a defined next move." jsonLd={breadcrumbSchema([{name:"Home",path:"/"},{name:"The Game Plan",path:"/game-plan"}])} path="/game-plan" title="The Game Plan | Next Move Loans" />
      <main id="main-content">
        <section className="bg-white py-10 lg:py-14">
          <div className="container grid gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-end">
            <div>
              <Eyebrow>THE GAME PLAN</Eyebrow>
              <h1 className="mt-3 max-w-4xl text-[clamp(2.5rem,4.5vw,4.7rem)] font-black leading-[1] tracking-[-0.045em] text-[#16203A]">Everyone’s building something.<span className="block text-[#EC7354]">We unlock the path.</span></h1>
            </div>
            <div>
              <p className="text-lg leading-8 text-[#4C5566]">Too often, people know where they want to go but are not sure how to get there. We create clarity, build the strategy and surround people with the right support so they can move forward with confidence.</p>
              <p className="mt-3 font-black text-[#16203A]">Because we are not here to sell finance. We are here to help people build what’s next.</p>
              <div className="mt-5 flex flex-wrap gap-3"><Link className="button button-coral" href="/contact-us">Contact Us <ArrowRight className="size-4" /></Link><a className="button button-outline-dark" href={contactDetails.landlineHref}>{contactDetails.landlineDisplay}</a></div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#16203A]/10 bg-[#16203A] py-9 text-white lg:py-11">
          <div className="container grid gap-5 md:grid-cols-4">
            {["Not knowing where to start.","Not knowing what’s possible.","Not knowing who to trust.","Trying to make life’s biggest decisions alone."].map((item,i)=><div className="border-l border-white/20 pl-4" key={item}><p className="text-xs font-black text-[#EC7354]">0{i+1}</p><p className="mt-2 font-bold leading-6">{item}</p></div>)}
          </div>
        </section>

        <section className="bg-white py-10 lg:py-14">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center"><Eyebrow>THE APPROVAL METHOD™</Eyebrow><h2 className="mt-3 text-[clamp(2rem,3vw,3rem)] font-black tracking-[-0.035em] text-[#16203A]">How the Game Plan works.</h2><p className="mt-3 text-lg leading-8 text-[#4C5566]">Finance is rarely the goal. It is the vehicle. Every client starts with the same four steps.</p></div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {approvalSteps.map(step=><article className="border-t-2 border-[#EC7354] pt-4" key={step.number}><span className="text-sm font-black text-[#EC7354]">{step.number}</span><h3 className="mt-2 text-xl font-black text-[#16203A]">{step.title}</h3><p className="mt-2 text-sm leading-6 text-[#4C5566]">{step.short}</p></article>)}
            </div>
          </div>
        </section>

        <section className="bg-[#F3F7FF] py-10 lg:py-14">
          <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div><Eyebrow>THE NEXT MOVE FRAMEWORK™</Eyebrow><h2 className="mt-3 text-[clamp(2rem,3vw,3rem)] font-black tracking-[-0.035em] text-[#16203A]">Better strategy starts with better questions.</h2><p className="mt-3 leading-7 text-[#4C5566]">Rather than beginning with rates, lenders or borrowing capacity, we begin by understanding the current position, future aspirations and the opportunities between the two.</p></div>
            <div className="grid gap-3 sm:grid-cols-2">{discovery.map((q,i)=><div className="rounded-2xl bg-white p-5" key={q}><span className="text-sm font-black text-[#EC7354]">0{i+1}</span><h3 className="mt-2 text-lg font-black text-[#16203A]">{q}</h3></div>)}</div>
          </div>
        </section>

        <section className="bg-white py-10 lg:py-14">
          <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div><Eyebrow>WHAT YOU CAN EXPECT</Eyebrow><h2 className="mt-3 text-[clamp(2rem,3vw,3rem)] font-black tracking-[-0.035em] text-[#16203A]">The loan becomes one step in a much bigger plan.</h2></div>
            <div className="grid gap-3 sm:grid-cols-2">{["Clarity before commitment","Strategy before finance","Access to opportunity","A simpler experience","A partner for the journey","A defined next move"].map(item=><div className="flex items-start gap-3 rounded-xl border border-[#16203A]/10 p-4" key={item}><Check className="mt-1 size-4 text-[#EC7354]"/><p className="font-bold text-[#16203A]">{item}</p></div>)}</div>
          </div>
        </section>

        <section className="bg-[#16203A] py-9 text-white lg:py-11"><div className="container flex flex-wrap items-center justify-between gap-5"><div><p className="text-sm font-black uppercase tracking-[0.14em] text-[#EC7354]">EVERYTHING STARTS WITH ONE QUESTION</p><h2 className="mt-2 text-3xl font-black">What are you building?</h2></div><Link className="button button-coral" href="/contact-us">Start the conversation</Link></div></section>
      </main>
    </SiteLayout>
  );
}

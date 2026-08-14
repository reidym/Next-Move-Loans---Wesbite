/**
 * Pathfinder Editorial utility pages: useful launch states rather than invented proof,
 * and explicit dependencies for reviews, case studies, calculators, legal and compliance content.
 */

import { Link } from "wouter";
import { ArrowRight, Calculator, FileCheck2, LockKeyhole, MessageSquareQuote, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/PagePrimitives";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { ArrowLink, FinalCta, SectionIntro } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { founder } from "@/lib/siteData";

export function Reviews() {
  return (
    <SiteLayout>
      <Seo description="Verified Next Move Loans reviews will appear here after the new brand’s approved review source and permissions are confirmed." noIndex path="/reviews" title="Reviews | Next Move Loans" />
      <main id="main-content">
        <PageHero breadcrumbs={[{ label: "Home", href: "/" }, { label: "Reviews" }]} challenge="Proof should be real, current and easy to verify." eyebrow="VERIFIED PROOF ONLY" intro={<p>The existing public footprint contains positive review evidence, but this site will not republish quotations, ratings or totals until the final source, attribution and permissions are approved.</p>} title={<>No invented praise. <em>Not even as a placeholder.</em></>} />
        <section className="section-space bg-white"><div className="container grid gap-12 lg:grid-cols-[0.7fr_1.3fr]"><SectionIntro eyebrow="WHAT WILL APPEAR HERE" index="01" title="A review system built for evidence." /><div className="proof-readiness-grid">{[[MessageSquareQuote,"Verified Google review feed"],[ShieldCheck,"Source and attribution controls"],[FileCheck2,"Approved award and recognition assets"]].map(([Icon,title],index)=>{const I=Icon as typeof MessageSquareQuote;return <div key={title as string}><span>0{index+1}</span><I aria-hidden="true"/><h3>{title as string}</h3><p>Ready to activate during the review cycle once the business confirms the current source and permitted usage.</p></div>})}</div></div></section>
        <section className="public-proof-band"><div className="container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"><div><span>CURRENT PUBLIC PROFILE</span><h2>See Marty’s publicly listed BrokerPages profile.</h2><p>External review content remains under the control of the source platform.</p></div><a className="button button-outline-light" href={founder.publicProfile} rel="noreferrer" target="_blank">Open BrokerPages<ArrowRight aria-hidden="true" className="size-4" /></a></div></section>
        <FinalCta />
      </main>
    </SiteLayout>
  );
}

export function Calculators() {
  const calculators = ["Borrowing power", "Repayments", "Stamp duty", "Extra repayments", "Refinance", "Equity", "Bridging", "Asset finance"];
  return (
    <SiteLayout>
      <Seo description="A calculator-ready Next Move Loans resource hub for borrowing power, repayments, stamp duty, refinance, equity, bridging and asset finance." noIndex path="/calculators" title="Finance Calculators | Next Move Loans" />
      <main id="main-content">
        <PageHero breadcrumbs={[{label:"Home",href:"/"},{label:"Calculators"}]} challenge="A calculator can estimate a number. It cannot decide whether the move is right." eyebrow="CALCULATOR-READY, NOT CALCULATOR-LED" intro={<p>The architecture is ready for approved calculators during the review cycle. They will support relevant service pages without becoming the brand’s main lead-generation gimmick.</p>} title={<>Useful numbers. <em>Better questions.</em></>} />
        <section className="section-space bg-white"><div className="container"><SectionIntro eyebrow="PLANNED TOOLSET" index="01" title="Add the tool where it earns its place." /><div className="calculator-grid">{calculators.map((calculator,index)=><div key={calculator}><Calculator aria-hidden="true"/><span>0{index+1}</span><h2>{calculator}</h2><p>Component slot ready for a reviewed calculator and service-specific explanation.</p></div>)}</div></div></section>
        <FinalCta title="Do you need a number—or a plan around the number?" />
      </main>
    </SiteLayout>
  );
}

type InfoKey = "important-information" | "privacy" | "credit-guide" | "accessibility";
const infoPages: Record<InfoKey,{title:string;eyebrow:string;intro:string;items:string[];icon:typeof LockKeyhole}> = {
  "important-information": { title:"Important Information", eyebrow:"LAUNCH-DEPENDENT DISCLOSURES", intro:"This page is structured for the exact business, credit representative, licence or aggregator, commission, fee, complaints and dispute-resolution details approved before launch.", items:["Legal trading entity and ABN/ACN","Australian Credit Licence or credit representative details","Aggregator or authorised representative relationship","Commission and any direct-fee disclosure","Complaints process and AFCA membership","Final business contact and public office details"], icon:ShieldCheck },
  privacy: { title:"Privacy", eyebrow:"PERSONAL INFORMATION HANDLING", intro:"The final privacy policy must reflect the actual CRM, email, booking, analytics, document and service-provider flows used by the production business.", items:["What information is collected","Why it is collected and lawful handling","Storage, access and security","Third-party service providers","Marketing consent and opt-out","Access, correction and complaints"], icon:LockKeyhole },
  "credit-guide": { title:"Credit Guide", eyebrow:"CREDIT ASSISTANCE INFORMATION", intro:"The final approved Credit Guide will be linked here before launch. The historic Yellow Brick Road document should not be carried into the new brand without confirmation.", items:["Credit representative identity","Licensee details","Services and lender panel explanation","How commissions may be paid","Potential fees and quote process","Complaints and external dispute resolution"], icon:FileCheck2 },
  accessibility: { title:"Accessibility", eyebrow:"A CLEAR PATH FOR MORE PEOPLE", intro:"Next Move Loans is being built for keyboard access, readable contrast, responsive text, semantic headings, reduced motion and understandable form feedback.", items:["Keyboard-reachable navigation and controls","Visible focus states","Meaningful alt text and semantic landmarks","Reduced-motion support","Readable contrast and scalable typography","A contact path for reporting barriers"], icon:ShieldCheck },
};

export function InfoPage({ page }: { page: InfoKey }) {
  const data=infoPages[page]; const Icon=data.icon;
  return <SiteLayout><Seo description={data.intro} noIndex={page!=="accessibility"} path={`/${page}`} title={`${data.title} | Next Move Loans`} jsonLd={breadcrumbSchema([{name:"Home",path:"/"},{name:data.title,path:`/${page}`}])}/><main id="main-content"><PageHero breadcrumbs={[{label:"Home",href:"/"},{label:data.title}]} challenge="Only approved, accurate details belong on a trust page." eyebrow={data.eyebrow} intro={<p>{data.intro}</p>} title={data.title}/><section className="section-space bg-white"><div className="container grid gap-12 lg:grid-cols-[0.62fr_1.38fr]"><div className="info-icon-panel"><Icon aria-hidden="true"/><span>REVIEW-CYCLE DEPENDENCY</span><p>This page is intentionally explicit about what remains to be approved. It does not reuse legacy legal wording by assumption.</p></div><div className="info-requirements">{data.items.map((item,index)=><div key={item}><span>0{index+1}</span><p>{item}</p></div>)}</div></div></section><section className="bg-[#EFEAE2] py-12"><div className="container"><ArrowLink href="/contact">Contact Next Move Loans</ArrowLink></div></section></main></SiteLayout>;
}

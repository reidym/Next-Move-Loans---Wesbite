/** Low-friction conversion pages with persisted enquiries and lightweight calendar links. */

import { useState, type FormEvent } from "react";
import { Link } from "wouter";
import { ArrowRight, CalendarDays, Check, Clock3, Mail, MapPin, MessageSquareText, Phone, PhoneCall, Send } from "lucide-react";
import { PageHero } from "@/components/PagePrimitives";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Eyebrow, FinalCta } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { contactDetails } from "@/lib/siteData";
import { submitPublicLead } from "@/lib/publicApi";

const moveOptions = ["Purchase", "Refinance", "Investment", "Business", "Agri & Rural", "Asset Finance", "Something else"];

export function PlanYourMove() {
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError(""); setIsSubmitting(true);
    const form = event.currentTarget; const data = new FormData(form);
    try {
      const result = await submitPublicLead({
        name: String(data.get("name") || ""), email: String(data.get("email") || ""), mobile: String(data.get("mobile") || ""), enquiryType: String(data.get("move") || ""), sourcePath: window.location.pathname,
        website: String(data.get("website") || ""), startedAt,
        message: [`Preferred contact: ${String(data.get("contact") || "Either")}`, `Timing: ${String(data.get("timing") || "Not supplied")}`, "", String(data.get("message") || "")].join("\n").trim(),
      });
      setReference(result.reference); form.reset(); setStartedAt(Date.now());
      window.dispatchEvent(new CustomEvent("nml:conversion", { detail: { event: "lead_form_success", data: { reference: result.reference, enquiryType: String(data.get("move") || "") } } }));
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Your enquiry could not be saved. Please call the team instead."); }
    finally { setIsSubmitting(false); }
  };

  return <SiteLayout><Seo description="Start planning your next move with a short, low-friction enquiry for home, property, investment, business, rural or asset finance." jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Plan Your Next Move", path: "/plan-your-next-move" }])} path="/plan-your-next-move" title="Plan Your Next Move | Next Move Loans" />
    <main id="main-content"><section className="conversion-page"><div className="container grid gap-12 py-12 lg:grid-cols-[0.75fr_1.25fr] lg:py-20">
      <div className="conversion-copy"><Eyebrow>START WITH POSSIBILITY</Eyebrow><h1>What are you building?</h1><p>Bring the half-formed idea, the awkward timing or the decision with too many moving parts. The first job is to create clarity.</p><div className="conversion-expectations"><div><MessageSquareText /><span><strong>A real conversation.</strong> Not an instant product recommendation.</span></div><div><Clock3 /><span><strong>A short first step.</strong> No payslips, identification, tax returns or bank statements here.</span></div><div><Check /><span><strong>A saved reference.</strong> Your enquiry is recorded even while outbound email delivery is awaiting final provider credentials.</span></div></div><div className="mt-8 border-t border-[#16203A]/15 pt-6"><p className="!mt-0 text-sm !leading-6">Prefer to call? <a className="font-extrabold underline decoration-[#EC7354] underline-offset-4" href={contactDetails.landlineHref}>{contactDetails.landlineDisplay}</a> or <a className="font-extrabold underline decoration-[#EC7354] underline-offset-4" href={contactDetails.mobileHref}>{contactDetails.mobileDisplay}</a>.</p></div></div>
      <div className="conversion-form-card">{reference ? <div className="conversion-preview-state"><span>ENQUIRY SAVED</span><h2>We have your starting point.</h2><p>Your reference is <strong>{reference}</strong>. The team can view the enquiry securely in the lead inbox. If your matter is time-sensitive, call {contactDetails.landlineDisplay}.</p><div className="flex flex-wrap gap-3"><button className="button button-outline-dark" onClick={() => setReference("")} type="button">Send another enquiry</button><a className="button button-coral" href={contactDetails.discoveryCall} rel="noreferrer" target="_blank">Book a discovery call</a></div></div> : <form onSubmit={onSubmit}>
        <div className="form-heading"><span>01</span><div><p>THE CURRENT MOVE</p><h2>Tell us enough to start clearly.</h2></div></div>
        <fieldset><legend>What are you working on?</legend><div className="form-choice-grid">{moveOptions.map(option => <label key={option}><input name="move" required type="radio" value={option} /><span>{option}</span></label>)}</div></fieldset>
        <div className="form-grid"><label><span>Name</span><input autoComplete="name" name="name" required /></label><label><span>Email</span><input autoComplete="email" name="email" required type="email" /></label><label><span>Mobile</span><input autoComplete="tel" name="mobile" pattern="[0-9 +()-]{8,}" required type="tel" /></label><label><span>Preferred contact</span><select defaultValue="Either" name="contact"><option>Either</option><option>Phone</option><option>Email</option></select></label><label><span>Timing</span><select defaultValue="Still exploring" name="timing"><option>Now</option><option>Within 3 months</option><option>3–12 months</option><option>Still exploring</option></select></label><label className="form-full"><span>What feels unclear?</span><textarea name="message" placeholder="Optional: tell us what you are trying to do and what may be standing in the way." rows={5} /></label><label aria-hidden="true" className="form-honeypot"><span>Website</span><input autoComplete="off" name="website" tabIndex={-1} /></label></div>
        <label className="form-consent"><input required type="checkbox" /><span>I agree that Next Move Loans may use these contact details to respond to this enquiry. I will not upload or include sensitive financial documents in this form.</span></label>
        {error ? <p className="form-error" role="alert">{error}</p> : null}<button className="button button-coral w-full justify-center" data-analytics="lead_form_submit" disabled={isSubmitting} type="submit">{isSubmitting ? "Saving enquiry…" : "Send My Enquiry"}<Send className="size-4" /></button>
      </form>}</div>
    </div></section></main></SiteLayout>;
}

export function BookCall() {
  return <SiteLayout><Seo description="Book a discovery call or Game Plan session with Next Move Loans using the confirmed public scheduling links." jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Book a Conversation", path: "/book-a-call" }])} path="/book-a-call" title="Book a Conversation | Next Move Loans" />
    <main id="main-content"><PageHero breadcrumbs={[{ label: "Home", href: "/" }, { label: "Book a Conversation" }]} challenge="Choose the conversation that matches how much clarity you need." dark eyebrow="LIGHTWEIGHT BOOKING" intro={<p>The calendars open only when you choose one. No third-party booking script is loaded across the rest of the website.</p>} title={<>Choose the right <em>conversation.</em></>} />
      <section className="section-space bg-white"><div className="container grid gap-6 md:grid-cols-2"><a className="contact-path-card group" data-analytics="calendly_discovery" href={contactDetails.discoveryCall} rel="noreferrer" target="_blank"><PhoneCall /><span>01</span><h2>Discovery Call</h2><p>Start with the move, timing and the part that feels uncertain. Use this when you are still defining the useful next step.</p><ArrowRight /></a><a className="contact-path-card group" data-analytics="calendly_game_plan" href={contactDetails.gamePlan} rel="noreferrer" target="_blank"><CalendarDays /><span>02</span><h2>Game Plan Session</h2><p>Use the strategy-session calendar when the situation is ready for a deeper, structured planning conversation.</p><ArrowRight /></a></div></section><FinalCta title="Prefer to give us the context first?" body="Use the short planning form so the first conversation can begin one step ahead." />
    </main></SiteLayout>;
}

export function Contact() {
  return <SiteLayout><Seo description="Contact Next Move Loans in Leongatha by phone, email, planning form or confirmed scheduling link." jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} path="/contact" title="Contact | Next Move Loans" />
    <main id="main-content"><PageHero breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]} challenge="The useful first step is the one with enough context to help." eyebrow="CONTACT NEXT MOVE LOANS" intro={<><p>Start with a short enquiry, a call, email or the conversation calendar that matches where you are.</p><p><strong>Office:</strong> {contactDetails.address}. In-person meetings by arrangement.</p></>} title={<>Start the <em>conversation.</em></>} />
      <section className="section-space bg-white"><div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-4"><Link className="contact-path-card group" href="/plan-your-next-move"><MessageSquareText /><span>01</span><h2>Light enquiry</h2><p>Share your name, contact details, the move and an optional message—no sensitive documents.</p><ArrowRight /></Link><a className="contact-path-card group" data-analytics="calendly_discovery" href={contactDetails.discoveryCall} rel="noreferrer" target="_blank"><CalendarDays /><span>02</span><h2>Discovery call</h2><p>Reserve an initial conversation through the confirmed public calendar.</p><ArrowRight /></a><a className="contact-path-card group" href={contactDetails.landlineHref}><Phone /><span>03</span><h2>{contactDetails.landlineDisplay}</h2><p>Call the Leongatha office. Mobile: {contactDetails.mobileDisplay}.</p><ArrowRight /></a><a className="contact-path-card group" href={`mailto:${contactDetails.email}`}><Mail /><span>04</span><h2>Email the team</h2><p>{contactDetails.email}<br />{contactDetails.address}</p><MapPin className="mt-auto" /></a></div></section>
    </main></SiteLayout>;
}

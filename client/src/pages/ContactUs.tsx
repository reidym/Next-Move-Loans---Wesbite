import { useEffect } from "react";
import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Eyebrow } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { contactDetails } from "@/lib/siteData";

function CalendlyAssets() {
  useEffect(() => {
    const cssId = "calendly-widget-css";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }
    const scriptId = "calendly-widget-js";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
  return null;
}

export default function ContactUs() {
  return <SiteLayout>
    <CalendlyAssets />
    <Seo description="Contact Next Move Loans in Leongatha by phone, email or book a discovery call or Game Plan strategy meeting." jsonLd={breadcrumbSchema([{name:"Home",path:"/"},{name:"Contact Us",path:"/contact-us"}])} path="/contact-us" title="Contact Us | Next Move Loans" />
    <main id="main-content">
      <section className="bg-[#F7F5F1] py-10 lg:py-14">
        <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <Eyebrow>CONTACT US</Eyebrow>
            <h1 className="mt-3 text-[clamp(2.4rem,4.5vw,4.5rem)] font-black leading-[1] tracking-[-0.045em] text-[#16203A]">Start with a conversation.</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#4C5566]">Call us, email us or book a time. You do not need to know exactly which loan you need before we talk.</p>
            <div className="mt-8 grid gap-3">
              <a className="flex items-center gap-4 rounded-[1.1rem] border border-[#16203A]/10 bg-white p-5" href={contactDetails.landlineHref}><Phone className="size-5 text-[#EC7354]"/><div><p className="text-sm font-bold uppercase tracking-[0.12em] text-[#9A6F00]">Call the office</p><p className="mt-1 text-2xl font-black text-[#16203A]">{contactDetails.landlineDisplay}</p></div></a>
              <a className="flex items-center gap-4 rounded-[1.1rem] border border-[#16203A]/10 bg-white p-5" href={contactDetails.emailHref}><Mail className="size-5 text-[#EC7354]"/><div><p className="text-sm font-bold uppercase tracking-[0.12em] text-[#9A6F00]">Email</p><p className="mt-1 font-black text-[#16203A]">{contactDetails.email}</p></div></a>
              <div className="flex items-center gap-4 rounded-[1.1rem] border border-[#16203A]/10 bg-white p-5"><MapPin className="size-5 text-[#EC7354]"/><div><p className="text-sm font-bold uppercase tracking-[0.12em] text-[#9A6F00]">Leongatha</p><p className="mt-1 font-black text-[#16203A]">{contactDetails.address}</p></div></div>
            </div>
            <a className="button button-coral mt-6" href={contactDetails.discoveryCall} onClick={(event) => { event.preventDefault(); const calendly=(window as any).Calendly; if(calendly?.initPopupWidget) calendly.initPopupWidget({url:contactDetails.discoveryCall}); else window.open(contactDetails.discoveryCall,"_blank","noopener,noreferrer"); }}>Book a Discovery Call <CalendarDays className="size-4"/></a>
          </div>

          <div className="rounded-[1.4rem] bg-white p-5 shadow-[0_18px_55px_rgba(22,32,58,0.08)] md:p-7">
            <Eyebrow>GAME PLAN STRATEGY MEETING</Eyebrow>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#16203A]">Ready for a deeper conversation?</h2>
            <p className="mt-3 leading-7 text-[#4C5566]">Book a Game Plan session when you are ready to work through the position, options and next move in more detail.</p>
            <div className="calendly-inline-widget mt-5 min-w-[280px]" data-url={contactDetails.gamePlan} style={{height:"680px"}} />
          </div>
        </div>
      </section>
    </main>
  </SiteLayout>;
}

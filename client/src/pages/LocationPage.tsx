import { Link, useParams } from "wouter";
import { ArrowRight, ArrowUpRight, Check, MapPin, Phone } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { FaqBlock } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import NotFound from "@/pages/NotFound";
import { contactDetails, siteUrl } from "@/lib/siteData";
import { getWebsiteService } from "@/lib/serviceCatalog";
import { getLocationSeoPage } from "@/lib/locationData";

export default function LocationPage(){
  const params=useParams<{slug:string}>();
  const location=getLocationSeoPage(params.slug);
  if(!location)return <NotFound/>;
  const path=`/locations/${location.slug}`;
  const priorityServices=location.priorityServices.map(slug=>getWebsiteService(slug)).filter(Boolean);
  const faqs=[
    {question:`Can Next Move Loans help me if I am in ${location.title}?`,answer:location.physicalOffice?`Yes. Next Move Loans has a physical office at ${location.officeAddress}, and appointments can also be handled by phone or video.`:`Yes. Next Move Loans works with clients in ${location.title} by phone and video, as well as clients Australia-wide.`},
    {question:`What finance can you help with in ${location.title}?`,answer:"We help with home loans, refinancing, first-home buying, investment, self-employed, business, commercial and asset finance, subject to your circumstances and lender policy."},
    {question:"Do I need to know which lender or product I want?",answer:"No. Start with what you are trying to achieve, your timing and what feels unclear. We can work through the lender and structure after that."}
  ];
  const jsonLd=[{"@context":"https://schema.org","@type":"WebPage",name:`Mortgage broker ${location.title}`,url:`${siteUrl}${path}`,about:{"@type":"Place",name:location.title},description:location.intro,keywords:location.keywords.join(", ")},breadcrumbSchema([{name:"Home",path:"/"},{name:"Locations",path:"/locations"},{name:location.title,path}])];

  return <SiteLayout>
    <Seo description={location.intro} jsonLd={jsonLd} path={path} title={`Mortgage Broker ${location.title} | Home Loans & Finance | Next Move Loans`}/>
    <main id="main-content" className="bg-white">
      <section className="py-10 lg:py-12">
        <div className="container grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#EC7354]">{location.region}</p>
            <h1 className="mt-3 max-w-4xl text-[clamp(2.2rem,3.7vw,3.7rem)] font-black tracking-[-0.04em] text-[#16203A]">Mortgage Broker {location.title}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-7 text-[#4C5566]">{location.intro}</p>
            <div className="mt-6 flex flex-wrap gap-3"><Link className="button button-coral" href="/contact-us">Contact Us <ArrowRight className="size-4"/></Link><a className="button button-outline-dark" href={contactDetails.landlineHref}><Phone className="size-4"/>{contactDetails.landlineDisplay}</a></div>
          </div>
          <div className="rounded-2xl bg-[#F3F7FF] p-6"><MapPin className="size-6 text-[#EC7354]"/><h2 className="mt-4 text-xl font-black text-[#16203A]">Why {location.title} can create different finance questions</h2><p className="mt-3 leading-7 text-[#4C5566]">{location.localAngle}</p>{location.physicalOffice?<p className="mt-4 flex items-center gap-2 font-black text-[#16203A]"><MapPin className="size-4 text-[#EC7354]"/>{location.officeAddress}</p>:null}</div>
        </div>
      </section>

      <section className="border-y border-[#16203A]/10 py-9 lg:py-10">
        <div className="container"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.14em] text-[#EC7354]">POPULAR FINANCE NEEDS</p><h2 className="mt-2 text-2xl font-black text-[#16203A]">What do you need help with in {location.title}?</h2></div><Link className="text-sm font-black text-[#EC7354]" href="/contact-us">Not sure? Ask us →</Link></div><div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{priorityServices.map(service=>service?<Link className="group flex min-h-[145px] flex-col justify-between rounded-2xl bg-[#F3F7FF] p-5" href={`/services/${service.slug}`} key={service.slug}><div><h3 className="text-lg font-black text-[#16203A]">{service.title}</h3><p className="mt-2 text-sm leading-6 text-[#4C5566]">{service.short}</p></div><span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#16203A]">Explore <ArrowUpRight className="size-4 text-[#EC7354]"/></span></Link>:null)}</div></div>
      </section>

      {location.localContext?.length?<section className="py-8"><div className="container"><div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">{location.localContext.slice(0,4).map(item=><div className="flex items-start gap-3" key={item}><Check className="mt-1 size-4 shrink-0 text-[#EC7354]"/><p className="text-sm font-semibold leading-6 text-[#16203A]">{item}</p></div>)}</div></div></section>:null}

      <section className="bg-[#F3F7FF] py-9 lg:py-10"><div className="container grid gap-7 lg:grid-cols-[0.72fr_1.28fr]"><div><p className="text-xs font-black uppercase tracking-[0.14em] text-[#EC7354]">COMMON QUESTIONS</p><h2 className="mt-2 text-2xl font-black text-[#16203A]">Working with a mortgage broker in {location.title}</h2></div><FaqBlock items={faqs}/></div></section>

      <section className="bg-[#16203A] py-7 text-white"><div className="container flex flex-wrap items-center justify-between gap-4"><p className="text-xl font-black">Ready to talk about your next move?</p><div className="flex flex-wrap gap-3"><Link className="button button-coral button-small" href="/contact-us">Contact Us</Link><Link className="button button-outline-light button-small" href="/book-a-call">Book a Call</Link></div></div></section>
    </main>
  </SiteLayout>;
}

import { Link } from "wouter";
import { ArrowUpRight, Phone } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Eyebrow } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { contactDetails } from "@/lib/siteData";
import { locationSeoPages } from "@/lib/locationData";

export default function Locations(){return <SiteLayout><Seo description="Next Move Loans works with clients Australia-wide, with local mortgage broker pages for Leongatha, Inverloch, Warragul, Drouin and Melbourne's south-east." jsonLd={breadcrumbSchema([{name:"Home",path:"/"},{name:"Locations",path:"/locations"}])} path="/locations" title="Mortgage Broker Locations | Next Move Loans"/><main id="main-content">
<section className="bg-[#F7F5F1] py-9 lg:py-11"><div className="container flex flex-wrap items-end justify-between gap-6"><div><Eyebrow>AUSTRALIA-WIDE</Eyebrow><h1 className="mt-2 text-[clamp(2.1rem,3.7vw,3.7rem)] font-black tracking-[-0.045em] text-[#16203A]">Mortgage broker locations</h1><p className="mt-3 max-w-3xl text-lg leading-7 text-[#4C5566]">We work with clients across Australia. These are the locations we are building dedicated local content for first.</p></div><a className="inline-flex items-center gap-2 text-xl font-black text-[#16203A]" href={contactDetails.landlineHref}><Phone className="size-5 text-[#EC7354]"/>{contactDetails.landlineDisplay}</a></div></section>
<section className="bg-white py-8 lg:py-10"><div className="container"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{locationSeoPages.map(location=><Link className="group flex items-center justify-between gap-4 rounded-xl border border-[#16203A]/10 bg-[#F8F7F4] p-5" href={`/locations/${location.slug}`} key={location.slug}><div><p className="text-xs font-black uppercase tracking-[0.12em] text-[#9A6F00]">{location.region}</p><h2 className="mt-1 text-xl font-black text-[#16203A]">Mortgage Broker {location.title}</h2></div><ArrowUpRight className="size-5 text-[#EC7354]"/></Link>)}</div></div></section>
<section className="bg-[#16203A] py-6 text-white"><div className="container flex flex-wrap items-center justify-between gap-4"><p className="font-black">Not listed? We are not limited to these suburbs.</p><Link className="button button-coral button-small" href="/contact-us">Contact Us</Link></div></section>
</main></SiteLayout>}

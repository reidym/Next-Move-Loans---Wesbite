import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Eyebrow } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { serviceCategories, services } from "@/lib/siteData";

export default function LoanTypes(){const path="/loan-types";return <SiteLayout><Seo description="Compare home loans, refinancing, first-home buyer, construction, bridging, investment, business, commercial and asset finance with Next Move Loans." jsonLd={breadcrumbSchema([{name:"Home",path:"/"},{name:"Loan Types",path}])} path={path} title="Loan Types | Next Move Loans"/><main id="main-content">
<div className="container py-7"><div className="flex flex-wrap items-end justify-between gap-4"><div><Eyebrow>LOAN TYPES</Eyebrow><h1 className="mt-2 text-[clamp(2rem,3.3vw,3.3rem)] font-black tracking-[-0.04em] text-[#16203A]">Choose what you need help with.</h1></div><Link className="button button-coral button-small" href="/contact-us">Not sure? Ask us</Link></div></div>
{serviceCategories.map((category,index)=>{const categoryServices=services.filter(service=>service.category===category.id);return <section className={`border-t border-[#16203A]/10 py-8 ${index%2===0?"bg-white":"bg-[#F7F5F1]"}`} key={category.id}><div className="container"><div className="flex items-center justify-between gap-4"><h2 className="text-2xl font-black text-[#16203A]">{category.title}</h2><Link className="text-sm font-black text-[#EC7354]" href={category.path}>View category →</Link></div><div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{categoryServices.map(service=><Link className="group flex items-center justify-between gap-4 rounded-xl border border-[#16203A]/10 bg-white p-5" href={`/services/${service.slug}`} key={service.slug}><h3 className="text-lg font-black text-[#16203A]">{service.title}</h3><ArrowUpRight className="size-5 text-[#EC7354]"/></Link>)}</div></div></section>})}
<section className="bg-[#16203A] py-6 text-white"><div className="container flex flex-wrap items-center justify-between gap-4"><p className="font-black">Still not sure? Tell us what you are trying to achieve.</p><Link className="button button-coral button-small" href="/contact-us">Contact Us</Link></div></section>
</main></SiteLayout>}

import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, Building2, Home, Tractor } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { SiteLayout } from "@/components/SiteChrome";
import { serviceCategories } from "@/lib/siteData";

const icons = [Home, Building2, BriefcaseBusiness, Tractor];
const copy: Record<string,string> = {
  "home-property": "Buy your first home, upgrade, refinance, build, bridge or move to acreage.",
  investment: "Buy your first investment, add the next property, release equity or improve the portfolio structure.",
  "business-commercial": "Self-employed home lending, business growth, working capital and commercial property finance.",
  asset: "Vehicles, machinery and equipment finance that keeps working capital in view.",
};

export default function LoanTypes(){
  const path="/loan-types";
  return <SiteLayout>
    <Seo description="Explore home, investment, business, commercial and asset finance options with Next Move Loans." jsonLd={breadcrumbSchema([{name:"Home",path:"/"},{name:"Loan Types",path}])} path={path} title="Loan Types | Next Move Loans"/>
    <main id="main-content" className="bg-white">
      <section className="py-10 lg:py-12">
        <div className="container text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#EC7354]">FINANCE</p>
          <h1 className="mx-auto mt-3 max-w-3xl text-[clamp(2.2rem,3.7vw,3.7rem)] font-black tracking-[-0.04em] text-[#16203A]">What are you trying to make happen?</h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg leading-7 text-[#4C5566]">Choose the broad area. We’ll get into the detail on the next page.</p>

          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {serviceCategories.map((category,index)=>{const Icon=icons[index];return <Link className="group flex min-h-[220px] flex-col rounded-2xl bg-[#F3F7FF] p-6 text-left transition hover:-translate-y-1 hover:shadow-lg" href={category.path} key={category.id}>
              <div className="grid size-11 place-items-center rounded-full bg-white text-[#16203A]"><Icon className="size-5"/></div>
              <h2 className="mt-6 text-2xl font-black tracking-[-0.03em] text-[#16203A]">{category.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#4C5566]">{copy[category.id] ?? category.description}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-black text-[#16203A]">Explore <ArrowUpRight className="size-4 text-[#EC7354]"/></span>
            </Link>})}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4"><p className="font-semibold text-[#4C5566]">Not sure where you fit?</p><Link className="button button-coral button-small" href="/contact-us">Contact Us <ArrowRight className="size-4"/></Link></div>
        </div>
      </section>
    </main>
  </SiteLayout>;
}

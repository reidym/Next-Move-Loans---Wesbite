import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Eyebrow } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { serviceCategories } from "@/lib/siteData";

export default function LoanTypes(){
  const path="/loan-types";
  return <SiteLayout>
    <Seo description="Explore home, investment, business, commercial and asset finance options with Next Move Loans." jsonLd={breadcrumbSchema([{name:"Home",path:"/"},{name:"Loan Types",path}])} path={path} title="Loan Types | Next Move Loans"/>
    <main id="main-content" className="bg-white">
      <section className="py-10 lg:py-12">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <Eyebrow>FINANCE</Eyebrow>
              <h1 className="mt-2 text-[clamp(2rem,3.3vw,3.3rem)] font-black tracking-[-0.04em] text-[#16203A]">What do you need help with?</h1>
              <p className="mt-3 max-w-2xl text-lg leading-7 text-[#4C5566]">Start with the broad area. We’ll take you to the detail from there.</p>
            </div>
            <Link className="button button-coral button-small" href="/contact-us">Not sure? Ask us</Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {serviceCategories.map(category=>
              <Link className="group flex min-h-[180px] flex-col justify-between rounded-2xl bg-[#F1F6FA] p-6 transition hover:-translate-y-0.5 hover:shadow-md" href={category.path} key={category.id}>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-[#B48416]">{category.eyebrow}</p>
                  <h2 className="mt-2 text-2xl font-black text-[#16203A]">{category.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#4C5566]">{category.description}</p>
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#16203A]">Explore <ArrowUpRight className="size-4 text-[#EC7354]"/></span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  </SiteLayout>;
}

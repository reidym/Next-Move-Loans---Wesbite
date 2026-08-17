import { Link, useParams } from "wouter";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Eyebrow } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import NotFound from "@/pages/NotFound";
import { contactDetails, getCategory, services } from "@/lib/siteData";

export default function CategoryPage(){
  const params=useParams<{category:string}>();
  const category=getCategory(params.category);
  if(!category)return <NotFound/>;
  const categoryServices=services.filter(service=>service.category===category.id);

  return <SiteLayout>
    <Seo description={category.description} image={category.image} jsonLd={breadcrumbSchema([{name:"Home",path:"/"},{name:category.title,path:category.path}])} path={category.path} title={`${category.title} Finance | Next Move Loans`}/>
    <main id="main-content">
      <section className="bg-white py-10 lg:py-12">
        <div className="container flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{category.eyebrow}</Eyebrow>
            <h1 className="mt-2 text-[clamp(2rem,3.4vw,3.4rem)] font-black leading-[1.02] tracking-[-0.04em] text-[#16203A]">{category.title}</h1>
            <p className="mt-3 max-w-2xl text-lg leading-7 text-[#4C5566]">Choose the area that matches what you are trying to do. The detail sits inside each option.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="button button-coral" href="/contact-us">Contact Us <ArrowRight className="size-4"/></Link>
            <a className="button button-outline-dark" href={contactDetails.landlineHref}><Phone className="size-4"/>{contactDetails.landlineDisplay}</a>
          </div>
        </div>
      </section>

      <section className="bg-white pb-12 lg:pb-14">
        <div className="container">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categoryServices.map(service=>
              <Link className="group flex min-h-[150px] flex-col justify-between rounded-2xl bg-[#F1F6FA] p-6 transition hover:-translate-y-0.5 hover:shadow-md" href={`/services/${service.slug}`} key={service.slug}>
                <div>
                  <h2 className="text-xl font-black text-[#16203A]">{service.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#4C5566]">{service.short}</p>
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#16203A]">Explore <ArrowUpRight className="size-4 text-[#EC7354]"/></span>
              </Link>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#16203A]/10 pt-6">
            <p className="font-semibold text-[#16203A]">Not sure which option fits? Tell us the outcome you are trying to achieve.</p>
            <Link className="button button-coral button-small" href="/contact-us">Ask Us</Link>
          </div>
        </div>
      </section>
    </main>
  </SiteLayout>;
}

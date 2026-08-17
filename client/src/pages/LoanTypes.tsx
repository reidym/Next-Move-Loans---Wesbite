import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Eyebrow } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { contactDetails, serviceCategories, services } from "@/lib/siteData";

export default function LoanTypes() {
  const path = "/loan-types";
  return (
    <SiteLayout>
      <Seo
        description="Compare home loans, refinancing, first-home buyer, construction, bridging, investment, business, commercial and asset finance with Next Move Loans."
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Loan Types", path }])}
        path={path}
        title="Loan Types | Home, Investment, Business & Asset Finance | Next Move Loans"
      />
      <main id="main-content">
        <section className="bg-[#F7F5F1] py-9 lg:py-12">
          <div className="container grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Eyebrow>LOAN TYPES</Eyebrow>
              <h1 className="mt-3 max-w-4xl text-[clamp(2.3rem,4.2vw,4.2rem)] font-black leading-[1] tracking-[-0.045em] text-[#16203A]">Find the finance that fits the move.</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4C5566]">You do not need to know the product name first. Start with what you are trying to do and jump straight to the relevant loan type.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link className="button button-coral" href="/contact-us">Contact Us <ArrowRight className="size-4" /></Link>
              <a className="button button-outline-dark" href={contactDetails.landlineHref}><Phone className="size-4" /> {contactDetails.landlineDisplay}</a>
            </div>
          </div>
        </section>

        {serviceCategories.map((category, categoryIndex) => {
          const categoryServices = services.filter(service => service.category === category.id);
          return (
            <section className={`py-10 lg:py-12 ${categoryIndex % 2 === 0 ? "bg-white" : "bg-[#F7F5F1]"}`} key={category.id}>
              <div className="container">
                <div className="flex flex-wrap items-end justify-between gap-5">
                  <div>
                    <Eyebrow>{category.eyebrow}</Eyebrow>
                    <h2 className="mt-2 text-[clamp(1.8rem,2.8vw,2.8rem)] font-black tracking-[-0.035em] text-[#16203A]">{category.title}</h2>
                    <p className="mt-2 max-w-3xl leading-7 text-[#4C5566]">{category.description}</p>
                  </div>
                  <Link className="text-sm font-black text-[#16203A] underline decoration-[#EC7354] underline-offset-4" href={category.path}>View {category.title}</Link>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {categoryServices.map((service) => (
                    <Link className="group rounded-[1rem] border border-[#16203A]/10 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md" href={`/services/${service.slug}`} key={service.slug}>
                      <h3 className="text-xl font-black text-[#16203A]">{service.title}</h3>
                      <p className="mt-2 leading-7 text-[#4C5566]">{service.short}</p>
                      <span className="mt-4 inline-flex items-center gap-2 font-black text-[#16203A]">Explore <ArrowUpRight className="size-4 text-[#EC7354]" /></span>
                    </Link>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[1rem] bg-[#16203A] px-5 py-4 text-white">
                  <p className="font-semibold">Not sure which {category.title.toLowerCase()} option fits? Start with the question.</p>
                  <Link className="button button-coral button-small" href="/contact-us">Talk to Us</Link>
                </div>
              </div>
            </section>
          );
        })}
      </main>
    </SiteLayout>
  );
}

import { Link, useParams } from "wouter";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Eyebrow } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import NotFound from "@/pages/NotFound";
import { contactDetails, getCategory, services } from "@/lib/siteData";

export default function CategoryPage() {
  const params = useParams<{ category: string }>();
  const category = getCategory(params.category);
  if (!category) return <NotFound />;
  const categoryServices = services.filter((service) => service.category === category.id);

  return (
    <SiteLayout>
      <Seo
        description={category.description}
        image={category.image}
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: category.title, path: category.path }])}
        path={category.path}
        title={`${category.title} Finance | Next Move Loans`}
      />
      <main id="main-content">
        <section className="bg-[#F7F5F1] py-9 lg:py-12">
          <div className="container grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Eyebrow>{category.eyebrow}</Eyebrow>
              <h1 className="mt-3 text-[clamp(2.3rem,4.2vw,4.2rem)] font-black leading-[1] tracking-[-0.045em] text-[#16203A]">{category.title}</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4C5566]">{category.description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link className="button button-coral" href="/contact-us">Contact Us <ArrowRight className="size-4" /></Link>
              <a className="button button-outline-dark" href={contactDetails.landlineHref}><Phone className="size-4" /> {contactDetails.landlineDisplay}</a>
            </div>
          </div>
        </section>

        <section className="py-9 lg:py-12">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <Eyebrow>WHAT ARE YOU TRYING TO SOLVE?</Eyebrow>
                <h2 className="mt-2 text-[clamp(1.8rem,2.8vw,2.8rem)] font-black tracking-[-0.035em] text-[#16203A]">Go straight to the question that sounds like yours.</h2>
              </div>
              <Link className="button button-coral button-small" href="/contact-us">Ask Us</Link>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {categoryServices.map((service) => (
                <Link className="group rounded-[1.1rem] border border-[#16203A]/10 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md" href={`/services/${service.slug}`} key={service.slug}>
                  <p className="text-sm font-black uppercase tracking-[0.12em] text-[#9A6F00]">{service.title}</p>
                  <h3 className="mt-2 text-xl font-black leading-tight text-[#16203A]">{service.challenge}</h3>
                  <p className="mt-3 leading-7 text-[#4C5566]">{service.short}</p>
                  <span className="mt-4 inline-flex items-center gap-2 font-black text-[#16203A]">See options <ArrowUpRight className="size-4 text-[#EC7354]" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#16203A] py-8 text-white lg:py-10">
          <div className="container flex flex-wrap items-center justify-between gap-5">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.14em] text-[#EC7354]">NOT SURE WHERE YOU FIT?</p>
              <h2 className="mt-2 text-2xl font-black">You do not need the product name. Tell us the outcome.</h2>
            </div>
            <Link className="button button-coral" href="/contact-us">Start a Conversation</Link>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}

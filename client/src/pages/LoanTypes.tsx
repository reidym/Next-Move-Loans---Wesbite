import { Link } from "wouter";
import { ArrowUpRight, Phone } from "lucide-react";
import { PageHero } from "@/components/PagePrimitives";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Eyebrow } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { assets, contactDetails, serviceCategories, services, siteUrl } from "@/lib/siteData";

export default function LoanTypes() {
  const path = "/loan-types";
  return (
    <SiteLayout>
      <Seo
        description="Explore home, investment, business, commercial, rural, vehicle, equipment and machinery loan types available through Next Move Loans."
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Loan Types", path }])}
        path={path}
        title="Loan Types | Next Move Loans"
      />
      <main id="main-content">
        <PageHero
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Loan Types" }]}
          challenge="Start with the outcome if the product name is not yet clear."
          eyebrow="TYPES OF FINANCE"
          image={assets.businessCommercial}
          intro={<><p>Loan types explain the facility. Solutions explain the decision. Use either route to find the right starting conversation.</p><p>Availability, eligibility and suitability depend on the borrower, purpose, security, evidence and lender policy.</p></>}
          title={<>The finance range. <em>Plainly organised.</em></>}
        >
          <div className="flex flex-wrap gap-3"><Link className="button button-coral" href="/#solutions">Browse by solution</Link><a className="button button-outline-dark" href={contactDetails.landlineHref}><Phone aria-hidden="true" className="size-4" /> {contactDetails.landlineDisplay}</a></div>
        </PageHero>

        {serviceCategories.map((category, categoryIndex) => {
          const categoryServices = services.filter(service => service.category === category.id);
          return (
            <section className={`section-space ${categoryIndex % 2 === 0 ? "bg-white" : "bg-[#EFEAE2]"}`} key={category.id}>
              <div className="container grid gap-10 lg:grid-cols-[0.58fr_1.42fr]">
                <div>
                  <Eyebrow>{category.eyebrow}</Eyebrow>
                  <h2 className="solution-subheading">{category.title}</h2>
                  <p className="mt-5 max-w-md leading-7 text-[#4C5566]">{category.description}</p>
                  <Link className="arrow-link mt-7" href={category.path}>View the category hub <ArrowUpRight aria-hidden="true" className="size-4" /></Link>
                </div>
                <div className="loan-type-index-list">
                  {categoryServices.map((service, index) => (
                    <Link href={`/services/${service.slug}`} key={service.slug}>
                      <span>0{index + 1}</span><div><h3>{service.title}</h3><p>{service.short}</p></div><ArrowUpRight aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        <section className="home-final-cta">
          <div className="container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><div><Eyebrow light>NOT SURE WHICH FACILITY FITS?</Eyebrow><h2>Bring us the decision first.</h2><p>We will help identify the useful loan types after the property, business, asset, timing and future options are clear.</p></div><Link className="button button-coral" href="/plan-your-next-move">Plan Your Next Move <ArrowUpRight aria-hidden="true" className="size-4" /></Link></div>
        </section>
      </main>
    </SiteLayout>
  );
}

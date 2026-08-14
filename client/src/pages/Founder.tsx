/** Founder profile grounded in verified qualifications and the approved Berwick-to-Leongatha story. */

import { Link } from "wouter";
import { ArrowRight, ExternalLink, Phone } from "lucide-react";
import { PageHero } from "@/components/PagePrimitives";
import { Seo, breadcrumbSchema, organizationSchema } from "@/components/Seo";
import { Checklist, Eyebrow, SectionIntro } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { assets, contactDetails, founder, siteUrl } from "@/lib/siteData";

export default function Founder() {
  const jsonLd = [
    organizationSchema,
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Martin Reidy",
      alternateName: "Marty Reidy",
      jobTitle: "Founder & Mortgage Broker",
      worksFor: { "@type": "Organization", name: "Next Move Loans", url: siteUrl },
      url: `${siteUrl}/team/martin-reidy`,
      sameAs: [founder.publicProfile],
      knowsAbout: founder.strengths,
    },
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Our Team", path: "/team" }, { name: "Martin Reidy", path: "/team/martin-reidy" }]),
  ];

  return (
    <SiteLayout>
      <Seo
        description="Meet Martin ‘Marty’ Reidy, founder and mortgage broker at Next Move Loans, helping clients make clearer home, investment, business, commercial and asset-finance decisions."
        image={assets.businessCommercial}
        jsonLd={jsonLd}
        path="/team/martin-reidy"
        title="Martin ‘Marty’ Reidy | Founder, Next Move Loans"
      />
      <main id="main-content">
        <PageHero
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Our Team", href: "/team" }, { label: "Martin Reidy" }]}
          challenge="The bank can tell you how much it may lend. That is not the same as knowing the right move."
          eyebrow="FOUNDER & MORTGAGE BROKER"
          image={assets.businessCommercial}
          intro={<><p>{founder.intro}</p><p>Today, Marty works with clients across Gippsland, Melbourne’s south-east and elsewhere in Australia—starting with the decision before narrowing the lender.</p></>}
          title="Martin ‘Marty’ Reidy"
        >
          <div className="flex flex-wrap gap-3">
            <a className="button button-coral" href={contactDetails.discoveryCall} rel="noreferrer" target="_blank">Book a discovery call <ArrowRight aria-hidden="true" className="size-4" /></a>
            <a className="button button-outline-dark" href={contactDetails.mobileHref}><Phone aria-hidden="true" className="size-4" /> {contactDetails.mobileDisplay}</a>
          </div>
        </PageHero>

        <section className="section-space bg-white">
          <div className="container grid gap-14 lg:grid-cols-[0.72fr_1.28fr]">
            <SectionIntro
              body={<p>The story is not about building a brand around one postcode. It is about creating a better way to see the opportunity, the constraints and the next position.</p>}
              eyebrow="WHERE IT BEGAN"
              index="01"
              title={<>Berwick first. Country roots next. <em>A bigger purpose after that.</em></>}
            />
            <div className="founder-story-copy">
              <p>Marty began his mortgage-broking business in Berwick. The move to Leongatha brought him back to the kind of country community he understood and gave him the chance to build a full-service finance business where people could see more than one lender’s answer.</p>
              <p>Better advice changed the level of Marty’s own game. That experience shaped the belief behind Next Move Loans: uncertainty should not be allowed to hide opportunity, and clients should not be exploited because lending language or policy is difficult to navigate.</p>
              <p>The role is to listen closely, challenge the obvious answer, make the trade-offs visible and help like-minded people build the home, portfolio or business they are working toward.</p>
            </div>
          </div>
        </section>

        <section className="section-space bg-[#EFEAE2]">
          <div className="container grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <Eyebrow>VERIFIED FOUNDATION</Eyebrow>
              <h2 className="solution-subheading">Qualifications, experience and publicly listed reach.</h2>
              <p className="mt-5 max-w-lg leading-7 text-[#4C5566]">Credentials matter. They support the work; they do not replace the need to understand the client, the evidence and the consequences of the recommendation.</p>
            </div>
            <div className="founder-detail-panel">
              <div><p className="profile-label">Verified qualifications and public experience</p><Checklist items={founder.credentials} /></div>
              <div className="mt-10 border-t border-[#16203A]/12 pt-8">
                <p className="profile-label">Genuine service reach</p>
                <p className="mt-4 text-lg leading-8 text-[#4C5566]">Confirmed office in Leongatha, service-area connections across Gippsland and Melbourne’s south-east, and clients elsewhere in Australia where the lending scenario and service model are appropriate.</p>
              </div>
              <a className="mt-8 inline-flex items-center gap-2 font-semibold text-[#16203A] underline decoration-[#EC7354] decoration-2 underline-offset-4" href={founder.publicProfile} rel="noreferrer" target="_blank">
                View the public BrokerPages profile <ExternalLink aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="container">
            <SectionIntro eyebrow="CAPABILITY" index="02" title="The conversations Marty is built for." />
            <div className="capability-grid">
              {founder.strengths.map((strength, index) => (
                <div key={strength}><span>0{index + 1}</span><h3>{strength}</h3><p>Strategic lending support with the wider personal, property or business objective kept in view.</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="home-final-cta">
          <div className="container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><Eyebrow light>THE FIRST CONVERSATION</Eyebrow><h2>Bring the complicated version.</h2><p>The first job is not to make the application look simple. It is to understand the real situation clearly.</p></div>
            <div className="flex flex-wrap gap-3"><Link className="button button-coral" href="/plan-your-next-move">Start a light enquiry <ArrowRight aria-hidden="true" className="size-4" /></Link><a className="button button-outline-light" href={contactDetails.discoveryCall} rel="noreferrer" target="_blank">Book a discovery call</a></div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}

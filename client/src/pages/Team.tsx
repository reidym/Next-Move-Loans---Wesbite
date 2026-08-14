/**
 * Pathfinder Editorial team page: verified authority first, no invented bios or review proof,
 * and a clear system for adding future brokers without turning the brand into one personal profile.
 */

import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, UserRoundPlus } from "lucide-react";
import { PageHero } from "@/components/PagePrimitives";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { ArrowLink, Checklist, FinalCta, SectionIntro } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { assets, founder } from "@/lib/siteData";

export default function Team() {
  return (
    <SiteLayout>
      <Seo
        description="Meet the people building Next Move Loans, beginning with founder and mortgage broker Martin ‘Marty’ Reidy and a framework designed for a growing team."
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Our Team", path: "/team" }])}
        path="/team"
        title="Our Team | Next Move Loans"
      />
      <main id="main-content">
        <PageHero
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Our Team" }]}
          challenge="The client should experience one standard, no matter who helps them."
          eyebrow="THE PEOPLE BEHIND THE PATH"
          intro={<p>Next Move Loans begins with deep regional experience and is being built as a multi-broker brand with one clear method, one voice and one standard of care.</p>}
          title={<>Built from experience. <em>Designed for what comes next.</em></>}
        >
          <Link className="button button-coral" href="/plan-your-next-move">
            Plan Your Next Move<ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </PageHero>

        <section className="section-space bg-white">
          <div className="container">
            <SectionIntro eyebrow="FOUNDER" index="01" title="Martin ‘Marty’ Reidy" />
            <div className="founder-profile-card">
              <div className="founder-profile-mark">
                <img alt="Next Move Loans coral icon" src={assets.icon} />
                <span>MR</span>
              </div>
              <div>
                <p className="founder-profile-role">{founder.role}</p>
                <h2>{founder.name}</h2>
                <p className="founder-profile-intro">{founder.intro}</p>
                <div className="mt-7 grid gap-8 md:grid-cols-2">
                  <div>
                    <p className="profile-label">Verified credentials</p>
                    <Checklist items={founder.credentials} />
                  </div>
                  <div>
                    <p className="profile-label">Areas of capability</p>
                    <Checklist items={founder.strengths} />
                  </div>
                </div>
                <div className="mt-8"><ArrowLink href="/team/martin-reidy">View Marty’s full profile</ArrowLink></div>
              </div>
            </div>
          </div>
        </section>

        <section className="team-growth-section">
          <div className="container grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <div className="team-growth-icon"><UserRoundPlus aria-hidden="true" /></div>
            <div>
              <span className="team-growth-label">THE TEAM ARCHITECTURE</span>
              <h2>More brokers. One Next Move experience.</h2>
              <p>
                The site and brand system are ready for future brokers to have equally strong authority pages, verified credentials, specialisms, service areas, articles and structured data—without rebuilding the experience.
              </p>
              <a className="arrow-link arrow-link-light" href="mailto:hello@nextmoveloans.com.au">
                <span>Team details awaiting final confirmation</span><ArrowUpRight aria-hidden="true" className="size-5" />
              </a>
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
    </SiteLayout>
  );
}


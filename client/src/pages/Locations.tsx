/**
 * Pathfinder Editorial location index: service-area honesty, regional context and strong hubs,
 * avoiding cloned suburb pages or any implication of offices that have not been verified.
 */

import { Link } from "wouter";
import { ArrowUpRight, MapPin } from "lucide-react";
import { PageHero } from "@/components/PagePrimitives";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { FinalCta, SectionIntro } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { assets, locations } from "@/lib/siteData";

const allAreas = ["Leongatha", "Korumburra", "Inverloch", "Wonthaggi", "Warragul", "Drouin", "Pakenham", "Officer", "Beaconsfield", "Berwick", "Narre Warren"];

export default function Locations() {
  return (
    <SiteLayout>
      <Seo
        description="Next Move Loans has a confirmed Leongatha office and serves clients in Warragul, Berwick and surrounding towns with useful, town-specific finance guidance."
        image={assets.regionalAcreage}
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }])}
        path="/locations"
        title="Locations We Serve | Next Move Loans"
      />
      <main id="main-content">
        <PageHero
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Locations" }]}
          challenge="A location page should earn the right to exist."
          eyebrow="REGIONAL ROOTS. ADVICE BUILT TO TRAVEL."
          image={assets.regionalAcreage}
          intro={<><p>Next Move Loans has a confirmed office in Leongatha and serves clients in Warragul, Berwick and surrounding towns.</p><p>Each page distinguishes the physical office from a genuine service area and focuses on the finance decisions people in that place actually bring us.</p></>}
          title={<>Local context. <em>Bigger-picture strategy.</em></>}
        />

        <section className="section-space bg-white">
          <div className="container">
            <SectionIntro
              body={<p>These hubs group places with shared property, borrower and finance patterns. More pages will be added only when unique local evidence makes them useful.</p>}
              eyebrow="PRIORITY REGIONAL HUBS"
              index="01"
              title="Fewer pages. More local value."
            />
            <div className="location-card-grid">
              {locations.map((location, index) => (
                <Link className="location-card group" href={`/locations/${location.slug}`} key={location.slug}>
                  <div className="flex items-start justify-between gap-5">
                    <span className="location-card-number">0{index + 1}</span>
                    <MapPin aria-hidden="true" />
                  </div>
                  <p className="location-card-region">{location.region}</p>
                  <h2>{location.title}</h2>
                  <p>{location.intro}</p>
                  <span className="location-card-link">Explore this service area<ArrowUpRight aria-hidden="true" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="served-area-band">
          <div className="container grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:items-start">
            <div>
              <span>PLACES WE SERVE</span>
              <h2>One regional network. Different local decisions.</h2>
              <p>A listed place is a service area, not a statement that Next Move Loans has a physical office there.</p>
            </div>
            <div className="served-area-list">
              {allAreas.map((area, index) => <div key={area}><span>{String(index + 1).padStart(2, "0")}</span><p>{area}</p></div>)}
            </div>
          </div>
        </section>

        <FinalCta title="Your location matters. The strategy matters more." />
      </main>
    </SiteLayout>
  );
}

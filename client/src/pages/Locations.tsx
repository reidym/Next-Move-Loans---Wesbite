import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Eyebrow } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { contactDetails } from "@/lib/siteData";
import { locationSeoPages } from "@/lib/locationData";

export default function Locations() {
  return (
    <SiteLayout>
      <Seo
        description="Next Move Loans works with clients Australia-wide, with dedicated mortgage broker location pages for Leongatha, Inverloch, Warragul, Drouin and Melbourne's south-east including Pakenham, Officer, Beaconsfield, Berwick and Narre Warren."
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }])}
        path="/locations"
        title="Mortgage Broker Locations | Next Move Loans"
      />
      <main id="main-content">
        <section className="bg-[#16203A] py-10 text-white lg:py-14">
          <div className="container grid gap-7 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <Eyebrow light>AUSTRALIA-WIDE</Eyebrow>
              <h1 className="mt-3 max-w-4xl text-[clamp(2.4rem,4.5vw,4.5rem)] font-black leading-[1] tracking-[-0.045em]">Finance advice wherever the next move takes you.</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">We work with clients across Australia by phone and video, with a physical office in Leongatha. These local pages focus on the towns and south-east Melbourne suburbs we are actively building content and search visibility around first.</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link className="button button-coral" href="/contact-us">Contact Us <ArrowRight className="size-4" /></Link>
              <a className="button button-outline-light" href={contactDetails.landlineHref}>{contactDetails.landlineDisplay}</a>
            </div>
          </div>
        </section>

        <section className="py-10 lg:py-14">
          <div className="container">
            <div className="grid gap-5 lg:grid-cols-[1fr_0.7fr] lg:items-end">
              <div>
                <Eyebrow>LOCAL MORTGAGE BROKER GUIDES</Eyebrow>
                <h2 className="mt-3 text-[clamp(1.9rem,3vw,3rem)] font-black leading-[1.05] tracking-[-0.035em] text-[#16203A]">Start with your location. Then solve the actual finance question.</h2>
              </div>
              <p className="leading-7 text-[#4C5566]">Each page is written around local property and borrower search intent—not cloned suburb copy.</p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {locationSeoPages.map((location) => (
                <Link className="group rounded-[1.2rem] border border-[#16203A]/10 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg" href={`/locations/${location.slug}`} key={location.slug}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#9A6F00]">{location.region}</p>
                      <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#16203A]">Mortgage Broker {location.title}</h2>
                    </div>
                    <MapPin className="size-5 text-[#EC7354]" />
                  </div>
                  <p className="mt-4 line-clamp-3 leading-7 text-[#4C5566]">{location.intro}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-black text-[#16203A]">View {location.title} guide <ArrowUpRight className="size-4 text-[#EC7354]" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#16203A]/10 bg-[#F7F5F1] py-9 lg:py-11">
          <div className="container flex flex-wrap items-center justify-between gap-5">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.14em] text-[#9A6F00]">NOT LISTED?</p>
              <h2 className="mt-2 text-2xl font-black text-[#16203A]">We are not limited to these suburbs.</h2>
              <p className="mt-2 text-[#4C5566]">If you are elsewhere in Victoria or Australia, start with a call. The location pages above are our first SEO focus—not our service boundary.</p>
            </div>
            <Link className="button button-coral" href="/contact-us">Contact Us</Link>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}

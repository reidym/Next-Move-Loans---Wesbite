import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, MapPin, Phone } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { SiteLayout } from "@/components/SiteChrome";
import { contactDetails } from "@/lib/siteData";
import { locationSeoPages } from "@/lib/locationData";

export default function Locations(){return <SiteLayout>
  <Seo description="Next Move Loans works with clients Australia-wide, with dedicated mortgage broker pages for Leongatha, Inverloch, Warragul, Drouin and Melbourne's south-east." jsonLd={breadcrumbSchema([{name:"Home",path:"/"},{name:"Locations",path:"/locations"}])} path="/locations" title="Mortgage Broker Locations | Next Move Loans"/>
  <main id="main-content" className="bg-white">
    <section className="py-10 lg:py-14">
      <div className="container text-center">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-[#EC7354]">AUSTRALIA-WIDE</p>
        <h1 className="mx-auto mt-3 max-w-3xl text-[clamp(2.2rem,3.8vw,3.8rem)] font-black tracking-[-0.045em] text-[#16203A]">Mortgage broker help, wherever you are.</h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg leading-7 text-[#4C5566]">We work with clients across Australia. These pages give local information for the areas we are targeting first.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link className="button button-coral" href="/contact-us">Contact Us <ArrowRight className="size-4"/></Link>
          <a className="button button-outline-dark" href={contactDetails.landlineHref}><Phone className="size-4"/>{contactDetails.landlineDisplay}</a>
        </div>
      </div>
    </section>

    <section className="border-t border-[#16203A]/8 py-8 lg:py-10">
      <div className="container">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locationSeoPages.map(location=><Link className="group flex min-h-[150px] flex-col justify-between rounded-2xl bg-[#EEF7FB] p-5 transition hover:-translate-y-0.5 hover:shadow-md" href={`/locations/${location.slug}`} key={location.slug}>
            <div>
              <MapPin className="size-5 text-[#EC7354]"/>
              <h2 className="mt-4 text-xl font-black text-[#16203A]">Mortgage Broker {location.title}</h2>
              <p className="mt-1 text-sm text-[#4C5566]">{location.region}</p>
            </div>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#16203A]">View local page <ArrowUpRight className="size-4 text-[#EC7354]"/></span>
          </Link>)}
        </div>
      </div>
    </section>
  </main>
</SiteLayout>}

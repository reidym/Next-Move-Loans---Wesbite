import { ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { PageHero } from "@/components/PagePrimitives";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Eyebrow } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { ReviewProof } from "@/components/ReviewProof";
import { founder } from "@/lib/siteData";
import { usePublicData, type ReviewRow } from "@/lib/publicApi";

export default function Reviews() {
  const reviews = usePublicData<ReviewRow[]>("/api/public/reviews");
  return <SiteLayout><Seo description="Read approved, source-attributed Next Move Loans client reviews and verified recognition without invented quotes, ratings or outcomes." jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Awards & Reviews", path: "/reviews" }])} path="/reviews" title="Awards & Reviews | Next Move Loans" />
    <main id="main-content"><PageHero breadcrumbs={[{ label: "Home", href: "/" }, { label: "Awards & Reviews" }]} challenge="Proof should be real, current and easy to verify." eyebrow="VERIFIED PROOF ONLY" intro={<><p>Reviews appear only after exact wording, attribution and source have been approved in the secure CMS.</p><p>Public Google records can be added from the public source without requesting owner or manager access to the Business Profile.</p></>} title={<>Proof with a <em>source.</em></>}>
      <Link className="button button-coral" href="/plan-your-next-move">Plan Your Next Move <ArrowRight className="size-4" /></Link>
    </PageHero>
    {reviews.data?.length ? <ReviewProof /> : <section className="section-space bg-white"><div className="container grid gap-10 lg:grid-cols-[0.7fr_1.3fr]"><div><Eyebrow>REVIEW CONTENT AWAITING APPROVAL</Eyebrow><h2 className="solution-subheading">No copied, combined or invented praise.</h2></div><div className="review-empty-public"><ShieldCheck /><p>The public review component and placement controls are live. No review wording has been supplied and approved for the new website yet, so none is displayed as a placeholder.</p><a href={founder.publicProfile} rel="noreferrer" target="_blank">View Marty’s existing public BrokerPages profile <ExternalLink /></a></div></div></section>}
    <section className="public-proof-band"><div className="container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"><div><span>CURRENT PUBLIC PROFILE</span><h2>Use the source that exists today.</h2><p>External profile content remains controlled by its source platform.</p></div><a className="button button-outline-light" href={founder.publicProfile} rel="noreferrer" target="_blank">Open BrokerPages <ExternalLink className="size-4" /></a></div></section>
    </main></SiteLayout>;
}

/**
 * Pathfinder Editorial brand story: purpose before credentials, uncertainty as the enemy,
 * and an experience standard that makes every finance interaction feel clearer and more optimistic.
 */

import { Link } from "wouter";
import { ArrowRight, Eye, Gauge, Lightbulb, Sparkles, Telescope } from "lucide-react";
import { PageHero } from "@/components/PagePrimitives";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { ArrowLink, Eyebrow, FinalCta, SectionIntro } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { ReviewProof } from "@/components/ReviewProof";
import { assets } from "@/lib/siteData";

const principles = [
  [Lightbulb, "Start With Possibility", "The conversation begins with what you are trying to build—not the lender, policy or interest rate."],
  [Eye, "Challenge the Obvious", "The first answer is not always the best answer. Better strategy starts with better questions."],
  [Gauge, "Make It Easy", "Finance is complicated enough. Our role is to remove friction and explain the complexity without hiding it."],
  [Sparkles, "Build Momentum", "Every approval should create another opportunity rather than close the conversation at settlement."],
  [Telescope, "Never Settle", "We keep looking for better ideas, clearer systems and stronger outcomes—for clients and for the business."],
];

export default function About() {
  return (
    <SiteLayout>
      <Seo
        description="Next Move Loans exists to reduce uncertainty, create clarity and help Australians build what comes next through strategy-led finance and long-term support."
        image={assets.hero}
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])}
        path="/about"
        title="About Next Move Loans | Everyone’s Building Something"
      />
      <main id="main-content">
        <PageHero
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Next Move Loans" }]}
          challenge="Does this help us unlock the path for the people we serve?"
          dark
          eyebrow="OUR WHY"
          intro={<p>We are not building another finance business. We are building a business that helps people build what’s next.</p>}
          title={<>Everyone’s building something. <em>We unlock the path.</em></>}
        >
          <Link className="button button-coral" href="/plan-your-next-move">
            Plan Your Next Move<ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </PageHero>

        <section className="section-space bg-[#F7F5F1]">
          <div className="container grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <SectionIntro
              body={<p>People rarely wake up wanting a loan. They want a home, more space, a growing business, wealth, freedom or a better life.</p>}
              eyebrow="FINANCE IS THE VEHICLE"
              index="01"
              title={<>The goal is bigger than the <em>loan.</em></>}
            />
            <div className="belief-stack">
              {["A home.", "A family.", "A business.", "Wealth.", "A better life."].map((belief, index) => (
                <div key={belief}><span>0{index + 1}</span><p>{belief}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="enemy-section">
          <div className="container grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
            <div>
              <Eyebrow light>OUR ENEMY</Eyebrow>
              <h2>Uncertainty.</h2>
            </div>
            <div className="enemy-copy">
              <p>Not knowing where to start. Not knowing what is possible. Not knowing who to trust. Trying to make one of life’s biggest decisions alone.</p>
              <p>We believe people deserve clarity, a strategy, the right support and the confidence to move forward.</p>
            </div>
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="container">
            <SectionIntro
              body={<p>People may not remember every policy detail. They remember whether the conversation left them more informed, optimistic and ready to move.</p>}
              eyebrow="THE NEXT MOVE EXPERIENCE™"
              index="02"
              title={<>The standard is not a good mortgage experience. It is <em>a clearer next move.</em></>}
            />
            <div className="principle-grid">
              {principles.map(([Icon, title, body], index) => {
                const PrincipleIcon = Icon as typeof Lightbulb;
                return (
                  <article className="principle-card" key={title as string}>
                    <span className="principle-number">0{index + 1}</span>
                    <PrincipleIcon aria-hidden="true" />
                    <h3>{title as string}</h3>
                    <p>{body as string}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="voice-section">
          <div className="container grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div className="voice-art">
              <img alt="A pathway linking a home, business and future opportunities" loading="lazy" src={assets.hero} />
              <span>CHALLENGE / EDUCATE / ENTERTAIN / INSPIRE</span>
            </div>
            <div>
              <Eyebrow>OUR VOICE</Eyebrow>
              <h2 className="section-title">If we could be mistaken for another finance company, we have failed.</h2>
              <p className="mt-5 text-lg leading-8 text-[#4C5566]">
                We challenge conventional thinking, simplify complexity and freely share ideas that help people make better decisions. Confident, optimistic, straightforward, curious, authentic and human.
              </p>
              <p className="voice-quote">A useful perspective should help you see the decision differently.</p>
              <div className="mt-8"><ArrowLink href="/learn">See the voice in action</ArrowLink></div>
            </div>
          </div>
        </section>

        <ReviewProof compact placement="about" />
        <FinalCta />
      </main>
    </SiteLayout>
  );
}

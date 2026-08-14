/**
 * Pathfinder Editorial method page: the route line becomes the central composition,
 * connecting discovery, strategy, action, review and the supplied framework resources.
 */

import { Link } from "wouter";
import { ArrowRight, Compass, Map, Rocket, Users } from "lucide-react";
import { PageHero } from "@/components/PagePrimitives";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { ArrowLink, Eyebrow, FinalCta, SectionIntro } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { approvalSteps, assets } from "@/lib/siteData";

const icons = [Compass, Map, Rocket, Users];
const discovery = [
  ["01", "Where are you today?", "Your current position, commitments, resources and the facts that shape the starting point."],
  ["02", "Where do you want to be?", "The immediate move, five-year goals and the longer view that should influence today’s structure."],
  ["03", "What is standing in your way?", "Knowledge, confidence, finance, structure, time or a policy problem that has not yet been framed clearly."],
  ["04", "What’s your next move?", "The strategic objective that turns a broad ambition into a decision we can plan and execute."],
];

export default function ApprovalMethod() {
  return (
    <SiteLayout>
      <Seo
        description="The Approval Method™ is Next Move Loans’ four-step process for creating clarity, building the game plan, taking action and remaining a long-term finance partner."
        image={assets.canvas}
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "The Approval Method", path: "/approval-method" }])}
        path="/approval-method"
        title="The Approval Method™ | Next Move Loans"
      />
      <main id="main-content">
        <PageHero
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "The Approval Method™" }]}
          challenge="What are you trying to build?"
          dark
          eyebrow="CLARITY TODAY. STRATEGY TOMORROW. OPPORTUNITY ALWAYS."
          intro={<p>Four connected stages turn a finance conversation into a clearer strategic path—before, during and after the loan.</p>}
          title={<>The Approval <em>Method™</em></>}
        >
          <Link className="button button-coral" href="/plan-your-next-move">
            Start With Clarity<ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </PageHero>

        <section className="method-steps-section">
          <div className="container">
            {approvalSteps.map((step, index) => {
              const Icon = icons[index];
              return (
                <article className="method-step-row" key={step.number}>
                  <div className="method-step-marker">
                    <span>{step.number}</span>
                    <div aria-hidden="true" className="method-step-line" />
                  </div>
                  <div className="method-step-icon"><Icon aria-hidden="true" /></div>
                  <div>
                    <Eyebrow>STAGE {step.number}</Eyebrow>
                    <h2>{step.title}</h2>
                    <p>{step.short}</p>
                    <blockquote>{step.question}</blockquote>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section-space bg-[#EFEAE2]">
          <div className="container">
            <SectionIntro
              body={<p>Every strategy session begins with four questions. They are simple by design. The quality comes from what the answers reveal.</p>}
              eyebrow="THE NEXT MOVE FRAMEWORK™"
              index="01"
              title={<>Better strategy starts with <em>better questions.</em></>}
            />
            <div className="discovery-grid">
              {discovery.map(([number, title, body]) => (
                <article key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="resource-showcase">
          <div className="container grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <Eyebrow light>FROM CONVERSATION TO DOCUMENTED DIRECTION</Eyebrow>
              <h2>The framework makes the bigger plan visible.</h2>
              <p>
                The Next Move Framework™ and Canvas connect where you are today, what you are building, what may hold you back and how the current approval supports the move that follows.
              </p>
              <div className="mt-8"><ArrowLink href="/plan-your-next-move" light>Plan Your Next Move</ArrowLink></div>
            </div>
            <div className="resource-image-stack">
              <img alt="The Next Move Framework showing a path through property, lifestyle, business and wealth milestones" loading="lazy" src={assets.framework} />
              <img alt="The Next Move Canvas used to document the current position, goals and next move" loading="lazy" src={assets.canvas} />
            </div>
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="container grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
            <SectionIntro eyebrow="THE OUTCOME" index="02" title="The loan becomes one step within a much bigger plan." />
            <div className="outcome-panel">
              {["Clarity", "Direction", "A documented strategy", "Confidence", "A defined next move"].map((outcome, index) => (
                <div key={outcome}><span>0{index + 1}</span><p>{outcome}</p></div>
              ))}
            </div>
          </div>
        </section>

        <FinalCta title="What becomes possible when the path is clear?" />
      </main>
    </SiteLayout>
  );
}


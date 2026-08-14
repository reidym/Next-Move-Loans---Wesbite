import { Link, useParams } from "wouter";
import { ArrowRight, ArrowUpRight, CheckCircle2, Phone } from "lucide-react";
import { Seo } from "@/components/Seo";
import { FaqBlock, Eyebrow } from "@/components/Shared";
import { PageHero } from "@/components/PagePrimitives";
import { SiteLayout } from "@/components/SiteChrome";
import { contactDetails } from "@/lib/siteData";
import { getSolution } from "@/lib/solutionData";
import NotFound from "@/pages/NotFound";

export default function SolutionPage() {
  const { slug } = useParams<{ slug: string }>();
  const solution = getSolution(slug);
  if (!solution) return <NotFound />;

  return (
    <SiteLayout>
      <Seo
        description={solution.intro}
        path={`/solutions/${solution.slug}`}
        title={`${solution.title} | Next Move Loans`}
      />
      <main id="main-content">
        <PageHero
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/#solutions" }, { label: solution.title }]}
          challenge={solution.challenge}
          eyebrow={solution.eyebrow}
          image={solution.image}
          intro={<p>{solution.intro}</p>}
          title={solution.title}
        >
          <div className="flex flex-wrap gap-3">
            <Link className="button button-coral" href="/plan-your-next-move">Plan this move <ArrowRight aria-hidden="true" className="size-4" /></Link>
            <a className="button button-outline-dark" href={contactDetails.landlineHref}><Phone aria-hidden="true" className="size-4" /> Call {contactDetails.landlineDisplay}</a>
          </div>
        </PageHero>

        <section className="section-space bg-white">
          <div className="container">
            <div className="compact-section-heading">
              <div><Eyebrow>THE DECISIONS TO MAKE VISIBLE</Eyebrow><h2>Start with the trade-offs.</h2></div>
              <p>The product only makes sense after the property, cash flow, evidence, timing and future options are understood together.</p>
            </div>
            <div className="solution-decision-grid">
              {solution.decisions.map((decision, index) => (
                <article className="solution-decision-card" key={decision.title}>
                  <span>0{index + 1}</span><h3>{decision.title}</h3><p>{decision.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="solution-sequence-section">
          <div className="container grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div><Eyebrow light>BUILD THE GAME PLAN</Eyebrow><h2>A useful sequence before the application.</h2><p>Every scenario changes, but these are the conversations that prevent urgency from becoming the strategy.</p></div>
            <div className="solution-sequence">
              {solution.sequence.map((step, index) => (
                <article key={step.title}><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space bg-[#EFEAE2]">
          <div className="container grid gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>QUESTIONS WORTH ASKING</Eyebrow>
              <h2 className="solution-subheading">Make the hidden assumptions explicit.</h2>
              <div className="solution-question-list">
                {solution.questions.map(question => <div key={question}><CheckCircle2 aria-hidden="true" /><p>{question}</p></div>)}
              </div>
            </div>
            <div>
              <Eyebrow>RELATED LOAN TYPES</Eyebrow>
              <h2 className="solution-subheading">Understand the facilities behind the solution.</h2>
              <div className="solution-loan-links">
                {solution.loanTypes.map(item => <Link href={item.href} key={item.href}><span>{item.label}</span><ArrowUpRight aria-hidden="true" /></Link>)}
              </div>
            </div>
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="container grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div><Eyebrow>COMMON QUESTIONS</Eyebrow><h2 className="solution-subheading">Clear answers. Appropriate limits.</h2><p className="mt-5 leading-7 text-[#4C5566]">General information only. Lending eligibility and suitability depend on the full circumstances, lender policy and verified evidence.</p></div>
            <FaqBlock items={solution.faq} />
          </div>
        </section>

        <section className="home-final-cta">
          <div className="container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><Eyebrow light>NEXT CONVERSATION</Eyebrow><h2>Bring us the move and what feels unclear.</h2><p>We will help you identify the useful questions, evidence and sequence before recommending a lender or facility.</p></div>
            <div className="flex flex-wrap gap-3"><Link className="button button-coral" href="/plan-your-next-move">Start a light enquiry <ArrowRight aria-hidden="true" className="size-4" /></Link><a className="button button-outline-light" href={contactDetails.landlineHref}><Phone aria-hidden="true" className="size-4" /> Call the office</a></div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}

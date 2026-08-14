/** Refined homepage: solution choice first, verified proof, concise method and direct human contact. */

import { Link } from "wouter";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Home as HomeIcon,
  Map,
  Phone,
  RefreshCw,
  TrendingUp,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { Seo, organizationSchema } from "@/components/Seo";
import { ArrowLink, Eyebrow, ProcessPath } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { ReviewProof } from "@/components/ReviewProof";
import { articles, assets, contactDetails, founder, solutionHubs } from "@/lib/siteData";
import { mergeCmsArticles } from "@/lib/cmsContent";
import { usePublicData, type AwardRow, type CmsArticleRow } from "@/lib/publicApi";

const solutionIcons: Record<(typeof solutionHubs)[number]["id"], LucideIcon> = {
  purchase: HomeIcon,
  refinance: RefreshCw,
  investment: TrendingUp,
  business: BriefcaseBusiness,
  "agri-rural": Map,
  asset: Truck,
};

const clientMoves = [
  {
    label: "Buying the next home",
    title: "More space should not mean fewer future options.",
    body: "Compare selling, keeping, building and bridging before a property deadline chooses the sequence for you.",
    href: "/solutions/buying-your-next-home",
  },
  {
    label: "Building an investment portfolio",
    title: "Your limit may be a lender limit—not the end of the plan.",
    body: "Review equity, serviceability, lender order and structure before the next application narrows the move after it.",
    href: "/solutions/investment",
  },
  {
    label: "Moving regional or buying acreage",
    title: "A home to you can be non-standard security to a lender.",
    body: "Check acreage, access, zoning, services, improvements and intended use before finance becomes urgent.",
    href: "/solutions/agri-rural",
  },
  {
    label: "Growing a business",
    title: "A profitable business can still tell the wrong story on paper.",
    body: "Connect the accounts, ownership structure, cash flow and purpose of the funds so the evidence supports the opportunity.",
    href: "/solutions/business",
  },
] as const;

function AwardProof() {
  const { data: awards, isLoading } = usePublicData<AwardRow[]>("/api/public/awards");

  return (
    <section className="award-proof-section" aria-labelledby="award-proof-title">
      <div className="container">
        <div className="award-proof-heading">
          <div>
            <Eyebrow light>VERIFIED RECOGNITION</Eyebrow>
            <h2 id="award-proof-title">Finalist recognition. Stated exactly.</h2>
          </div>
          <p>Independent recognition across regional broking, finance and professional service. No inflated claims. No invented rankings.</p>
        </div>
        {isLoading ? (
          <p className="award-proof-loading" role="status">Loading verified award records…</p>
        ) : awards?.length ? (
          <div className="award-proof-grid">
            {awards.map(({ award, media }) => (
              <article className="award-proof-card" key={award.id}>
                {media ? <img alt={media.altText ?? `${award.awardName} ${award.recognitionLevel} badge`} loading="lazy" src={media.publicUrl} /> : null}
                <div>
                  <span>{award.year} · {award.recognitionLevel}</span>
                  <h3>{award.category}</h3>
                  <p>{award.awardName}</p>
                  <small>{award.awardingBody}</small>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="award-proof-loading">Verified award records are being prepared for display.</p>
        )}
        <div className="mt-8 flex justify-end">
          <ArrowLink href="/reviews" light>Awards and public reviews</ArrowLink>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const cmsArticles = usePublicData<CmsArticleRow[]>("/api/public/articles");
  const learningArticles = mergeCmsArticles(articles, cmsArticles.data);
  return (
    <SiteLayout>
      <Seo
        description="Next Move Loans helps Australians plan home, property, business, rural and asset finance with clarity before commitment."
        jsonLd={organizationSchema}
        path="/"
        title="Next Move Loans | Finance the Move. Keep What Comes Next Possible."
      />
      <main id="main-content">
        <section className="hero-section hero-section-refined">
          <div className="container grid gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-20 xl:min-h-[720px]">
            <div className="hero-copy min-w-0">
              <Eyebrow>CLARITY BEFORE COMMITMENT</Eyebrow>
              <h1 className="hero-title hero-title-refined">
                Everyone’s building something.
                <span>Finance should unlock it.</span>
              </h1>
              <p className="hero-lede">
                A first home. The next property. A growing business. Acreage. Equipment. We help you see the trade-offs, build the sequence and take the next move with clarity.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link className="button button-coral" href="/plan-your-next-move">
                  Plan Your Next Move <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
                <a className="button button-outline-dark" href={contactDetails.landlineHref}>
                  <Phone aria-hidden="true" className="size-4" /> {contactDetails.landlineDisplay}
                </a>
              </div>
              <p className="hero-contact-note">Leongatha office · Helping clients across Victoria and beyond</p>
            </div>

            <div className="hero-visual-wrap hero-visual-refined">
              <div className="hero-image-frame">
                <img
                  alt="A conceptual pathway connecting an Australian home, business and future opportunities"
                  className="hero-image"
                  decoding="async"
                  fetchPriority="high"
                  height={810}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  src={assets.hero}
                  srcSet={`${assets.heroSmall} 960w, ${assets.hero} 1440w`}
                  width={1440}
                />
                <div aria-hidden="true" className="hero-image-label">
                  <span>Clarity</span><ArrowRight className="size-4" /><span>Strategy</span><ArrowRight className="size-4" /><span>Opportunity</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-space solution-choice-section" id="solutions">
          <div className="container">
            <div className="compact-section-heading">
              <div>
                <Eyebrow>START WITH THE MOVE</Eyebrow>
                <h2>What are you trying to do?</h2>
              </div>
              <p>You do not need to know the product name. Choose the outcome, tension or opportunity that brought you here.</p>
            </div>
            <div className="solution-choice-grid">
              {solutionHubs.map((solution, index) => {
                const Icon = solutionIcons[solution.id];
                return (
                  <Link className="solution-choice-card group" href={solution.path} key={solution.id}>
                    <span className="solution-choice-number">0{index + 1}</span>
                    <Icon aria-hidden="true" className="solution-choice-icon" />
                    <h3>{solution.title}</h3>
                    <p>{solution.short}</p>
                    <strong>{solution.prompt}</strong>
                    <ArrowUpRight aria-hidden="true" className="solution-choice-arrow" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <AwardProof />
        <ReviewProof compact placement="home" />

        <section className="section-space bg-[#F7F5F1]">
          <div className="container">
            <div className="compact-section-heading">
              <div>
                <Eyebrow>THE PROBLEM BEHIND THE PRODUCT</Eyebrow>
                <h2>Good finance starts with the real decision.</h2>
              </div>
              <p>These are the moves clients ask us to help make clearer—before a rate, lender or deadline becomes the whole conversation.</p>
            </div>
            <div className="audience-grid">
              {clientMoves.map((move, index) => (
                <Link className="audience-card" href={move.href} key={move.label}>
                  <span>0{index + 1} · {move.label}</span>
                  <h3>{move.title}</h3>
                  <p>{move.body}</p>
                  <strong>Explore the decision <ArrowUpRight aria-hidden="true" className="size-4" /></strong>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space bg-white" id="method">
          <div className="container compact-method">
            <div>
              <Eyebrow>THE APPROVAL METHOD™</Eyebrow>
              <h2>A clear sequence from idea to action.</h2>
              <p>The loan matters. The decisions around it matter more. We create clarity, build the game plan, take action and stay connected as the next move changes.</p>
              <ArrowLink href="/approval-method">See the full method</ArrowLink>
            </div>
            <ProcessPath />
          </div>
        </section>

        <section className="founder-band founder-band-refined">
          <div className="container grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div className="founder-visual">
              <img alt="A regional Australian property connected to a clear path" loading="lazy" src={assets.regionalAcreage} />
            </div>
            <div>
              <Eyebrow>FROM BERWICK TO LEONGATHA</Eyebrow>
              <h2 className="section-title">Better advice can change the level of your game.</h2>
              <p className="mt-5 text-lg leading-8 text-[#4C5566]">{founder.intro}</p>
              <p className="mt-5 text-lg leading-8 text-[#4C5566]">The enemy is uncertainty. The work is to understand the opportunity, make the trade-offs visible and help you move without losing sight of what comes next.</p>
              <div className="founder-contact-list">
                <a href={contactDetails.landlineHref}>{contactDetails.landlineDisplay}</a>
                <a href={contactDetails.mobileHref}>{contactDetails.mobileDisplay}</a>
                <a href={contactDetails.emailHref}>{contactDetails.email}</a>
                <span>{contactDetails.address}</span>
              </div>
              <div className="mt-8"><ArrowLink href="/team/martin-reidy">Meet Marty</ArrowLink></div>
            </div>
          </div>
        </section>

        <section className="section-space bg-[#F7F5F1]" id="learn">
          <div className="container">
            <div className="compact-section-heading">
              <div>
                <Eyebrow>LEARNING CENTRE</Eyebrow>
                <h2>Useful thinking before the application.</h2>
              </div>
              <p>Short, direct perspectives on the contradictions, trade-offs and policy details that can change the move.</p>
            </div>
            <div className="article-grid">
              {learningArticles.slice(0, 3).map((article, index) => (
                <Link className="article-card group" href={`/learn/${article.slug}`} key={article.slug}>
                  <span className="article-card-index">0{index + 1}</span>
                  <p className="article-card-category">{article.category}</p>
                  <h3>{article.title}</h3>
                  <p className="article-card-summary">{article.summary}</p>
                  <span className="article-card-link">Read the perspective <ArrowUpRight aria-hidden="true" className="size-4" /></span>
                </Link>
              ))}
            </div>
            <div className="mt-10 flex justify-end"><ArrowLink href="/learn">Explore the Learning Centre</ArrowLink></div>
          </div>
        </section>

        <section className="home-final-cta">
          <div className="container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Eyebrow light>YOUR NEXT MOVE</Eyebrow>
              <h2>Bring us the decision—not a perfect application.</h2>
              <p>Tell us what you are trying to build and what feels unclear. We will help you work out the most useful next conversation.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link className="button button-coral" href="/plan-your-next-move">Start a light enquiry <ArrowRight aria-hidden="true" className="size-4" /></Link>
              <a className="button button-outline-light" href={contactDetails.landlineHref}><Phone aria-hidden="true" className="size-4" /> Call the office</a>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}

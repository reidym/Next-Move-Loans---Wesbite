/** Long-form article template backed by publish-ready CMS records with a launch-library fallback. */
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, Clock, RefreshCw } from "lucide-react";
import { Breadcrumbs } from "@/components/PagePrimitives";
import { Seo, breadcrumbSchema, organizationSchema } from "@/components/Seo";
import { ArrowLink, FinalCta } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import NotFound from "@/pages/NotFound";
import { articles as launchArticles, founder, getService, siteUrl } from "@/lib/siteData";
import { mergeCmsArticles } from "@/lib/cmsContent";
import { usePublicData, type CmsArticleRow } from "@/lib/publicApi";

const displayDate = (value?: string) => value ? new Date(value).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }) : "13 August 2026";

const relationshipScore = (current: ReturnType<typeof mergeCmsArticles>[number], candidate: ReturnType<typeof mergeCmsArticles>[number]) => {
  const sharedTags = (current.tags ?? []).filter(tag => (candidate.tags ?? []).includes(tag)).length;
  return (current.category === candidate.category ? 4 : 0) + (current.audience && current.audience === candidate.audience ? 3 : 0) + sharedTags;
};

export default function ArticlePage() {
  const params = useParams<{ slug: string }>();
  const cmsArticles = usePublicData<CmsArticleRow[]>("/api/public/articles");
  const allArticles = mergeCmsArticles(launchArticles, cmsArticles.data);
  const article = allArticles.find(item => item.slug === params.slug);
  if (!article && cmsArticles.isLoading) return <SiteLayout><main className="grid min-h-[65vh] place-items-center bg-[#F7F5F1]" id="main-content"><p className="font-bold text-[#4C5566]">Loading the perspective…</p></main></SiteLayout>;
  if (!article) return <NotFound />;
  const service = getService(article.relatedService) ?? getService("home-loans")!;
  const path = `/learn/${article.slug}`;
  const relatedArticles = allArticles.filter(candidate => candidate.slug !== article.slug).map(candidate => ({ candidate, score: relationshipScore(article, candidate) })).filter(item => item.score > 0).sort((left, right) => right.score - left.score || Date.parse(right.candidate.publishedAt ?? "") - Date.parse(left.candidate.publishedAt ?? "")).slice(0, 3).map(item => item.candidate);
  const jsonLd = [organizationSchema, { "@context": "https://schema.org", "@type": "BlogPosting", headline: article.title, description: article.summary, datePublished: article.publishedAt ?? "2026-08-13", dateModified: article.updatedAt ?? article.publishedAt ?? "2026-08-13", mainEntityOfPage: `${siteUrl}${path}`, inLanguage: "en-AU", articleSection: article.category, keywords: article.tags?.join(", "), author: { "@type": "Person", name: article.authorName, url: `${siteUrl}/team/martin-reidy` }, publisher: { "@type": "Organization", name: "Next Move Loans", url: siteUrl } }, breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Learning Centre", path: "/learn" }, { name: article.title, path }])];

  return <SiteLayout><Seo description={article.summary} jsonLd={jsonLd} path={path} title={`${article.title} | Next Move Loans`} type="article" />
    <main id="main-content"><article><header className="article-hero"><div className="container py-12 lg:py-20"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Learning Centre", href: "/learn" }, { label: article.category }]} light /><div className="mt-12 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end"><div><p className="article-kicker">{article.category}{article.audience ? ` / ${article.audience}` : ""}</p><h1>{article.title}</h1><p className="article-summary">{article.summary}</p></div><div className="article-meta-card"><p>Written by</p><Link href="/team/martin-reidy">{article.authorName ?? founder.name}</Link><div><Clock /><span>{article.readMinutes ?? 4} minute read</span></div><span>General information · {displayDate(article.publishedAt)}</span>{article.updatedAt && article.updatedAt !== article.publishedAt ? <div><RefreshCw /><span>Reviewed {displayDate(article.updatedAt)}</span></div> : null}</div></div></div></header>
      <div className="article-layout container"><aside className="article-aside"><Link className="article-back" href="/learn"><ArrowLeft />Back to learning</Link><div className="article-related-service"><span>RELATED PATH</span><h2>{service.title}</h2><p>{service.short}</p><ArrowLink href={`/services/${service.slug}`}>Explore the loan type</ArrowLink></div>{article.tags?.length ? <div className="article-topic-tags"><span>TOPICS</span>{article.tags.map(tag => <b key={tag}>{tag}</b>)}</div> : null}</aside><div className="article-body"><p className="article-opening">{article.summary}</p>{article.sections.map((section, index) => <section key={section.heading}><span className="article-section-number">0{index + 1}</span><h2>{section.heading}</h2><p>{section.body}</p></section>)}<div className="article-disclaimer"><strong>Important:</strong> This article is general information only. It does not consider your objectives, financial situation or needs. Lending policy, costs, eligibility, market conditions and government settings can change. Verify current information and seek advice appropriate to your circumstances before acting.</div><Link className="button button-coral" href="/plan-your-next-move">Talk Through the Decision<ArrowRight className="size-4" /></Link></div></div>
    </article>{relatedArticles.length ? <section className="section-space bg-[#EFEAE2]" aria-labelledby="related-perspectives"><div className="container"><div className="compact-section-heading"><div><p className="eyebrow">KEEP THE DECISION CONNECTED</p><h2 id="related-perspectives">Related perspectives.</h2></div><p>Automatically selected from current publish-ready content with the closest audience, decision and topic overlap.</p></div><div className="article-grid">{relatedArticles.map((related, index) => <Link className="article-card" href={`/learn/${related.slug}`} key={related.slug}><span className="article-card-index">0{index + 1}</span><p className="article-card-category">{related.category}</p><h3>{related.title}</h3><p className="article-card-summary">{related.summary}</p><span className="article-card-link">Read the perspective <ArrowRight className="size-4" /></span></Link>)}</div></div></section> : null}<FinalCta title="The useful question is rarely just ‘Can I?’" body="It is ‘What does this decision make possible next?’" /></main>
  </SiteLayout>;
}

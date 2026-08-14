/** Decision-led Learning Centre with CMS publishing and coded launch-content fallback. */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight, Search } from "lucide-react";
import { PageHero } from "@/components/PagePrimitives";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { FinalCta, SectionIntro } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { articles as launchArticles } from "@/lib/siteData";
import { mergeCmsArticles } from "@/lib/cmsContent";
import { usePublicData, type CmsArticleRow } from "@/lib/publicApi";
import { buildActiveTopicHubs } from "@/lib/topicHubs";

const decisions = ["All", "Buying", "Upgrading", "Investing", "Regional", "Business", "Assets"];

export default function Learning() {
  const cmsArticles = usePublicData<CmsArticleRow[]>("/api/public/articles");
  const articles = useMemo(() => mergeCmsArticles(launchArticles, cmsArticles.data), [cmsArticles.data]);
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => articles.filter(article => {
    const searchable = `${article.title} ${article.summary} ${article.category} ${article.audience ?? ""} ${(article.tags ?? []).join(" ")}`.toLowerCase();
    const decisionMatch = active === "All" || searchable.includes(active.toLowerCase());
    return decisionMatch && searchable.includes(query.toLowerCase());
  }), [active, articles, query]);
  const topicHubs = useMemo(() => buildActiveTopicHubs(articles), [articles]);

  return <SiteLayout><Seo description="Direct, decision-led perspectives for buyers, upgraders, investors, regional movers and business owners—published through the secure Next Move Loans CMS." jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Learning Centre", path: "/learn" }])} path="/learn" title="Learning Centre | Next Move Loans" />
    <main id="main-content"><PageHero breadcrumbs={[{ label: "Home", href: "/" }, { label: "Learning Centre" }]} challenge="Teach before you sell. Challenge before you repeat." dark eyebrow="LEARN / QUESTION / MOVE" intro={<p>Useful perspectives for the decision before the application. Short paragraphs. Clear trade-offs. No rate commentary unless there is something genuinely useful to say.</p>} title={<>Ideas that make the <em>next move</em> clearer.</>} />
      <section className="learning-audience-band"><div className="container"><p>Current decision hubs</p><div>{topicHubs.map(hub => <Link href={`/learn/topics/${hub.slug}`} key={hub.slug}>{hub.label} <strong>{hub.articles.length}</strong></Link>)}</div></div></section>
      <section className="section-space bg-[#F7F5F1]"><div className="container"><SectionIntro body={<p>Filter by the move in front of you, or search the question people are often thinking but have not yet asked out loud.</p>} eyebrow="THE LEARNING CENTRE" index="01" title="Start with the tension." />
        <div className="learning-controls"><div aria-label="Filter articles by decision" className="learning-filters">{decisions.map(decision => <button aria-pressed={active === decision} className={active === decision ? "active" : ""} key={decision} onClick={() => setActive(decision)} type="button">{decision}</button>)}</div><label className="learning-search"><Search /><span className="sr-only">Search articles</span><input onChange={event => setQuery(event.target.value)} placeholder="Search a decision or trade-off" type="search" value={query} /></label></div>
        <div className="learning-list">{visible.map((article, index) => <Link className="learning-row group" href={`/learn/${article.slug}`} key={article.slug}><span className="learning-row-number">{String(index + 1).padStart(2, "0")}</span><div><p className="learning-row-category">{article.category}{article.audience ? ` · ${article.audience}` : ""}</p><h2>{article.title}</h2><p>{article.summary}</p>{article.tags?.length ? <div className="learning-row-tags">{article.tags.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div> : null}</div><ArrowUpRight /></Link>)}{visible.length === 0 ? <div className="learning-empty">No article matches that search yet. Try the underlying decision rather than a product name.</div> : null}</div>
      </div></section><FinalCta title="A useful article can start the thought. A conversation can turn it into a plan." />
    </main></SiteLayout>;
}

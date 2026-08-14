import { useMemo } from "react";
import { Link, useParams } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PagePrimitives";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { FinalCta, SectionIntro } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { articles as launchArticles, siteUrl } from "@/lib/siteData";
import { mergeCmsArticles } from "@/lib/cmsContent";
import { getTopicHub, topicHubMatchesArticle } from "@/lib/topicHubs";
import { usePublicData, type CmsArticleRow } from "@/lib/publicApi";
import NotFound from "@/pages/NotFound";

export default function TopicHubPage() {
  const { slug } = useParams<{ slug: string }>();
  const hub = getTopicHub(slug);
  const cmsArticles = usePublicData<CmsArticleRow[]>("/api/public/articles");
  const articles = useMemo(() => mergeCmsArticles(launchArticles, cmsArticles.data), [cmsArticles.data]);
  const visible = useMemo(() => hub ? articles.filter(article => topicHubMatchesArticle(hub, article)) : [], [articles, hub]);

  if (!hub) return <NotFound />;
  const path = `/learn/topics/${hub.slug}`;
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "CollectionPage", name: `${hub.label} finance perspectives`, description: hub.description, url: `${siteUrl}${path}`, mainEntity: { "@type": "ItemList", itemListElement: visible.map((article, index) => ({ "@type": "ListItem", position: index + 1, name: article.title, url: `${siteUrl}/learn/${article.slug}` })) } },
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Learning Centre", path: "/learn" }, { name: hub.label, path }]),
  ];

  return <SiteLayout><Seo description={hub.description} jsonLd={jsonLd} path={path} title={`${hub.label} Finance Insights | Next Move Loans`} />
    <main id="main-content"><PageHero breadcrumbs={[{ label: "Home", href: "/" }, { label: "Learning Centre", href: "/learn" }, { label: hub.label }]} challenge={hub.challenge} dark eyebrow={hub.eyebrow} intro={<p>{hub.description}</p>} title={<>{hub.label} <em>perspectives.</em></>} />
      <section className="section-space bg-[#F7F5F1]"><div className="container"><SectionIntro body={<p>This hub updates automatically from current publish-ready CMS articles. Drafts, unpublished items and future scheduled content do not appear.</p>} eyebrow="CURRENT PERSPECTIVES" index="01" title={`${visible.length} useful ${visible.length === 1 ? "decision" : "decisions"}.`} />
        <div className="learning-list">{visible.map((article, index) => <Link className="learning-row group" href={`/learn/${article.slug}`} key={article.slug}><span className="learning-row-number">{String(index + 1).padStart(2, "0")}</span><div><p className="learning-row-category">{article.category}{article.audience ? ` · ${article.audience}` : ""}</p><h2>{article.title}</h2><p>{article.summary}</p>{article.tags?.length ? <div className="learning-row-tags">{article.tags.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div> : null}</div><ArrowUpRight /></Link>)}{!cmsArticles.isLoading && visible.length === 0 ? <div className="learning-empty">No publish-ready perspective is assigned to this hub yet.</div> : null}</div>
      </div></section><FinalCta title="The article is context. The next conversation makes it specific." /></main>
  </SiteLayout>;
}


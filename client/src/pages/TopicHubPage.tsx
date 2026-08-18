import { useMemo } from "react";
import { Link, useParams } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Eyebrow } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { articles as launchArticles } from "@/lib/articleLibrary";
import { siteUrl } from "@/lib/siteData";
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
  const jsonLd = [{"@context":"https://schema.org","@type":"CollectionPage",name:`${hub.label} finance guides`,description:hub.description,url:`${siteUrl}${path}`,mainEntity:{"@type":"ItemList",itemListElement:visible.map((article,index)=>({"@type":"ListItem",position:index+1,name:article.title,url:`${siteUrl}/learn/${article.slug}`}))}},breadcrumbSchema([{name:"Home",path:"/"},{name:"Learning Centre",path:"/learn"},{name:hub.label,path}])];

  return <SiteLayout><Seo description={hub.description} jsonLd={jsonLd} path={path} title={`${hub.label} Finance Guides | Next Move Loans`} />
    <main id="main-content" className="bg-white">
      <section className="py-10 lg:py-12"><div className="container grid gap-5 lg:grid-cols-[1fr_0.72fr] lg:items-end"><div><Eyebrow>LEARNING CENTRE</Eyebrow><h1 className="mt-2 text-[clamp(2.1rem,3.6vw,3.6rem)] font-black tracking-[-0.04em] text-[#16203A]">{hub.label}</h1></div><p className="text-lg leading-8 text-[#4C5566]">{hub.description}</p></div></section>
      <section className="border-y border-[#16203A]/10 bg-[#F3F7FF] py-5"><div className="container flex flex-wrap items-center justify-between gap-4"><p className="font-black text-[#16203A]">{hub.challenge}</p><Link className="text-sm font-black text-[#EC7354]" href="/learn">All articles →</Link></div></section>
      <section className="py-8 lg:py-10"><div className="container"><div className="grid gap-x-8 border-t border-[#16203A]/10 md:grid-cols-2">{visible.map(article=><Link className="group flex gap-4 border-b border-[#16203A]/10 py-6" href={`/learn/${article.slug}`} key={article.slug}><div className="flex-1"><p className="text-xs font-black uppercase tracking-[0.12em] text-[#EC7354]">{article.category}</p><h2 className="mt-2 text-xl font-black leading-tight text-[#16203A] group-hover:text-[#EC7354]">{article.title}</h2><p className="mt-2 text-sm leading-6 text-[#4C5566]">{article.summary}</p></div><ArrowUpRight className="size-5 shrink-0 text-[#16203A]"/></Link>)}{!cmsArticles.isLoading&&visible.length===0?<p className="py-8 text-[#667080]">No article is assigned to this topic yet.</p>:null}</div></div></section>
      <section className="bg-[#16203A] py-7 text-white"><div className="container flex flex-wrap items-center justify-between gap-4"><p className="font-black">Need to make the information specific to your position?</p><Link className="button button-coral button-small" href="/contact-us">Contact Us</Link></div></section>
    </main>
  </SiteLayout>;
}

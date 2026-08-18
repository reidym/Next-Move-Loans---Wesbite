import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight, Search } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Eyebrow } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import { articles as launchArticles } from "@/lib/articleLibrary";
import { mergeCmsArticles } from "@/lib/cmsContent";
import { usePublicData, type CmsArticleRow } from "@/lib/publicApi";

const filters = [
  ["All", ""],
  ["First Home", "first home"],
  ["Upgrading", "upgrad"],
  ["Investment", "invest"],
  ["Regional & Rural", "regional"],
  ["Business Owners", "business"],
  ["Refinancing", "refinanc"],
  ["Construction", "construction"],
  ["Assets", "asset"],
] as const;

export default function Learning() {
  const cmsArticles = usePublicData<CmsArticleRow[]>("/api/public/articles");
  const articles = useMemo(() => mergeCmsArticles(launchArticles, cmsArticles.data), [cmsArticles.data]);
  const [active, setActive] = useState("");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => articles.filter(article => {
    const searchable = `${article.title} ${article.summary} ${article.category} ${article.audience ?? ""} ${article.decision ?? ""} ${(article.tags ?? []).join(" ")}`.toLowerCase();
    return (!active || searchable.includes(active)) && searchable.includes(query.toLowerCase());
  }), [active, articles, query]);

  return (
    <SiteLayout>
      <Seo description="In-depth Australian mortgage, first-home, upgrading, investment, rural, self-employed, business and asset-finance guides from Next Move Loans." jsonLd={breadcrumbSchema([{name:"Home",path:"/"},{name:"Learning Centre",path:"/learn"}])} path="/learn" title="Learning Centre | Mortgage & Finance Guides | Next Move Loans" />
      <main id="main-content" className="bg-white">
        <section className="py-10 lg:py-12">
          <div className="container grid gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div><Eyebrow>LEARNING CENTRE</Eyebrow><h1 className="mt-2 max-w-4xl text-[clamp(2.2rem,3.7vw,3.7rem)] font-black leading-[1] tracking-[-0.04em] text-[#16203A]">Useful answers before the application.</h1></div>
            <p className="text-lg leading-8 text-[#4C5566]">Long-form, practical guides built around the questions buyers, investors and business owners are actually asking.</p>
          </div>
        </section>

        <section className="border-y border-[#16203A]/10 bg-[#F3F7FF] py-5">
          <div className="container flex flex-wrap items-center gap-2">
            {filters.map(([label,key]) => <button aria-pressed={active===key} className={`rounded-full px-4 py-2 text-sm font-bold transition ${active===key ? "bg-[#16203A] text-white" : "bg-white text-[#16203A] hover:bg-[#E8EFFC]"}`} key={label} onClick={()=>setActive(key)} type="button">{label}</button>)}
            <label className="ml-auto flex min-w-[240px] items-center gap-2 rounded-full border border-[#16203A]/15 bg-white px-4 py-2"><Search className="size-4 text-[#667080]"/><span className="sr-only">Search articles</span><input className="w-full bg-transparent text-sm outline-none" onChange={e=>setQuery(e.target.value)} placeholder="Search a question or topic" type="search" value={query}/></label>
          </div>
        </section>

        <section className="py-8 lg:py-10">
          <div className="container">
            <div className="grid gap-x-8 border-t border-[#16203A]/10 md:grid-cols-2">
              {visible.map(article => (
                <Link className="group flex gap-4 border-b border-[#16203A]/10 py-6" href={`/learn/${article.slug}`} key={article.slug}>
                  <div className="min-w-0 flex-1"><p className="text-xs font-black uppercase tracking-[0.12em] text-[#EC7354]">{article.category}{article.audience ? ` · ${article.audience}` : ""}</p><h2 className="mt-2 text-xl font-black leading-tight tracking-[-0.02em] text-[#16203A] group-hover:text-[#EC7354]">{article.title}</h2><p className="mt-2 line-clamp-3 text-sm leading-6 text-[#4C5566]">{article.summary}</p><p className="mt-3 text-xs font-bold text-[#667080]">{article.readMinutes ?? 7} min read</p></div><ArrowUpRight className="mt-1 size-5 shrink-0 text-[#16203A]"/>
                </Link>
              ))}
            </div>
            {visible.length===0 ? <p className="py-10 text-center text-[#667080]">No article matches that search yet.</p> : null}
          </div>
        </section>

        <section className="bg-[#16203A] py-8 text-white"><div className="container flex flex-wrap items-center justify-between gap-5"><div><p className="text-xs font-black uppercase tracking-[0.14em] text-[#EC7354]">CAN’T FIND YOUR QUESTION?</p><h2 className="mt-1 text-2xl font-black">Tell us what you are trying to solve. We’ll start there.</h2></div><Link className="button button-coral" href="/contact-us">Contact Us</Link></div></section>
      </main>
    </SiteLayout>
  );
}

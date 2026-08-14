import { useMemo, useState } from "react";
import { ExternalLink, Link2, Plus, Save } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { AdminPanel, AdminScreen, EmptyState, Field, StatusPill, formatAdminDate } from "./AdminUi";

type PageType = "solution" | "loan_type" | "location" | "article" | "broker" | "standard";
type PageStatus = "draft" | "scheduled" | "published" | "unpublished";

const blankPage = {
  id: undefined as number | undefined,
  pageType: "article" as PageType,
  slug: "",
  title: "",
  eyebrow: "",
  excerpt: "",
  sectionsText: '[\n  {\n    "heading": "",\n    "body": ""\n  }\n]',
  status: "draft" as PageStatus,
  publishAt: "",
  indexable: false,
  seoTitle: "",
  metaDescription: "",
  canonicalUrl: "",
  ogTitle: "",
  ogDescription: "",
  ogImageUrl: "",
  schemaText: "{}",
  ctaKey: "plan-your-next-move",
};

const blankArticle = { id: undefined as number | undefined, topic: "", tags: "", authorBrokerId: "", publicationDate: "", contentUpdatedDate: "", featuredMediaId: "", sourceNotes: "" };
const blankRelation = { sourcePageId: "", targetPageId: "", relationType: "related_article" as "related_article" | "related_service" | "related_location" | "related_solution", sortOrder: "0" };

const nullable = (value: string) => value.trim() || null;
const numberOrNull = (value: string) => value ? Number(value) : null;
const localInput = (value: Date | string | null | undefined) => {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};
const pagePath = (type: PageType, slug: string) => type === "article" ? `/learn/${slug}` : type === "solution" ? `/solutions/${slug}` : type === "location" ? `/locations/${slug}` : type === "loan_type" ? `/services/${slug}` : type === "broker" ? `/team/${slug}` : `/${slug}`;

export default function AdminContent() {
  const utils = trpc.useUtils();
  const pages = trpc.adminCms.pages.useQuery();
  const articles = trpc.adminCms.articles.useQuery();
  const brokers = trpc.adminCms.brokers.useQuery();
  const media = trpc.adminCms.media.useQuery();
  const relations = trpc.adminCms.relations.useQuery();
  const [form, setForm] = useState(blankPage);
  const [article, setArticle] = useState(blankArticle);
  const [relation, setRelation] = useState(blankRelation);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");

  const savePage = trpc.adminCms.savePage.useMutation();
  const saveArticle = trpc.adminCms.saveArticle.useMutation();
  const saveRelation = trpc.adminCms.saveRelation.useMutation({ onSuccess: () => { void utils.adminCms.relations.invalidate(); setRelation(blankRelation); } });
  const pageRows = pages.data ?? [];
  const counts = useMemo(() => ({ titles: form.seoTitle.length || form.title.length, description: form.metaDescription.length, sections: (() => { try { const parsed = JSON.parse(form.sectionsText); return Array.isArray(parsed) ? parsed.length : 0; } catch { return 0; } })() }), [form]);

  const editPage = (page: NonNullable<typeof pages.data>[number]) => {
    setError(""); setSaved("");
    setForm({
      id: page.id, pageType: page.pageType, slug: page.slug, title: page.title, eyebrow: page.eyebrow ?? "", excerpt: page.excerpt ?? "", sectionsText: JSON.stringify(page.sections, null, 2),
      status: page.status, publishAt: localInput(page.publishAt), indexable: page.indexable, seoTitle: page.seoTitle ?? "", metaDescription: page.metaDescription ?? "", canonicalUrl: page.canonicalUrl ?? "",
      ogTitle: page.ogTitle ?? "", ogDescription: page.ogDescription ?? "", ogImageUrl: page.ogImageUrl ?? "", schemaText: JSON.stringify(page.schemaJson ?? {}, null, 2), ctaKey: page.ctaKey ?? "",
    });
    const articleRow = articles.data?.find(item => item.pageId === page.id);
    setArticle(articleRow ? { id: articleRow.id, topic: articleRow.topic, tags: articleRow.tags.join(", "), authorBrokerId: articleRow.authorBrokerId ? String(articleRow.authorBrokerId) : "", publicationDate: localInput(articleRow.publicationDate), contentUpdatedDate: localInput(articleRow.contentUpdatedDate), featuredMediaId: articleRow.featuredMediaId ? String(articleRow.featuredMediaId) : "", sourceNotes: articleRow.sourceNotes ?? "" } : blankArticle);
  };

  const submit = async () => {
    setError(""); setSaved("");
    try {
      const sections = JSON.parse(form.sectionsText);
      const schemaJson = JSON.parse(form.schemaText || "{}");
      if (!Array.isArray(sections)) throw new Error("Sections must be a JSON array.");
      if (!schemaJson || Array.isArray(schemaJson) || typeof schemaJson !== "object") throw new Error("Schema JSON must be an object.");
      if (form.status === "scheduled" && !form.publishAt) throw new Error("Scheduled content needs a publication date and time.");
      const savedPage = await savePage.mutateAsync({
        id: form.id, pageType: form.pageType, slug: form.slug, title: form.title, eyebrow: nullable(form.eyebrow), excerpt: nullable(form.excerpt), sections,
        status: form.status, publishAt: form.publishAt ? new Date(form.publishAt) : null, indexable: form.indexable, seoTitle: nullable(form.seoTitle), metaDescription: nullable(form.metaDescription),
        canonicalUrl: nullable(form.canonicalUrl), ogTitle: nullable(form.ogTitle), ogDescription: nullable(form.ogDescription), ogImageUrl: nullable(form.ogImageUrl), schemaJson, ctaKey: nullable(form.ctaKey),
      });
      if (form.pageType === "article") {
        if (!article.topic.trim()) throw new Error("Article topic is required.");
        await saveArticle.mutateAsync({ id: article.id, pageId: savedPage.id, authorBrokerId: numberOrNull(article.authorBrokerId), publicationDate: article.publicationDate ? new Date(article.publicationDate) : null, contentUpdatedDate: article.contentUpdatedDate ? new Date(article.contentUpdatedDate) : null, featuredMediaId: numberOrNull(article.featuredMediaId), topic: article.topic, tags: article.tags.split(",").map(item => item.trim()).filter(Boolean), sourceNotes: nullable(article.sourceNotes) });
      }
      await Promise.all([utils.adminCms.pages.invalidate(), utils.adminCms.articles.invalidate()]);
      setForm(current => ({ ...current, id: savedPage.id }));
      setSaved(`Saved “${savedPage.title}” as ${savedPage.status}.`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The content record could not be saved.");
    }
  };

  return (
    <AdminScreen eyebrow="STRUCTURED CONTENT" intro="Create draft, scheduled, published or unpublished records. The public site only queries content that has reached its publication time." title="Content & publishing" actions={<button className="admin-button admin-button-secondary" onClick={() => { setForm(blankPage); setArticle(blankArticle); setError(""); setSaved(""); }} type="button"><Plus /> New record</button>}>
      <div className="admin-editor-layout">
        <AdminPanel intro="Select a record to edit. Coded launch pages remain intact until a CMS record is deliberately connected." title="Content records" className="admin-record-list-panel">
          {pageRows.length ? <div className="admin-record-list">{pageRows.map(page => <button className={form.id === page.id ? "is-active" : ""} key={page.id} onClick={() => editPage(page)} type="button"><div><strong>{page.title}</strong><span>/{page.slug} · {page.pageType}</span></div><StatusPill status={page.status} /></button>)}</div> : <EmptyState>No CMS records yet. Choose “New record” to start with an article, broker page, solution, loan type, location or standard page.</EmptyState>}
        </AdminPanel>

        <div className="space-y-6">
          <AdminPanel intro="Slug and page type create stable, exportable identities. Use the status controls to keep unfinished work out of public queries." title={form.id ? "Edit content record" : "New content record"}>
            <div className="admin-form-grid">
              <Field label="Page type"><select value={form.pageType} onChange={event => setForm({ ...form, pageType: event.target.value as PageType })}>{["article","solution","loan_type","location","broker","standard"].map(value => <option value={value} key={value}>{value.replace("_", " ")}</option>)}</select></Field>
              <Field label="Status"><select value={form.status} onChange={event => setForm({ ...form, status: event.target.value as PageStatus })}>{["draft","scheduled","published","unpublished"].map(value => <option value={value} key={value}>{value}</option>)}</select></Field>
              <Field label="Title" full><input value={form.title} onChange={event => setForm({ ...form, title: event.target.value })} /></Field>
              <Field label="Slug" hint="Lowercase words separated by hyphens."><input value={form.slug} onChange={event => setForm({ ...form, slug: event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })} /></Field>
              <Field label="Eyebrow"><input value={form.eyebrow} onChange={event => setForm({ ...form, eyebrow: event.target.value })} /></Field>
              <Field label="Excerpt" full><textarea rows={4} value={form.excerpt} onChange={event => setForm({ ...form, excerpt: event.target.value })} /></Field>
              <Field label="Publish date & time" hint="Required for scheduled content."><input type="datetime-local" value={form.publishAt} onChange={event => setForm({ ...form, publishAt: event.target.value })} /></Field>
              <Field label="CTA key"><input value={form.ctaKey} onChange={event => setForm({ ...form, ctaKey: event.target.value })} /></Field>
              <Field label="Search indexing" full><label className="admin-check"><input checked={form.indexable} onChange={event => setForm({ ...form, indexable: event.target.checked })} type="checkbox" /> Allow indexing when publicly published</label></Field>
              <Field label="Page sections (JSON)" hint={`${counts.sections} structured sections. Keep business content in explicit objects for clean export.`} full><textarea className="admin-code-field" rows={15} value={form.sectionsText} onChange={event => setForm({ ...form, sectionsText: event.target.value })} /></Field>
            </div>
          </AdminPanel>

          {form.pageType === "article" ? <AdminPanel intro="Article metadata remains separate from the reusable page content so it can be migrated cleanly." title="Article details"><div className="admin-form-grid">
            <Field label="Topic"><input value={article.topic} onChange={event => setArticle({ ...article, topic: event.target.value })} /></Field>
            <Field label="Tags" hint="Comma-separated."><input value={article.tags} onChange={event => setArticle({ ...article, tags: event.target.value })} /></Field>
            <Field label="Author"><select value={article.authorBrokerId} onChange={event => setArticle({ ...article, authorBrokerId: event.target.value })}><option value="">No linked broker</option>{brokers.data?.map(broker => <option key={broker.id} value={broker.id}>{broker.fullName}</option>)}</select></Field>
            <Field label="Featured media"><select value={article.featuredMediaId} onChange={event => setArticle({ ...article, featuredMediaId: event.target.value })}><option value="">No featured media</option>{media.data?.map(item => <option key={item.id} value={item.id}>{item.originalFilename}</option>)}</select></Field>
            <Field label="Publication date"><input type="datetime-local" value={article.publicationDate} onChange={event => setArticle({ ...article, publicationDate: event.target.value })} /></Field>
            <Field label="Content updated date"><input type="datetime-local" value={article.contentUpdatedDate} onChange={event => setArticle({ ...article, contentUpdatedDate: event.target.value })} /></Field>
            <Field label="Source and verification notes" hint="Internal only. Record sources for date-sensitive finance, policy, tax and market claims." full><textarea rows={5} value={article.sourceNotes} onChange={event => setArticle({ ...article, sourceNotes: event.target.value })} /></Field>
          </div></AdminPanel> : null}

          <AdminPanel intro="Titles and descriptions show practical warnings rather than silently truncating. Final search appearance is controlled by search engines." title="SEO & sharing"><div className="admin-form-grid">
            <Field label={`SEO title · ${counts.titles} characters`} hint={counts.titles < 40 || counts.titles > 65 ? "Review length: aim for a clear, distinctive title rather than keyword repetition." : "Length is within the working review range."} full><input value={form.seoTitle} onChange={event => setForm({ ...form, seoTitle: event.target.value })} placeholder={form.title} /></Field>
            <Field label={`Meta description · ${counts.description} characters`} hint={counts.description < 120 || counts.description > 165 ? "Review length: explain the page value and decision clearly." : "Length is within the working review range."} full><textarea rows={3} value={form.metaDescription} onChange={event => setForm({ ...form, metaDescription: event.target.value })} /></Field>
            <Field label="Canonical URL" full><input value={form.canonicalUrl} onChange={event => setForm({ ...form, canonicalUrl: event.target.value })} placeholder="Leave empty for the standard route canonical" /></Field>
            <Field label="Social title"><input value={form.ogTitle} onChange={event => setForm({ ...form, ogTitle: event.target.value })} /></Field>
            <Field label="Social image URL"><input value={form.ogImageUrl} onChange={event => setForm({ ...form, ogImageUrl: event.target.value })} /></Field>
            <Field label="Social description" full><textarea rows={3} value={form.ogDescription} onChange={event => setForm({ ...form, ogDescription: event.target.value })} /></Field>
            <Field label="Schema JSON" hint="Object only. Validate claims before publishing." full><textarea className="admin-code-field" rows={8} value={form.schemaText} onChange={event => setForm({ ...form, schemaText: event.target.value })} /></Field>
          </div></AdminPanel>

          <AdminPanel intro="This preview checks the editorial hierarchy inside the secure workspace. The whole project preview remains separate from the published deployment until you approve a checkpoint." title="Editor preview"><div className="admin-content-preview"><p>{form.eyebrow || "PAGE EYEBROW"}</p><h2>{form.title || "Untitled content record"}</h2><span>{form.excerpt || "Add a concise excerpt that explains the decision this page helps with."}</span><small>{counts.sections} structured sections · {form.status}</small></div></AdminPanel>

          {error ? <p className="admin-alert admin-alert-error" role="alert">{error}</p> : null}
          {saved ? <p className="admin-alert admin-alert-success" role="status">{saved}</p> : null}
          <div className="admin-save-bar"><button className="admin-button admin-button-primary" disabled={savePage.isPending || saveArticle.isPending} onClick={submit} type="button"><Save /> {savePage.isPending || saveArticle.isPending ? "Saving…" : "Save content"}</button>{form.slug ? <a className="admin-button admin-button-secondary" href={pagePath(form.pageType, form.slug)} rel="noreferrer" target="_blank">Open public route <ExternalLink /></a> : null}</div>
        </div>
      </div>

      <AdminPanel intro="Related records are explicit rather than hidden inside page copy, which keeps exports and future migrations understandable." title="Related-content links">
        <div className="admin-inline-form">
          <Field label="Source page"><select value={relation.sourcePageId} onChange={event => setRelation({ ...relation, sourcePageId: event.target.value })}><option value="">Choose source</option>{pageRows.map(page => <option key={page.id} value={page.id}>{page.title}</option>)}</select></Field>
          <Field label="Target page"><select value={relation.targetPageId} onChange={event => setRelation({ ...relation, targetPageId: event.target.value })}><option value="">Choose target</option>{pageRows.map(page => <option key={page.id} value={page.id}>{page.title}</option>)}</select></Field>
          <Field label="Relationship"><select value={relation.relationType} onChange={event => setRelation({ ...relation, relationType: event.target.value as typeof relation.relationType })}>{["related_article","related_service","related_location","related_solution"].map(value => <option value={value} key={value}>{value.replace("_", " ")}</option>)}</select></Field>
          <Field label="Order"><input min="0" type="number" value={relation.sortOrder} onChange={event => setRelation({ ...relation, sortOrder: event.target.value })} /></Field>
          <button className="admin-button admin-button-secondary" disabled={!relation.sourcePageId || !relation.targetPageId || saveRelation.isPending} onClick={() => saveRelation.mutate({ sourcePageId: Number(relation.sourcePageId), targetPageId: Number(relation.targetPageId), relationType: relation.relationType, sortOrder: Number(relation.sortOrder) })} type="button"><Link2 /> Add relationship</button>
        </div>
        {relations.data?.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Source</th><th>Relationship</th><th>Target</th><th>Order</th></tr></thead><tbody>{relations.data.map(row => <tr key={row.id}><td>{pageRows.find(page => page.id === row.sourcePageId)?.title ?? row.sourcePageId}</td><td>{row.relationType.replace("_", " ")}</td><td>{pageRows.find(page => page.id === row.targetPageId)?.title ?? row.targetPageId}</td><td>{row.sortOrder}</td></tr>)}</tbody></table></div> : <EmptyState>No explicit relationships yet.</EmptyState>}
      </AdminPanel>
    </AdminScreen>
  );
}

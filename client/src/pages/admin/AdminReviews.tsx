import { useState } from "react";
import { Plus, Save, ShieldCheck } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { AdminPanel, AdminScreen, EmptyState, Field, StatusPill, formatAdminDate } from "./AdminUi";

const blank = { id: undefined as number | undefined, source: "manual_approved" as "google_public" | "manual_approved", externalId: "", reviewerDisplayName: "", rating: "", reviewText: "", reviewDate: "", sourceUrl: "", serviceContext: "", placements: "reviews", active: false };
const nullable = (value: string) => value.trim() || null;

export default function AdminReviews() {
  const utils = trpc.useUtils(); const reviews = trpc.adminCms.reviews.useQuery();
  const [form, setForm] = useState(blank); const [message, setMessage] = useState("");
  const save = trpc.adminCms.saveReview.useMutation({ onSuccess: async row => { await utils.adminCms.reviews.invalidate(); setForm(current => ({ ...current, id: row.id })); setMessage(`Saved review attribution for ${row.reviewerDisplayName}.`); } });
  const edit = (row: NonNullable<typeof reviews.data>[number]) => setForm({ id: row.id, source: row.source, externalId: row.externalId ?? "", reviewerDisplayName: row.reviewerDisplayName, rating: row.rating ? String(row.rating) : "", reviewText: row.reviewText, reviewDate: row.reviewDate ? new Date(row.reviewDate).toISOString().slice(0, 10) : "", sourceUrl: row.sourceUrl ?? "", serviceContext: row.serviceContext ?? "", placements: row.placements.join(", "), active: row.active });
  return <AdminScreen eyebrow="VERIFIED PROOF ONLY" title="Reviews" intro="Store public-source reviews or business-supplied reviews only after attribution, wording, source and approval have been checked." actions={<button className="admin-button admin-button-secondary" onClick={() => { setForm(blank); setMessage(""); }}><Plus /> New review</button>}>
    <div className="admin-notice"><ShieldCheck /><div><strong>No invented reviews or ratings.</strong><p>Activating a record confirms that the exact wording and attribution are approved for public display. Google Public records need a real public source URL; this CMS never requests Business Profile owner access.</p></div></div>
    <div className="admin-editor-layout">
      <AdminPanel title="Review records" intro="Inactive records remain exportable but do not appear publicly." className="admin-record-list-panel">
        {reviews.data?.length ? <div className="admin-record-list">{reviews.data.map(row => <button className={form.id === row.id ? "is-active" : ""} onClick={() => edit(row)} key={row.id}><div><strong>{row.reviewerDisplayName}</strong><span>{row.source.replace("_", " ")} · {formatAdminDate(row.reviewDate)}</span></div><StatusPill status={row.active ? "active" : "inactive"} /></button>)}</div> : <EmptyState>No review content has been supplied or approved.</EmptyState>}
      </AdminPanel>
      <AdminPanel title={form.id ? "Edit verified review" : "New review record"} intro="Keep source detail with the content so future platforms can reproduce the proof system safely.">
        <div className="admin-form-grid">
          <Field label="Source"><select value={form.source} onChange={event => setForm({ ...form, source: event.target.value as typeof form.source })}><option value="manual_approved">Business supplied & approved</option><option value="google_public">Google public source</option></select></Field>
          <Field label="External ID"><input value={form.externalId} onChange={event => setForm({ ...form, externalId: event.target.value })} /></Field>
          <Field label="Reviewer display name"><input value={form.reviewerDisplayName} onChange={event => setForm({ ...form, reviewerDisplayName: event.target.value })} /></Field>
          <Field label="Rating"><select value={form.rating} onChange={event => setForm({ ...form, rating: event.target.value })}><option value="">No rating supplied</option>{[1,2,3,4,5].map(value => <option key={value} value={value}>{value} / 5</option>)}</select></Field>
          <Field label="Exact review text" full><textarea rows={8} value={form.reviewText} onChange={event => setForm({ ...form, reviewText: event.target.value })} /></Field>
          <Field label="Review date"><input type="date" value={form.reviewDate} onChange={event => setForm({ ...form, reviewDate: event.target.value })} /></Field>
          <Field label="Service context"><input value={form.serviceContext} onChange={event => setForm({ ...form, serviceContext: event.target.value })} placeholder="e.g. First home, business finance" /></Field>
          <Field label="Public source URL" full><input value={form.sourceUrl} onChange={event => setForm({ ...form, sourceUrl: event.target.value })} /></Field>
          <Field label="Placements" hint="Comma-separated placement keys." full><input value={form.placements} onChange={event => setForm({ ...form, placements: event.target.value })} /></Field>
          <Field label="Public state" full><label className="admin-check"><input checked={form.active} onChange={event => setForm({ ...form, active: event.target.checked })} type="checkbox" /> Exact wording, attribution and source are approved for public display</label></Field>
        </div>
        {save.error ? <p className="admin-alert admin-alert-error">{save.error.message}</p> : null}{message ? <p className="admin-alert admin-alert-success">{message}</p> : null}
        <button className="admin-button admin-button-primary mt-6" disabled={save.isPending} onClick={() => save.mutate({ id: form.id, source: form.source, externalId: nullable(form.externalId), reviewerDisplayName: form.reviewerDisplayName, rating: form.rating ? Number(form.rating) : null, reviewText: form.reviewText, reviewDate: form.reviewDate ? new Date(`${form.reviewDate}T12:00:00`) : null, sourceUrl: nullable(form.sourceUrl), serviceContext: nullable(form.serviceContext), placements: form.placements.split(",").map(item => item.trim()).filter(Boolean), active: form.active, approvedByUserId: null })}><Save /> {save.isPending ? "Saving…" : "Save review"}</button>
      </AdminPanel>
    </div>
  </AdminScreen>;
}


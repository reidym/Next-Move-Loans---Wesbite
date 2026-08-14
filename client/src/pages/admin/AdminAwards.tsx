import { useState } from "react";
import { Plus, Save } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { AdminPanel, AdminScreen, EmptyState, Field, StatusPill } from "./AdminUi";

const blank = { id: undefined as number | undefined, awardingBody: "", awardName: "", category: "", year: String(new Date().getFullYear()), recognitionLevel: "Finalist", mediaId: "", sourceUrl: "", active: false, displayOrder: "0" };
const nullable = (value: string) => value.trim() || null;

export default function AdminAwards() {
  const utils = trpc.useUtils(); const awards = trpc.adminCms.awards.useQuery(); const media = trpc.adminCms.media.useQuery();
  const [form, setForm] = useState(blank); const [message, setMessage] = useState("");
  const save = trpc.adminCms.saveAward.useMutation({ onSuccess: async row => { await Promise.all([utils.adminCms.awards.invalidate(), utils.publicContent.awards.invalidate()]); setForm(current => ({ ...current, id: row.id })); setMessage(`Saved ${row.year} ${row.awardName}.`); } });
  const edit = (row: NonNullable<typeof awards.data>[number]) => setForm({ id: row.id, awardingBody: row.awardingBody, awardName: row.awardName, category: row.category, year: String(row.year), recognitionLevel: row.recognitionLevel, mediaId: row.mediaId ? String(row.mediaId) : "", sourceUrl: row.sourceUrl ?? "", active: row.active, displayOrder: String(row.displayOrder) });
  return <AdminScreen eyebrow="VERIFIED RECOGNITION" title="Awards" intro="Manage exact awarding bodies, years, categories, recognition levels and supplied badge media without turning finalist recognition into an implied win." actions={<button className="admin-button admin-button-secondary" onClick={() => { setForm(blank); setMessage(""); }}><Plus /> New award</button>}>
    <div className="admin-editor-layout"><AdminPanel title="Award records" intro="Display order controls the homepage proof band." className="admin-record-list-panel">{awards.data?.length ? <div className="admin-record-list">{awards.data.map(row => <button className={form.id === row.id ? "is-active" : ""} key={row.id} onClick={() => edit(row)}><div><strong>{row.awardName}</strong><span>{row.year} · {row.category}</span></div><StatusPill status={row.active ? "active" : "inactive"} /></button>)}</div> : <EmptyState>No award records.</EmptyState>}</AdminPanel>
      <AdminPanel title={form.id ? "Edit recognition" : "New recognition"} intro="Use the wording printed by the awarding body. A finalist must never be described as a winner."><div className="admin-form-grid">
        <Field label="Awarding body"><input value={form.awardingBody} onChange={event => setForm({ ...form, awardingBody: event.target.value })} /></Field><Field label="Award name"><input value={form.awardName} onChange={event => setForm({ ...form, awardName: event.target.value })} /></Field>
        <Field label="Category" full><input value={form.category} onChange={event => setForm({ ...form, category: event.target.value })} /></Field><Field label="Year"><input min="2000" max="2100" type="number" value={form.year} onChange={event => setForm({ ...form, year: event.target.value })} /></Field>
        <Field label="Recognition level"><input value={form.recognitionLevel} onChange={event => setForm({ ...form, recognitionLevel: event.target.value })} /></Field><Field label="Badge media"><select value={form.mediaId} onChange={event => setForm({ ...form, mediaId: event.target.value })}><option value="">No badge</option>{media.data?.map(item => <option key={item.id} value={item.id}>{item.originalFilename}</option>)}</select></Field>
        <Field label="Display order"><input type="number" value={form.displayOrder} onChange={event => setForm({ ...form, displayOrder: event.target.value })} /></Field><Field label="Source URL"><input value={form.sourceUrl} onChange={event => setForm({ ...form, sourceUrl: event.target.value })} /></Field>
        <Field label="Public state" full><label className="admin-check"><input checked={form.active} onChange={event => setForm({ ...form, active: event.target.checked })} type="checkbox" /> Display this verified recognition publicly</label></Field>
      </div>{save.error ? <p className="admin-alert admin-alert-error">{save.error.message}</p> : null}{message ? <p className="admin-alert admin-alert-success">{message}</p> : null}<button className="admin-button admin-button-primary mt-6" disabled={save.isPending} onClick={() => save.mutate({ id: form.id, awardingBody: form.awardingBody, awardName: form.awardName, category: form.category, year: Number(form.year), recognitionLevel: form.recognitionLevel, mediaId: form.mediaId ? Number(form.mediaId) : null, sourceUrl: nullable(form.sourceUrl), active: form.active, displayOrder: Number(form.displayOrder) })}><Save /> {save.isPending ? "Saving…" : "Save award"}</button></AdminPanel>
    </div>
  </AdminScreen>;
}


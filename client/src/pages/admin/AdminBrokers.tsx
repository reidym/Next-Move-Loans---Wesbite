import { useState } from "react";
import { Plus, Save } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { AdminPanel, AdminScreen, EmptyState, Field, StatusPill } from "./AdminUi";

const blank = { id: undefined as number | undefined, pageId: "", fullName: "", roleTitle: "", biography: "", qualifications: "", expertise: "", serviceAreas: "", phone: "", email: "", bookingUrl: "", profileMediaId: "", active: true };
const split = (value: string) => value.split(/\n|,/).map(item => item.trim()).filter(Boolean);
const nullable = (value: string) => value.trim() || null;

export default function AdminBrokers() {
  const utils = trpc.useUtils();
  const brokers = trpc.adminCms.brokers.useQuery();
  const pages = trpc.adminCms.pages.useQuery();
  const media = trpc.adminCms.media.useQuery();
  const [form, setForm] = useState(blank);
  const [message, setMessage] = useState("");
  const save = trpc.adminCms.saveBroker.useMutation({ onSuccess: async record => { await utils.adminCms.brokers.invalidate(); setForm(current => ({ ...current, id: record.id })); setMessage(`Saved ${record.fullName}.`); } });

  const edit = (row: NonNullable<typeof brokers.data>[number]) => setForm({ id: row.id, pageId: String(row.pageId), fullName: row.fullName, roleTitle: row.roleTitle, biography: row.biography, qualifications: row.qualifications.join("\n"), expertise: row.expertise.join("\n"), serviceAreas: row.serviceAreas.join("\n"), phone: row.phone ?? "", email: row.email ?? "", bookingUrl: row.bookingUrl ?? "", profileMediaId: row.profileMediaId ? String(row.profileMediaId) : "", active: row.active });

  return <AdminScreen eyebrow="REUSABLE PEOPLE DATA" intro="Broker details live once in structured records so biographies, contact details and author relationships do not drift across pages." title="Brokers" actions={<button className="admin-button admin-button-secondary" onClick={() => { setForm(blank); setMessage(""); }}><Plus /> New broker</button>}>
    <div className="admin-editor-layout">
      <AdminPanel title="Broker records" intro="Deactivation removes a profile from public CMS queries without deleting its history." className="admin-record-list-panel">
        {brokers.data?.length ? <div className="admin-record-list">{brokers.data.map(row => <button className={form.id === row.id ? "is-active" : ""} key={row.id} onClick={() => edit(row)}><div><strong>{row.fullName}</strong><span>{row.roleTitle}</span></div><StatusPill status={row.active ? "active" : "inactive"} /></button>)}</div> : <EmptyState>No broker records yet. Create a page of type “broker” first, then link the profile here.</EmptyState>}
      </AdminPanel>
      <AdminPanel title={form.id ? "Edit broker" : "New broker"} intro="Qualifications and expertise are line-separated, exportable lists rather than display-only prose.">
        <div className="admin-form-grid">
          <Field label="Linked broker page"><select value={form.pageId} onChange={event => setForm({ ...form, pageId: event.target.value })}><option value="">Choose a broker page</option>{pages.data?.filter(page => page.pageType === "broker").map(page => <option key={page.id} value={page.id}>{page.title}</option>)}</select></Field>
          <Field label="Profile media"><select value={form.profileMediaId} onChange={event => setForm({ ...form, profileMediaId: event.target.value })}><option value="">No profile image</option>{media.data?.map(item => <option key={item.id} value={item.id}>{item.originalFilename}</option>)}</select></Field>
          <Field label="Full name"><input value={form.fullName} onChange={event => setForm({ ...form, fullName: event.target.value })} /></Field>
          <Field label="Role title"><input value={form.roleTitle} onChange={event => setForm({ ...form, roleTitle: event.target.value })} /></Field>
          <Field label="Biography" full><textarea rows={8} value={form.biography} onChange={event => setForm({ ...form, biography: event.target.value })} /></Field>
          <Field label="Qualifications" hint="One per line."><textarea rows={6} value={form.qualifications} onChange={event => setForm({ ...form, qualifications: event.target.value })} /></Field>
          <Field label="Expertise" hint="One per line."><textarea rows={6} value={form.expertise} onChange={event => setForm({ ...form, expertise: event.target.value })} /></Field>
          <Field label="Service areas" hint="One per line."><textarea rows={6} value={form.serviceAreas} onChange={event => setForm({ ...form, serviceAreas: event.target.value })} /></Field>
          <Field label="Phone"><input value={form.phone} onChange={event => setForm({ ...form, phone: event.target.value })} /></Field>
          <Field label="Email"><input type="email" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} /></Field>
          <Field label="Booking URL" full><input value={form.bookingUrl} onChange={event => setForm({ ...form, bookingUrl: event.target.value })} /></Field>
          <Field label="Public state" full><label className="admin-check"><input checked={form.active} type="checkbox" onChange={event => setForm({ ...form, active: event.target.checked })} /> Profile can appear in public CMS queries</label></Field>
        </div>
        {save.error ? <p className="admin-alert admin-alert-error">{save.error.message}</p> : null}{message ? <p className="admin-alert admin-alert-success">{message}</p> : null}
        <button className="admin-button admin-button-primary mt-6" disabled={!form.pageId || save.isPending} onClick={() => save.mutate({ id: form.id, pageId: Number(form.pageId), fullName: form.fullName, roleTitle: form.roleTitle, biography: form.biography, qualifications: split(form.qualifications), expertise: split(form.expertise), serviceAreas: split(form.serviceAreas), phone: nullable(form.phone), email: nullable(form.email), bookingUrl: nullable(form.bookingUrl), profileMediaId: form.profileMediaId ? Number(form.profileMediaId) : null, active: form.active })}><Save /> {save.isPending ? "Saving…" : "Save broker"}</button>
      </AdminPanel>
    </div>
  </AdminScreen>;
}


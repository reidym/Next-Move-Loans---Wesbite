import { Download, ExternalLink, Mail, Phone, Trash2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { AdminPanel, AdminScreen, EmptyState, StatusPill, formatAdminDate } from "./AdminUi";

const downloadJson = (filename: string, value: unknown) => {
  const url = URL.createObjectURL(new Blob([JSON.stringify(value, null, 2)], { type: "application/json" }));
  const anchor = document.createElement("a");
  anchor.href = url; anchor.download = filename; anchor.click(); URL.revokeObjectURL(url);
};

export default function AdminLeads() {
  const utils = trpc.useUtils();
  const leads = trpc.adminCms.leads.useQuery();
  const update = trpc.adminCms.updateLeadStatus.useMutation({ onSuccess: () => void utils.adminCms.leads.invalidate() });
  const exportLead = trpc.adminCms.exportLead.useMutation({ onSuccess: data => downloadJson(`next-move-loans-lead-${data.lead.id}.json`, data) });
  const deleteLead = trpc.adminCms.deleteLead.useMutation({ onSuccess: () => void utils.adminCms.leads.invalidate() });

  const remove = (id: number, name: string) => {
    if (window.confirm(`Permanently delete the saved enquiry for ${name}? Export it first if the business needs a privacy-request record.`)) deleteLead.mutate({ id, confirm: "DELETE" });
  };

  return <AdminScreen eyebrow="LIGHT ENQUIRIES" title="Lead inbox" intro="Triage contact requests without collecting financial documents. Sensitive credit information should move into the business’s approved secure process after contact.">
    <AdminPanel title="Enquiries" intro="Delivery status records whether email notification is configured. Administrators can export one person’s record for an access request or permanently delete it for an approved erasure request.">{leads.data?.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Contact</th><th>Enquiry</th><th>Message</th><th>Received</th><th>Delivery</th><th>Status</th><th>Privacy</th></tr></thead><tbody>{leads.data.map(lead => <tr key={lead.id}><td><strong>{lead.name}</strong><div className="admin-contact-links"><a href={`mailto:${lead.email}`}><Mail />{lead.email}</a><a href={`tel:${lead.mobile.replace(/\s/g, "")}`}><Phone />{lead.mobile}</a></div></td><td>{lead.enquiryType}<a className="admin-source-path" href={lead.sourcePath} rel="noreferrer" target="_blank">{lead.sourcePath}<ExternalLink /></a></td><td>{lead.message || "No optional message"}</td><td>{formatAdminDate(lead.createdAt)}</td><td><StatusPill status={lead.deliveryStatus} /></td><td><select aria-label={`Status for ${lead.name}`} value={lead.internalStatus} onChange={event => update.mutate({ id: lead.id, internalStatus: event.target.value as "new" | "contacted" | "closed" | "archived" })}><option value="new">new</option><option value="contacted">contacted</option><option value="closed">closed</option><option value="archived">archived</option></select></td><td><div className="admin-privacy-actions"><button aria-label={`Export ${lead.name} lead data`} onClick={() => exportLead.mutate({ id: lead.id })} title="Export this person’s data" type="button"><Download /></button><button aria-label={`Delete ${lead.name} lead data`} className="danger" onClick={() => remove(lead.id, lead.name)} title="Permanently delete this enquiry" type="button"><Trash2 /></button></div></td></tr>)}</tbody></table></div> : <EmptyState>No enquiries submitted.</EmptyState>}</AdminPanel>
  </AdminScreen>;
}


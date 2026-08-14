import { Link } from "wouter";
import { Award, Download, FileText, Inbox, MessageSquareQuote, Settings } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { AdminPanel, AdminScreen, EmptyState, StatusPill, formatAdminDate } from "./AdminUi";

export default function AdminOverview() {
  const pages = trpc.adminCms.pages.useQuery();
  const reviews = trpc.adminCms.reviews.useQuery();
  const awards = trpc.adminCms.awards.useQuery();
  const leads = trpc.adminCms.leads.useQuery();

  const metrics = [
    [FileText, "Content records", pages.data?.length ?? 0, "/admin/content"],
    [MessageSquareQuote, "Approved reviews", reviews.data?.filter(item => item.active).length ?? 0, "/admin/reviews"],
    [Award, "Active awards", awards.data?.filter(item => item.active).length ?? 0, "/admin/awards"],
    [Inbox, "New leads", leads.data?.filter(item => item.internalStatus === "new").length ?? 0, "/admin/leads"],
  ] as const;
  const recentPages = pages.data?.slice(0, 5) ?? [];
  const recentLeads = leads.data?.slice(0, 5) ?? [];

  return (
    <AdminScreen eyebrow="NEXT MOVE CMS" intro="Manage public content, verified proof, enquiries, settings and portable exports from one authenticated workspace." title="Content operations">
      <div className="admin-metric-grid">
        {metrics.map(([Icon, label, value, href]) => <Link className="admin-metric" href={href} key={label}><Icon aria-hidden="true" /><span>{label}</span><strong>{value}</strong></Link>)}
      </div>
      <div className="admin-two-col">
        <AdminPanel intro="Most recently changed structured pages." title="Recent content">
          {recentPages.length ? <div className="admin-list">{recentPages.map(page => <Link href="/admin/content" key={page.id}><div><strong>{page.title}</strong><span>/{page.slug} · {formatAdminDate(page.updatedAt)}</span></div><StatusPill status={page.status} /></Link>)}</div> : <EmptyState>No CMS content records yet. The coded public pages remain live while records are added deliberately.</EmptyState>}
        </AdminPanel>
        <AdminPanel intro="Light enquiries only; no financial documents are collected." title="Recent enquiries">
          {recentLeads.length ? <div className="admin-list">{recentLeads.map(lead => <Link href="/admin/leads" key={lead.id}><div><strong>{lead.name}</strong><span>{lead.enquiryType} · {formatAdminDate(lead.createdAt)}</span></div><StatusPill status={lead.internalStatus} /></Link>)}</div> : <EmptyState>No enquiries have been submitted.</EmptyState>}
        </AdminPanel>
      </div>
      <AdminPanel intro="These controls keep marketing setup and future migration visible rather than hidden in code." title="Operations shortcuts">
        <div className="admin-shortcuts"><Link href="/admin/settings"><Settings />Review website settings</Link><Link href="/admin/export"><Download />Export all structured content</Link><Link href="/"><FileText />Open the public preview</Link></div>
      </AdminPanel>
    </AdminScreen>
  );
}


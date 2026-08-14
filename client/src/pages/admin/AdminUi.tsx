import type { ReactNode } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import "@/admin.css";

export function AdminScreen({ eyebrow, title, intro, actions, children }: { eyebrow: string; title: string; intro: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <DashboardLayout>
      <div className="admin-page">
        <header className="admin-page-header">
          <div><p>{eyebrow}</p><h1>{title}</h1><span>{intro}</span></div>
          {actions ? <div className="admin-page-actions">{actions}</div> : null}
        </header>
        {children}
      </div>
    </DashboardLayout>
  );
}

export function AdminPanel({ title, intro, children, className = "" }: { title: string; intro?: string; children: ReactNode; className?: string }) {
  return <section className={`admin-panel ${className}`}><div className="admin-panel-heading"><h2>{title}</h2>{intro ? <p>{intro}</p> : null}</div>{children}</section>;
}

export function Field({ label, hint, children, full = false }: { label: string; hint?: string; children: ReactNode; full?: boolean }) {
  return <label className={`admin-field ${full ? "admin-field-full" : ""}`}><span>{label}</span>{children}{hint ? <small>{hint}</small> : null}</label>;
}

export function StatusPill({ status }: { status: string }) {
  return <span className={`admin-status admin-status-${status.replaceAll("_", "-")}`}>{status.replaceAll("_", " ")}</span>;
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <div className="admin-empty">{children}</div>;
}

export function formatAdminDate(value: Date | string | null | undefined) {
  if (!value) return "Not set";
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.valueOf()) ? "Not set" : date.toLocaleString("en-AU", { dateStyle: "medium", timeStyle: "short" });
}

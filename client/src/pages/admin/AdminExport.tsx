import { useState } from "react";
import { Database, Download, FileJson, Github } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { AdminPanel, AdminScreen } from "./AdminUi";

const downloadJson = (filename: string, value: unknown) => {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = filename; anchor.click(); URL.revokeObjectURL(url);
};

export default function AdminExport() {
  const query = trpc.adminCms.exportContent.useQuery(undefined, { enabled: false }); const [message, setMessage] = useState("");
  const load = async () => { const result = await query.refetch(); if (!result.data) throw new Error("Export could not be prepared."); return result.data; };
  const fullExport = async () => { try { const data = await load(); downloadJson(`next-move-loans-content-${new Date().toISOString().slice(0,10)}.json`, data); setMessage("Full structured-content export downloaded."); } catch (caught) { setMessage(caught instanceof Error ? caught.message : "Export failed."); } };
  const mediaManifest = async () => { try { const data = await load(); downloadJson(`next-move-loans-media-manifest-${new Date().toISOString().slice(0,10)}.json`, { format: "next-move-loans-media-manifest", version: data.version, exportedAt: data.exportedAt, media: data.content.mediaManifest }); setMessage("Media manifest with related-content usage downloaded."); } catch (caught) { setMessage(caught instanceof Error ? caught.message : "Export failed."); } };
  return <AdminScreen eyebrow="PORTABILITY" title="Export & ownership" intro="Download vendor-neutral records and media references at any time. Keep the code in a private repository and the business content readable outside this application.">
    <div className="admin-export-grid"><AdminPanel title="Full CMS export" intro="Pages, article metadata, brokers, reviews, awards, locations, reusable blocks, relationships, media records and non-secret settings."><FileJson className="admin-export-icon" /><button className="admin-button admin-button-primary" disabled={query.isFetching} onClick={fullExport}><Download /> Download full JSON export</button></AdminPanel><AdminPanel title="Media manifest" intro="Original filename, storage key, URL, MIME type, dimensions, alternative text, caption, credit and timestamps."><Database className="admin-export-icon" /><button className="admin-button admin-button-secondary" disabled={query.isFetching} onClick={mediaManifest}><Download /> Download media manifest</button></AdminPanel><AdminPanel title="Private GitHub repository" intro="Connect the intended GitHub owner from project settings when you are ready. Keep unfinished work in preview and push only reviewed checkpoints."><Github className="admin-export-icon" /><p className="mt-5 leading-7 text-[#4C5566]">The repository should include application code, migrations, schema, tests, seed scripts and documentation—but no environment secrets or exported lead data.</p></AdminPanel></div>
    {query.error ? <p className="admin-alert admin-alert-error">{query.error.message}</p> : null}{message ? <p className="admin-alert admin-alert-success">{message}</p> : null}
  </AdminScreen>;
}

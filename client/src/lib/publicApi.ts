import { useEffect, useState } from "react";
import type { CmsArticleRow } from "@/lib/cmsContent";

export type AwardRow = { award: { id: number; awardingBody: string; awardName: string; category: string; year: number; recognitionLevel: string }; media: { altText: string | null; publicUrl: string } | null };
export type ReviewRow = { id: number; reviewerDisplayName: string; rating: number | null; reviewText: string; reviewDate: Date | string | null; sourceUrl: string | null; serviceContext: string | null; placements: string[] };
export type PublicSettingRow = { settingKey: string; valueText: string | null; valueJson: unknown };
export type { CmsArticleRow };

export function usePublicData<T>(path: string) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    fetch(path, { credentials: "same-origin", signal: controller.signal })
      .then(async response => { if (!response.ok) throw new Error(`Request failed: ${response.status}`); return response.json() as Promise<T>; })
      .then(setData)
      .catch(reason => { if (reason?.name !== "AbortError") setError(reason instanceof Error ? reason : new Error("Request failed")); })
      .finally(() => { if (!controller.signal.aborted) setIsLoading(false); });
    return () => controller.abort();
  }, [path]);
  return { data, error, isLoading };
}

export async function submitPublicLead(payload: Record<string, unknown>) {
  const response = await fetch("/api/public/leads", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  const result = await response.json() as { success?: boolean; reference?: string; ownerNotified?: boolean; emailDelivery?: "not_configured"; error?: string };
  if (!response.ok || !result.success || !result.reference) throw new Error(result.error || "The enquiry could not be saved.");
  return result as { success: true; reference: string; ownerNotified: boolean; emailDelivery: "not_configured" };
}


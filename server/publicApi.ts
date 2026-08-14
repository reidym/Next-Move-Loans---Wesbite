import type { Express, Request, Response } from "express";
import { listActiveAwards, listActiveReviews, listPublicArticles, listPublicSettings } from "./cmsDb";
import { LeadSubmissionError, leadInput, submitLead } from "./leadService";

const send = async (res: Response, operation: () => Promise<unknown>) => {
  try { res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=300"); res.json(await operation()); }
  catch (error) { console.error("[Public API]", error); res.status(500).json({ error: "Public content is temporarily unavailable." }); }
};

export function registerPublicApi(app: Express) {
  app.get("/api/public/awards", (_req, res) => send(res, listActiveAwards));
  app.get("/api/public/articles", (_req, res) => send(res, listPublicArticles));
  app.get("/api/public/reviews", (req, res) => {
    const placement = typeof req.query.placement === "string" ? req.query.placement.slice(0, 80) : undefined;
    return send(res, () => listActiveReviews(placement));
  });
  app.get("/api/public/settings/:group", (req, res) => {
    const group = req.params.group;
    if (group !== "public" && group !== "analytics") return res.status(404).json({ error: "Unknown settings group." });
    return send(res, () => listPublicSettings(group));
  });
  app.post("/api/public/leads", async (req: Request, res: Response) => {
    const parsed = leadInput.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Please check the required fields and try again." });
    try { res.setHeader("Cache-Control", "no-store"); return res.json(await submitLead(parsed.data, req)); }
    catch (error) {
      if (error instanceof LeadSubmissionError) return res.status(error.statusCode).json({ error: error.message });
      console.error("[Lead API]", error); return res.status(500).json({ error: "The enquiry could not be saved. Please call the team directly." });
    }
  });
}


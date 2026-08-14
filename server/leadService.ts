import type { Request } from "express";
import { z } from "zod";
import { notifyOwner } from "./_core/notification";
import { createLead, updateLeadDeliveryStatus } from "./cmsDb";
import { canAcceptLeadAttempt, deliverLeadEmail, getLeadEmailConfiguration, isLeadSubmissionTooFast, recentLeadAttempts } from "./leadDelivery";

const leadAttempts = new Map<string, number[]>();

export const leadInput = z.object({
  name: z.string().trim().min(2).max(180),
  email: z.string().trim().email().max(320),
  mobile: z.string().trim().min(8).max(40),
  enquiryType: z.string().trim().min(2).max(160),
  message: z.string().trim().max(2000).optional(),
  sourcePath: z.string().trim().min(1).max(512),
  website: z.string().max(0).optional(),
  startedAt: z.number().int().positive(),
});

export class LeadSubmissionError extends Error {
  constructor(message: string, public statusCode = 400) { super(message); }
}

export async function submitLead(input: z.infer<typeof leadInput>, req: Request) {
  const { website: _honeypot, startedAt, ...lead } = input;
  const now = Date.now();
  if (isLeadSubmissionTooFast(startedAt, now)) throw new LeadSubmissionError("Please take a moment to review the form before sending it.");
  const forwarded = req.headers["x-forwarded-for"];
  const clientKey = (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0])?.trim() || req.ip || "unknown";
  const attempts = recentLeadAttempts(leadAttempts.get(clientKey) ?? [], now);
  if (!canAcceptLeadAttempt(attempts, now)) throw new LeadSubmissionError("Too many enquiries were sent from this connection. Please call the team or try again later.", 429);
  leadAttempts.set(clientKey, [...attempts, now]);
  const emailConfiguration = getLeadEmailConfiguration();
  const initialDeliveryStatus = emailConfiguration.configured ? "pending" : "not_configured";
  const result = await createLead({ ...lead, deliveryStatus: initialDeliveryStatus, internalStatus: "new" });
  const reference = `NML-${result.id}`;
  const emailResult = await deliverLeadEmail({ reference, ...lead }, emailConfiguration);
  if (emailResult.status !== initialDeliveryStatus) await updateLeadDeliveryStatus(result.id, emailResult.status);
  const ownerNotified = await notifyOwner({
    title: "New Next Move Loans website enquiry",
    content: `Reference ${reference}\nName: ${lead.name}\nEmail: ${lead.email}\nMobile: ${lead.mobile}\nEnquiry: ${lead.enquiryType}\nSource: ${lead.sourcePath}\nEmail delivery: ${emailResult.status}\n\n${lead.message || "No optional message supplied."}`,
  });
  return { success: true, reference, ownerNotified, emailDelivery: emailResult.status };
}

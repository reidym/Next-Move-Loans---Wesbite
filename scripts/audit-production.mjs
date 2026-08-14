import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { load } from "cheerio";

const baseUrl = process.argv[2] || "http://127.0.0.1:4173";
const outputDir = "qa";
const representativeRoutes = [
  "/", "/solutions/purchase", "/solutions/buying-your-next-home", "/loan-types", "/services/refinancing", "/learn", "/learn/topics/refinancing", "/learn/rate-hold-is-not-the-decision", "/locations/leongatha", "/team/martin-reidy", "/reviews", "/plan-your-next-move", "/book-a-call", "/privacy", "/admin",
];
const utilityRoutes = ["/contact", "/about", "/team", "/locations", "/important-information", "/privacy", "/credit-guide", "/accessibility", "/calculators", "/plan-your-next-move", "/book-a-call", "/reviews", "/admin"];

const render = path => execFileSync("/usr/bin/chromium", ["--headless", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage", "--run-all-compositor-stages-before-draw", "--virtual-time-budget=3500", "--dump-dom", `${baseUrl}${path}`], { encoding: "utf8", maxBuffer: 25 * 1024 * 1024, timeout: 45_000 });
const normalizePath = href => {
  try { const url = new URL(href, baseUrl); return url.origin === new URL(baseUrl).origin ? `${url.pathname}${url.search}` : undefined; }
  catch { return undefined; }
};

const sitemapXml = await fetch(`${baseUrl}/sitemap.xml`).then(response => response.text());
const sitemapPaths = [...sitemapXml.matchAll(/<loc>https:\/\/nextmoveloans\.com\.au([^<]*)<\/loc>/g)].map(match => match[1] || "/");
const knownPaths = new Set([...sitemapPaths, ...utilityRoutes]);
const pageReports = [];
const allInternalLinks = new Set();
const allImages = new Set();
const titles = new Map();
const descriptions = new Map();

for (const path of representativeRoutes) {
  const response = await fetch(`${baseUrl}${path}`, { redirect: "manual" });
  let html = "";
  let renderError;
  try { html = render(path); } catch (error) { renderError = error instanceof Error ? error.message : String(error); }
  const $ = load(html);
  const title = $("title").text().trim();
  const description = $('meta[name="description"]').attr("content")?.trim() || "";
  const canonical = $('link[rel="canonical"]').attr("href") || "";
  const robots = $('meta[name="robots"]').attr("content") || "";
  const h1Count = $("h1").length;
  const jsonLd = $('script[type="application/ld+json"]').map((_, element) => $(element).html() || "").get();
  const jsonLdErrors = jsonLd.map(value => { try { JSON.parse(value); return undefined; } catch (error) { return error instanceof Error ? error.message : String(error); } }).filter(Boolean);
  const imagesMissingAlt = $("img").filter((_, element) => $(element).attr("alt") === undefined).length;
  $("a[href]").each((_, element) => { const normalized = normalizePath($(element).attr("href") || ""); if (normalized) allInternalLinks.add(normalized.split("#")[0] || "/"); });
  $("img[src]").each((_, element) => { const source = $(element).attr("src"); if (source) allImages.add(new URL(source, baseUrl).toString()); });
  const form = $("form");
  const requiredFormCheck = path === "/plan-your-next-move" ? { forms: form.length, honeypot: form.find('input[name="website"]').length, consent: form.find('input[type="checkbox"][required]').length, namedInputs: form.find("input[name], select[name], textarea[name]").length } : undefined;
  const page = { path, status: response.status, renderError, title, description, canonical, robots, h1Count, jsonLdCount: jsonLd.length, jsonLdErrors, images: $("img").length, imagesMissingAlt, form: requiredFormCheck };
  const canonicalPass = path === "/" ? ["https://nextmoveloans.com.au", "https://nextmoveloans.com.au/"].includes(canonical) : canonical.startsWith("https://nextmoveloans.com.au/");
  const indexControlPass = path === "/admin" ? robots.includes("noindex") : canonicalPass;
  page.pass = response.status === 200 && !renderError && Boolean(title) && Boolean(description) && h1Count === 1 && jsonLdErrors.length === 0 && imagesMissingAlt === 0 && indexControlPass;
  pageReports.push(page);
  if (title) titles.set(title, [...(titles.get(title) || []), path]);
  if (description) descriptions.set(description, [...(descriptions.get(description) || []), path]);
}

const unknownInternalLinks = [...allInternalLinks].filter(path => !knownPaths.has(path) && !path.startsWith("/api/") && path !== "/404");
const brokenImages = [];
for (const image of allImages) {
  const response = await fetch(image, { redirect: "follow" }).catch(() => undefined);
  if (!response?.ok) brokenImages.push({ url: image, status: response?.status ?? 0 });
}
const headerResponse = await fetch(`${baseUrl}/`);
const headerChecks = {
  contentSecurityPolicy: headerResponse.headers.get("content-security-policy"),
  referrerPolicy: headerResponse.headers.get("referrer-policy"),
  permissionsPolicy: headerResponse.headers.get("permissions-policy"),
  contentTypeOptions: headerResponse.headers.get("x-content-type-options"),
  transportSecurity: headerResponse.headers.get("strict-transport-security"),
};
const duplicateTitles = [...titles].filter(([, paths]) => paths.length > 1);
const duplicateDescriptions = [...descriptions].filter(([, paths]) => paths.length > 1);
const report = { generatedAt: new Date().toISOString(), baseUrl, representativeRoutes: pageReports, sitemapUrlCount: sitemapPaths.length, internalLinkCount: allInternalLinks.size, unknownInternalLinks, imageCount: allImages.size, brokenImages, duplicateTitles, duplicateDescriptions, headerChecks };
report.pass = pageReports.every(page => page.pass) && unknownInternalLinks.length === 0 && brokenImages.length === 0 && duplicateTitles.length === 0 && duplicateDescriptions.length === 0 && Boolean(headerChecks.contentSecurityPolicy && headerChecks.referrerPolicy && headerChecks.permissionsPolicy && headerChecks.contentTypeOptions && headerChecks.transportSecurity);

mkdirSync(outputDir, { recursive: true });
writeFileSync(`${outputDir}/production-audit.json`, JSON.stringify(report, null, 2));
const rows = pageReports.map(page => `| ${page.path} | ${page.pass ? "PASS" : "FIX"} | ${page.status} | ${page.h1Count} | ${page.jsonLdCount} | ${page.imagesMissingAlt} |`).join("\n");
writeFileSync(`${outputDir}/production-audit.md`, `# Automated production route audit\n\nGenerated ${report.generatedAt}.\n\n| Route | Result | HTTP | H1 | JSON-LD | Missing alt |\n| --- | --- | ---: | ---: | ---: | ---: |\n${rows}\n\n## Cross-route checks\n\n| Check | Result |\n| --- | --- |\n| Sitemap URLs | ${report.sitemapUrlCount} |\n| Internal links inspected | ${report.internalLinkCount} |\n| Unknown internal links | ${report.unknownInternalLinks.length} |\n| Image sources inspected | ${report.imageCount} |\n| Broken images | ${report.brokenImages.length} |\n| Duplicate titles | ${report.duplicateTitles.length} |\n| Duplicate descriptions | ${report.duplicateDescriptions.length} |\n| Security headers | ${Object.values(report.headerChecks).every(Boolean) ? "PASS" : "FIX"} |\n\nOverall: **${report.pass ? "PASS" : "FIX"}**.\n`);
console.log(JSON.stringify({ pass: report.pass, routes: pageReports.length, failedRoutes: pageReports.filter(page => !page.pass).map(page => page.path), sitemapUrlCount: report.sitemapUrlCount, unknownInternalLinks, brokenImages, duplicateTitles, duplicateDescriptions, headerChecks }, null, 2));
if (!report.pass) process.exitCode = 1;

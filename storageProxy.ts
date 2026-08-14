import type { Express } from "express";
import { Readable } from "node:stream";
import { ENV } from "./env";

export function registerStorageProxy(app: Express) {
  app.get("/manus-storage/*", async (req, res) => {
    const key = (req.params as Record<string, string>)[0];
    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }

    if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
      res.status(500).send("Storage proxy not configured");
      return;
    }

    try {
      const forgeUrl = new URL(
        "v1/storage/presign/get",
        ENV.forgeApiUrl.replace(/\/+$/, "") + "/",
      );
      forgeUrl.searchParams.set("path", key);

      const forgeResp = await fetch(forgeUrl, {
        headers: { Authorization: `Bearer ${ENV.forgeApiKey}` },
      });

      if (!forgeResp.ok) {
        const body = await forgeResp.text().catch(() => "");
        console.error(`[StorageProxy] forge error: ${forgeResp.status} ${body}`);
        res.status(502).send("Storage backend error");
        return;
      }

      const { url } = (await forgeResp.json()) as { url: string };
      if (!url) {
        res.status(502).send("Empty signed URL from backend");
        return;
      }

      const upstream = await fetch(url);
      if (!upstream.ok || !upstream.body) {
        console.error(`[StorageProxy] upstream fetch failed: ${upstream.status}`);
        res.status(502).send("Storage object fetch error");
        return;
      }

      // Every uploaded key gets a random content-hash suffix at upload time
      // (see appendHashSuffix in storage.ts), so a given /manus-storage/<key>
      // is immutable -- the same key never changes content. That makes it
      // safe to cache aggressively same-origin.
      //
      // This route previously issued a 307 redirect straight to the
      // short-lived signed S3 URL with `Cache-Control: no-store`. That forced
      // every image request -- including the preloaded, fetchpriority="high"
      // hero image on every single page view -- through a full extra hop (a
      // second DNS/TLS handshake to the storage host) with no caching
      // whatsoever, which was a direct contributor to LCP sitting close to
      // the 2.5s "good" boundary. Streaming the bytes back same-origin with a
      // long-lived immutable cache header instead means the browser fetches
      // it once and reuses it from cache on every later view.
      const contentType = upstream.headers.get("content-type");
      if (contentType) res.set("Content-Type", contentType);
      const contentLength = upstream.headers.get("content-length");
      if (contentLength) res.set("Content-Length", contentLength);
      const etag = upstream.headers.get("etag");
      if (etag) res.set("ETag", etag);
      res.set("Cache-Control", "public, max-age=31536000, immutable");

      Readable.fromWeb(upstream.body as import("node:stream/web").ReadableStream).pipe(res);
    } catch (err) {
      console.error("[StorageProxy] failed:", err);
      res.status(502).send("Storage proxy error");
    }
  });
}

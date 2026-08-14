import type { NextFunction, Request, Response } from "express";

export function buildSecurityHeaders(isProduction: boolean) {
  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'self' https://*.manus.im https://*.manus.com",
    "form-action 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net https://manus-analytics.com https://*.manus.im",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "img-src 'self' data: blob: https://*.cloudfront.net https://*.amazonaws.com https://images.unsplash.com https://www.googletagmanager.com https://www.facebook.com https://*.manus.im",
    "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://connect.facebook.net https://manus-analytics.com https://*.manus.im",
    "frame-src https://calendly.com",
    ...(isProduction ? ["upgrade-insecure-requests"] : []),
  ];
  return {
    "Content-Security-Policy": directives.join("; "),
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "X-Content-Type-Options": "nosniff",
    "X-Permitted-Cross-Domain-Policies": "none",
    "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    ...(isProduction ? { "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload" } : {}),
  };
}

export function securityHeaders(req: Request, res: Response, next: NextFunction) {
  Object.entries(buildSecurityHeaders(process.env.NODE_ENV === "production")).forEach(([key, value]) => res.setHeader(key, value));
  next();
}

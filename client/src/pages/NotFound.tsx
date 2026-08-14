/** Pathfinder Editorial 404: a useful recovery path, not a dead-end error screen. */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { SiteLayout } from "@/components/SiteChrome";

export default function NotFound() {
  return (
    <SiteLayout>
      <Seo description="The requested page could not be found." noIndex path="/404" title="Page Not Found | Next Move Loans" />
      <main className="not-found" id="main-content">
        <div className="container grid gap-10 py-20 lg:grid-cols-[0.4fr_1.6fr] lg:items-end lg:py-28">
          <span className="not-found-number">404</span>
          <div>
            <p className="eyebrow text-[#9A6F00]"><span aria-hidden="true" className="eyebrow-line" />PATH RECALCULATION</p>
            <h1>That route does not lead anywhere yet.</h1>
            <p>The page may have moved, the link may be incomplete, or the next move is still being built.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="button button-coral" href="/">Return Home<ArrowRight aria-hidden="true" className="size-4" /></Link>
              <Link className="button button-outline-dark" href="/plan-your-next-move">Plan Your Next Move</Link>
            </div>
          </div>
        </div>
      </main>
    </SiteLayout>
  );
}

/**
 * Pathfinder Editorial chrome: warm paper navigation, decisive coral action, dark-blue footer,
 * and compact information architecture that reveals depth without making the header feel crowded.
 */

import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { assets, contactDetails, navGroups, solutionHubs } from "@/lib/siteData";

const activeClass = "text-[#EC7354]";

function DesktopNavigation({ location }: { location: string }) {
  return (
    <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
      {navGroups.map((group) => (
        <div className="group relative" key={group.label}>
          <button
            className={`nav-trigger ${group.links.some(([, href]) => location.startsWith(href)) ? activeClass : ""}`}
            type="button"
          >
            {group.label}
            <ChevronDown aria-hidden="true" className="size-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
          </button>
          <div className="nav-flyout invisible absolute left-0 top-full z-50 min-w-72 translate-y-2 opacity-0 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
            <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#9A6F00]">Choose a path</p>
            {group.links.map(([label, href]) => (
              <Link className="nav-flyout-link" href={href} key={href}>
                <span>{label}</span>
                <ArrowUpRight aria-hidden="true" className="size-4 text-[#EC7354]" />
              </Link>
            ))}
          </div>
        </div>
      ))}
      <Link className={`nav-trigger ${location.startsWith("/learn") ? activeClass : ""}`} href="/learn">
        Learn
      </Link>
      <Link className={`nav-trigger ${location.startsWith("/locations") ? activeClass : ""}`} href="/locations">
        Locations
      </Link>
    </nav>
  );
}

function MobileNavigation({ open, close }: { open: boolean; close: () => void }) {
  if (!open) return null;

  return (
    <div className="mobile-nav-panel lg:hidden">
      <nav aria-label="Mobile navigation" className="container py-6">
        <div className="grid gap-7 md:grid-cols-3">
          {navGroups.map((group) => (
            <section key={group.label}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#C3A342]">{group.label}</p>
              <div className="grid gap-1.5">
                {group.links.map(([label, href]) => (
                  <Link className="mobile-nav-link" href={href} key={href} onClick={close}>
                    {label}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
        <div className="mt-6 grid gap-2 border-t border-white/15 pt-5 sm:grid-cols-2">
          <Link className="mobile-nav-link" href="/learn" onClick={close}>Learning Centre <ArrowUpRight aria-hidden="true" className="size-4" /></Link>
          <Link className="mobile-nav-link" href="/locations" onClick={close}>Locations <ArrowUpRight aria-hidden="true" className="size-4" /></Link>
        </div>
        <div className="mt-7 grid gap-3 border-t border-white/15 pt-6 sm:grid-cols-2">
          <Link className="button button-coral" href="/plan-your-next-move" onClick={close}>
            Plan Your Next Move
          </Link>
          <a className="button button-outline-light" href={contactDetails.landlineHref} onClick={close}>
            <Phone aria-hidden="true" className="size-4" /> {contactDetails.landlineDisplay}
          </a>
        </div>
      </nav>
    </div>
  );
}

export function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
      <div className="container flex h-[4.9rem] items-center justify-between gap-5">
        <Link aria-label="Next Move Loans home" className="shrink-0" href="/">
          <img alt="Next Move Loans" className="h-auto w-[164px] md:w-[188px]" decoding="async" height={305} src={assets.logo} width={1200} />
        </Link>
        <DesktopNavigation location={location} />
        <div className="hidden items-center gap-3 lg:flex">
          <a className="text-link inline-flex items-center gap-2" href={contactDetails.landlineHref}>
            <Phone aria-hidden="true" className="size-4" /> {contactDetails.landlineDisplay}
          </a>
          <Link className="button button-coral button-small" href="/plan-your-next-move">
            Plan Your Next Move
          </Link>
        </div>
        <button
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="menu-button lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <MobileNavigation close={() => setOpen(false)} open={open} />
    </header>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#16203A] text-[#F7F5F1]">
      <div aria-hidden="true" className="absolute -right-14 top-10 size-64 rounded-full border border-[#EC7354]/25" />
      <div aria-hidden="true" className="absolute -right-4 top-20 size-44 rounded-full border border-[#C3A342]/25" />
      <div className="container relative py-16 lg:py-20">
        <div className="grid gap-12 border-b border-white/15 pb-14 lg:grid-cols-[1.15fr_1.85fr]">
          <div>
            <img alt="Next Move Loans" className="h-auto w-[220px]" decoding="async" height={305} loading="lazy" src={assets.logoReversed} width={1200} />
            <p className="mt-6 max-w-md text-lg leading-8 text-white/72">
              Everyone’s building something. We create clarity, build the strategy and help finance the move.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="button button-coral" href="/plan-your-next-move">
                Plan Your Next Move
              </Link>
              <a className="button button-outline-light" href={contactDetails.landlineHref}>
                <Phone aria-hidden="true" className="size-4" /> {contactDetails.landlineDisplay}
              </a>
            </div>
          </div>
          <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="footer-heading">Solutions</p>
              <div className="grid gap-2.5">
                {solutionHubs.map((solution) => (
                  <Link className="footer-link" href={solution.path} key={solution.id}>
                    {solution.title}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="footer-heading">Explore</p>
              <div className="grid gap-2.5">
                <Link className="footer-link" href="/approval-method">The Approval Method™</Link>
                <Link className="footer-link" href="/about">About</Link>
                <Link className="footer-link" href="/team/martin-reidy">Meet Marty</Link>
                <Link className="footer-link" href="/reviews">Awards & Reviews</Link>
                <Link className="footer-link" href="/learn">Learning Centre</Link>
                <Link className="footer-link" href="/locations">Locations</Link>
              </div>
            </div>
            <div>
              <p className="footer-heading">Contact</p>
              <div className="grid gap-2.5">
                <a className="footer-link" href={contactDetails.landlineHref}>{contactDetails.landlineDisplay}</a>
                <a className="footer-link" href={contactDetails.mobileHref}>{contactDetails.mobileDisplay}</a>
                <a className="footer-link" href={contactDetails.emailHref}>{contactDetails.email}</a>
                <span className="text-sm leading-6 text-white/55">{contactDetails.address}</span>
                <Link className="footer-link mt-2" href="/important-information">Important Information</Link>
                <Link className="footer-link" href="/privacy">Privacy</Link>
                <Link className="footer-link" href="/contact">Contact</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-5 pt-7 text-sm leading-6 text-white/55 md:grid-cols-[1fr_auto]">
          <p>
            Credit representative, licence, aggregator, commission, complaints and final contact details are awaiting confirmation before launch.
          </p>
          <p>© {new Date().getFullYear()} Next Move Loans.</p>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  return (
    <div className="min-h-screen overflow-clip bg-[#F7F5F1] text-[#16203A]">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header />
      {children}
      <Footer />
      <div className="mobile-action-bar lg:hidden">
        <Link className="mobile-action-primary" href="/plan-your-next-move">Plan Your Move</Link>
        <a className="mobile-action-secondary" href={contactDetails.landlineHref}>
          <Phone aria-hidden="true" className="size-4" /> Call
        </a>
      </div>
    </div>
  );
}

/**
 * Pathfinder Editorial primitives: offset headings, route markers, purposeful arrows, and
 * restrained panels that turn information hierarchy into a visible path through the page.
 */

import type { ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Circle } from "lucide-react";
import { contactDetails } from "@/lib/siteData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { approvalSteps } from "@/lib/siteData";

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`eyebrow ${light ? "text-[#C3A342]" : "text-[#6F4D00]"}`}>
      <span aria-hidden="true" className="eyebrow-line" />
      {children}
    </p>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  body,
  index,
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  index?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-intro ${light ? "text-[#F7F5F1]" : "text-[#16203A]"}`}>
      {index ? <span className={`section-index ${light ? "text-white/28" : "text-[#16203A]/18"}`}>{index}</span> : null}
      <div>
        <Eyebrow light={light}>{eyebrow}</Eyebrow>
        <h2 className="section-title">{title}</h2>
        {body ? <div className={`section-body ${light ? "text-white/68" : "text-[#4C5566]"}`}>{body}</div> : null}
      </div>
    </div>
  );
}

export function ArrowLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <Link className={`arrow-link ${light ? "arrow-link-light" : ""}`} href={href}>
      <span>{children}</span>
      <ArrowRight aria-hidden="true" className="size-5" />
    </Link>
  );
}

export function ProcessPath({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={`process-path ${compact ? "process-path-compact" : ""}`}>
      {approvalSteps.map((step, index) => (
        <li className="process-step" key={step.number}>
          <div className="process-node" aria-hidden="true">
            <span>{step.number}</span>
            {index < approvalSteps.length - 1 ? <span className="process-connector" /> : null}
          </div>
          <div>
            <h3>{step.title}</h3>
            <p>{step.short}</p>
            {!compact ? <span className="process-question">{step.question}</span> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Checklist({ items, light = false }: { items: string[]; light?: boolean }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li className={`flex items-start gap-3 leading-7 ${light ? "text-white/75" : "text-[#4C5566]"}`} key={item}>
          <span className={`mt-1 grid size-5 shrink-0 place-items-center rounded-full ${light ? "bg-[#EC7354] text-white" : "bg-[#EC7354]/12 text-[#EC7354]"}`}>
            <Check aria-hidden="true" className="size-3.5" strokeWidth={3} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function QuestionsBand({ questions }: { questions: string[] }) {
  return (
    <div className="question-band">
      <p className="question-band-label">Questions worth asking</p>
      <div className="grid gap-3 lg:grid-cols-3">
        {questions.map((question) => (
          <div className="question-band-item" key={question}>
            <Circle aria-hidden="true" className="mt-1 size-3.5 shrink-0 fill-[#EC7354] text-[#EC7354]" />
            <p>{question}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FaqBlock({ items }: { items: Array<{ question: string; answer: string }> }) {
  return (
    <Accordion className="faq-block" collapsible type="single">
      {items.map((item, index) => (
        <AccordionItem className="faq-item" key={item.question} value={`item-${index}`}>
          <AccordionTrigger className="faq-trigger">{item.question}</AccordionTrigger>
          <AccordionContent className="faq-content">{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function EditorialCard({
  eyebrow,
  title,
  body,
  href,
  image,
  number,
}: {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  image?: string;
  number?: string;
}) {
  return (
    <Link className="editorial-card group" href={href}>
      {image ? (
        <div className="editorial-card-image">
          <img alt="" loading="lazy" src={image} />
          <div className="editorial-card-overlay" />
        </div>
      ) : null}
      <div className="editorial-card-body">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.19em] text-[#9A6F00]">{eyebrow}</p>
          {number ? <span className="text-sm font-semibold text-[#EC7354]">{number}</span> : null}
        </div>
        <h3>{title}</h3>
        <p>{body}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-[#16203A]">
          Explore the path
          <ArrowUpRight aria-hidden="true" className="size-4 text-[#EC7354] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function FinalCta({
  title = "What are you building?",
  body = "Bring the half-formed idea. We’ll help you turn it into a clearer plan.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="final-cta">
      <div className="container relative grid gap-9 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <Eyebrow light>YOUR NEXT MOVE</Eyebrow>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Link className="button button-coral" href="/plan-your-next-move">Plan Your Next Move</Link>
          <a className="button button-outline-light" href={contactDetails.discoveryCall} rel="noreferrer" target="_blank">Book a Discovery Call</a>
        </div>
      </div>
    </section>
  );
}

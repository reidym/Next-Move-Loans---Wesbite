import { ExternalLink, Star } from "lucide-react";
import { Eyebrow } from "@/components/Shared";
import { usePublicData, type ReviewRow } from "@/lib/publicApi";

export function ReviewProof({ placement, compact = false }: { placement?: string; compact?: boolean }) {
  const query = placement ? `?placement=${encodeURIComponent(placement)}` : "";
  const reviews = usePublicData<ReviewRow[]>(`/api/public/reviews${query}`);
  if (!reviews.data?.length) return null;
  return <section className={`review-proof-section ${compact ? "review-proof-compact" : ""}`}><div className="container"><div className="compact-section-heading"><div><Eyebrow light>APPROVED CLIENT VOICES</Eyebrow><h2>Real words. Source attached.</h2></div><p>Only reviews with approved wording, attribution and a recorded source can appear here.</p></div><div className="review-proof-grid">{reviews.data.map(review => <article className="review-proof-card" key={review.id}>{review.rating ? <div aria-label={`${review.rating} out of 5 stars`} className="review-rating">{Array.from({ length: review.rating }, (_, index) => <Star aria-hidden="true" fill="currentColor" key={index} />)}</div> : null}<blockquote>{review.reviewText}</blockquote><footer><strong>{review.reviewerDisplayName}</strong>{review.serviceContext ? <span>{review.serviceContext}</span> : null}{review.sourceUrl ? <a href={review.sourceUrl} rel="noreferrer" target="_blank">View public source <ExternalLink /></a> : <span>Business supplied & approved</span>}</footer></article>)}</div></div></section>;
}


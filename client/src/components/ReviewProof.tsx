import { ExternalLink, Star } from "lucide-react";
import { usePublicData, type ReviewRow } from "@/lib/publicApi";

export function ReviewProof({ placement, compact = false }: { placement?: string; compact?: boolean }) {
  const query = placement ? `?placement=${encodeURIComponent(placement)}` : "";
  const reviews = usePublicData<ReviewRow[]>(`/api/public/reviews${query}`);
  if (!reviews.data?.length) return null;
  const visible = compact ? reviews.data.slice(0, 2) : reviews.data;
  if (compact) return <div className="container py-6"><div className="grid gap-3 md:grid-cols-[auto_1fr_1fr] md:items-stretch"><div className="flex items-center gap-3 rounded-xl border border-[#16203A]/10 bg-white px-5 py-4"><div className="flex text-[#C38B00]">{Array.from({length:5},(_,i)=><Star key={i} className="size-4" fill="currentColor"/>)}</div><div><p className="font-black text-[#16203A]">Client reviews</p><a className="text-sm font-semibold text-[#EC7354]" href="/reviews">Read more</a></div></div>{visible.map(review=><article className="rounded-xl border border-[#16203A]/10 bg-white px-5 py-4" key={review.id}><blockquote className="line-clamp-2 text-sm leading-6 text-[#4C5566]">“{review.reviewText}”</blockquote><div className="mt-2 flex items-center justify-between gap-3 text-xs"><strong className="text-[#16203A]">{review.reviewerDisplayName}</strong>{review.sourceUrl?<a aria-label="View review source" href={review.sourceUrl} rel="noreferrer" target="_blank"><ExternalLink className="size-3.5 text-[#EC7354]"/></a>:null}</div></article>)}</div></div>;
  return <section className="review-proof-section"><div className="container"><div className="review-proof-grid">{visible.map(review=><article className="review-proof-card" key={review.id}>{review.rating?<div className="review-rating">{Array.from({length:review.rating},(_,i)=><Star fill="currentColor" key={i}/>)}</div>:null}<blockquote>{review.reviewText}</blockquote><footer><strong>{review.reviewerDisplayName}</strong></footer></article>)}</div></div></section>;
}

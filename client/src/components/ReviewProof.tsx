import { ExternalLink, Star } from "lucide-react";
import { usePublicData, type ReviewRow } from "@/lib/publicApi";

export function ReviewProof({ placement, compact = false }: { placement?: string; compact?: boolean }) {
  const query = placement ? `?placement=${encodeURIComponent(placement)}` : "";
  const reviews = usePublicData<ReviewRow[]>(`/api/public/reviews${query}`);
  if (!reviews.data?.length) return null;

  if (compact) {
    const visible = reviews.data.slice(0, 3);
    return (
      <section className="border-y border-[#16203A]/10 bg-white py-5">
        <div className="container grid gap-4 lg:grid-cols-[auto_1fr] lg:items-center">
          <div className="flex items-center gap-3 whitespace-nowrap pr-2">
            <div className="flex text-[#EC7354]">{Array.from({ length: 5 }, (_, i) => <Star className="size-4" fill="currentColor" key={i} />)}</div>
            <div><p className="font-black text-[#16203A]">Client reviews</p><p className="text-xs text-[#667080]">Real clients. Real experiences.</p></div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {visible.map(review => (
              <article className="border-l-2 border-[#EC7354] pl-4" key={review.id}>
                <blockquote className="line-clamp-2 text-sm leading-6 text-[#4C5566]">“{review.reviewText}”</blockquote>
                <div className="mt-1 flex items-center gap-2 text-xs font-bold text-[#16203A]">
                  <span>{review.reviewerDisplayName}</span>
                  {review.sourceUrl ? <a aria-label="View review source" href={review.sourceUrl} rel="noreferrer" target="_blank"><ExternalLink className="size-3" /></a> : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-10 lg:py-14">
      <div className="container grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reviews.data.map(review => (
          <article className="rounded-2xl border border-[#16203A]/10 p-6" key={review.id}>
            {review.rating ? <div className="flex text-[#EC7354]">{Array.from({ length: review.rating }, (_, index) => <Star className="size-4" fill="currentColor" key={index} />)}</div> : null}
            <blockquote className="mt-4 leading-7 text-[#4C5566]">“{review.reviewText}”</blockquote>
            <footer className="mt-4 text-sm"><strong className="text-[#16203A]">{review.reviewerDisplayName}</strong>{review.serviceContext ? <span className="ml-2 text-[#667080]">{review.serviceContext}</span> : null}</footer>
          </article>
        ))}
      </div>
    </section>
  );
}

export interface ReviewEntry {
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified?: boolean;
}

export interface ReviewsWidgetProps {
  rating: number;
  reviewCount: number;
  distribution?: { star: number; pct: number }[];
  topReviews?: ReviewEntry[];
  affiliateUrl: string;
}

export function ReviewsWidget({
  rating,
  reviewCount,
  distribution = [
    { star: 5, pct: 68 },
    { star: 4, pct: 18 },
    { star: 3, pct: 8 },
    { star: 2, pct: 4 },
    { star: 1, pct: 2 },
  ],
  topReviews = [],
  affiliateUrl,
}: ReviewsWidgetProps) {
  return (
    <section className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Cosa dicono i clienti
          </h2>
          <p className="text-sm text-neutral-600 mt-1">
            Basato su {reviewCount.toLocaleString("it-IT")} recensioni verificate Amazon
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-amazon-500 text-white font-bold text-2xl px-3 py-1.5 rounded-lg leading-none">
            {rating.toFixed(1)}
            <span className="text-base">★</span>
          </div>
          <div>
            <div className="text-amber-500 text-lg leading-none">★★★★★</div>
            <div className="text-xs text-neutral-500 mt-1">
              {Math.round(reviewCount * 0.68).toLocaleString("it-IT")} clienti soddisfatti
            </div>
          </div>
        </div>
      </header>

      <div className="grid sm:grid-cols-5 gap-2">
        {distribution.map((d) => (
          <div key={d.star} className="flex items-center gap-2 text-xs">
            <span className="w-6 text-neutral-600 font-medium">{d.star}★</span>
            <div className="flex-1 h-2 bg-neutral-100 rounded overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded transition-all"
                style={{ width: `${d.pct}%` }}
                role="progressbar"
                aria-valuenow={d.pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${d.star} stelle: ${d.pct}%`}
              />
            </div>
            <span className="w-9 text-right text-neutral-500 tabular-nums">
              {d.pct}%
            </span>
          </div>
        ))}
      </div>

      {topReviews.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {topReviews.map((r, i) => (
            <article
              key={i}
              className="bg-neutral-50 rounded-xl p-4 border border-neutral-100 space-y-2"
            >
              <header className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-900">
                  {r.author}
                </span>
                <span className="text-neutral-500">{r.date}</span>
              </header>
              <div className="flex items-center gap-1 text-amber-500 text-sm">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <span key={idx}>★</span>
                ))}
              </div>
              <h3 className="font-bold text-sm text-neutral-900 leading-snug">
                {r.title}
              </h3>
              <p className="text-xs text-neutral-700 leading-relaxed line-clamp-4">
                {r.body}
              </p>
              {r.verified && (
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-semibold">
                  ✓ Acquisto verificato
                </span>
              )}
            </article>
          ))}
        </div>
      )}

      <footer className="text-center pt-2">
        <a
          href={affiliateUrl}
          target="_blank"
          rel="sponsored nofollow noopener"
          className="text-sm font-semibold text-amazon-600 hover:text-amazon-700 underline"
        >
          Leggi tutte le {reviewCount.toLocaleString("it-IT")} recensioni su Amazon ↗
        </a>
      </footer>
    </section>
  );
}

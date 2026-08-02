import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { getAllArticles } from "@/lib/blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://robotaspirapolvere.pro";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Guide e recensioni robot aspirapolvere 2026",
  description:
    "Guide acquisto, recensioni approfondite e confronti tra i migliori robot aspirapolvere del 2026. Aggiornato ogni settimana.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Guide e recensioni robot aspirapolvere 2026",
    description:
      "Guide acquisto, recensioni approfondite e confronti tra i migliori robot aspirapolvere del 2026.",
    type: "website",
    url: `${SITE_URL}/blog`,
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guide e recensioni robot aspirapolvere 2026",
    description:
      "Guide acquisto, recensioni approfondite e confronti tra i migliori robot aspirapolvere del 2026.",
    images: [`${SITE_URL}/og-default.png`],
  },
};

export default async function BlogIndex() {
  const articles = getAllArticles();
  const products = await getAllProducts();
  return (
    <article className="container-tight py-8 sm:py-12 max-w-5xl space-y-10">
      <header className="space-y-3">
        <div className="text-xs uppercase tracking-wider text-amazon-700 font-bold">
          Guide acquisto 2026
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
          Blog: recensioni e guide robot aspirapolvere
        </h1>
        <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
          Confronti onesti, recensioni dopo 90 giorni di test reale e guide
          acquisto per scegliere il robot aspirapolvere giusto per la tua casa.
        </p>
      </header>

      <ul className="grid sm:grid-cols-2 gap-5">
        {articles.map((a) => {
          const related = a.relatedSlugs
            .map((s) => products.find((p) => p.slug === s))
            .filter((p): p is NonNullable<typeof p> => Boolean(p));
          return (
            <li key={a.slug}>
              <Link
                href={`/blog/${a.slug}`}
                className="block bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 hover:border-amazon-300 hover:shadow-md transition-all h-full"
              >
                <div className="text-xs uppercase tracking-wider text-amazon-700 font-semibold">
                  {new Date(a.publishedAt).toLocaleDateString("it-IT", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  · {a.readingMinutes} min lettura
                </div>
                <h2 className="text-xl sm:text-2xl font-bold mt-2 text-neutral-900 leading-snug">
                  {a.title}
                </h2>
                <p className="text-sm text-neutral-700 mt-2 leading-relaxed">
                  {a.description}
                </p>
                {related.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {related.slice(0, 2).map((p) => (
                      <span
                        key={p.slug}
                        className="inline-block bg-amazon-50 text-amazon-700 text-[11px] font-semibold px-2 py-1 rounded"
                      >
                        {p.brand} {p.name.split(" ").slice(-2).join(" ")}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

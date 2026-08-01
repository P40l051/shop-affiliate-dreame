import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllProducts } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://robotaspirapolvere.pro";

export const revalidate = 86400;

export async function generateStaticParams() {
  const all = await getAllProducts();
  const brands = Array.from(new Set(all.map((p) => p.brand.toLowerCase())));
  return brands.map((brand) => ({ brand }));
}

function brandSlug(brand: string): string {
  return brand.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function generateMetadata({
  params,
}: {
  params: { brand: string };
}): Promise<Metadata> {
  const all = await getAllProducts();
  const matched = all.find((p) => brandSlug(p.brand) === params.brand);
  if (!matched) return { title: "Brand non trovato" };
  const others = all.filter((p) => brandSlug(p.brand) === params.brand);
  return {
    title: `Robot aspirapolvere ${matched.brand} 2026 — ${others.length} modelli a confronto`,
    description: `Scopri tutti i robot aspirapolvere ${matched.brand} disponibili su Amazon.it nel 2026: prezzi, recensioni e confronto modelli.`,
    alternates: { canonical: `${SITE_URL}/brand/${params.brand}` },
  };
}

export default async function BrandPage({
  params,
}: {
  params: { brand: string };
}) {
  const all = await getAllProducts();
  const matched = all.filter((p) => brandSlug(p.brand) === params.brand);
  if (matched.length === 0) notFound();
  const brandName = matched[0].brand;
  const cheapest = matched.reduce((a, b) => (a.priceEur <= b.priceEur ? a : b));
  const topRated = matched.reduce((a, b) => (a.rating >= b.rating ? a : b));

  return (
    <article className="container-tight py-8 sm:py-12 max-w-5xl space-y-10">
      <nav aria-label="Breadcrumb" className="text-xs text-neutral-500">
        <ol className="flex gap-1 flex-wrap">
          <li>
            <Link href="/" className="hover:text-amazon-600">Home</Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/blog" className="hover:text-amazon-600">Blog</Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-neutral-700 font-semibold">Brand {brandName}</li>
        </ol>
      </nav>

      <header className="space-y-3">
        <div className="text-xs uppercase tracking-wider text-amazon-700 font-bold">
          Brand · {matched.length} {matched.length === 1 ? "modello" : "modelli"}
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
          Robot aspirapolvere {brandName} 2026
        </h1>
        <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
          {brandName} è {matched.length === 1 ? "un brand emergente" : "uno dei brand leader"} nel segmento robot aspirapolvere.{" "}
          {matched.length > 1 && (
            <>
              Prezzo da <strong className="text-amazon-600">{formatPrice(cheapest.priceEur)}</strong>{" "}
              · Modello top-rated: <strong>{topRated.name}</strong> con {topRated.rating.toFixed(1)}/5 su {topRated.reviewCount.toLocaleString("it-IT")} recensioni.
            </>
          )}
        </p>
      </header>

      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {matched.map((p) => (
          <li key={p.asin}>
            <Link
              href={`/prodotto/${p.slug}`}
              className="block bg-white rounded-2xl border border-neutral-200 p-5 hover:border-amazon-300 hover:shadow-md transition-all h-full"
            >
              <div className="relative aspect-square bg-neutral-50 rounded-xl mb-4 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-contain p-3"
                />
              </div>
              <div className="text-xs uppercase text-neutral-500 tracking-wider">
                {p.brand}
              </div>
              <h2 className="font-bold text-base sm:text-lg mt-1 leading-snug">
                {p.name}
              </h2>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-xl font-extrabold text-amazon-600">
                  {formatPrice(p.priceEur)}
                </span>
                {p.priceRrpEur > p.priceEur && (
                  <span className="text-sm text-neutral-400 line-through">
                    {formatPrice(p.priceRrpEur)}
                  </span>
                )}
              </div>
              <div className="text-xs text-neutral-600 mt-1">
                {p.rating.toFixed(1)} ★ · {p.reviewCount.toLocaleString("it-IT")} recensioni
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getProductBySlug,
  type ProductFull,
} from "@/lib/products";
import { AffiliateButton } from "@/components/AffiliateButton";
import { formatPrice, humanizeKey } from "@/lib/utils";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://robotaspirapolvere.pro";

export const revalidate = 86400;

export async function generateStaticParams() {
  const all = await getAllProducts();
  const pairs: { a: string; b: string }[] = [];
  for (let i = 0; i < all.length; i++) {
    for (let j = i + 1; j < all.length; j++) {
      pairs.push({ a: all[i].slug, b: all[j].slug });
    }
  }
  return pairs;
}

export async function generateMetadata({
  params,
}: {
  params: { a: string; b: string };
}): Promise<Metadata> {
  const [pa, pb] = await Promise.all([
    getProductBySlug(params.a),
    getProductBySlug(params.b),
  ]);
  if (!pa || !pb) return { title: "Confronto non trovato" };
  const title = `${pa.name} vs ${pb.name}: confronto, differenze e prezzo 2026`;
  const description = `Confronto diretto ${pa.name} vs ${pb.name}: potenza, stazione, prezzo (${formatPrice(pa.priceEur)} vs ${formatPrice(pb.priceEur)}) e recensioni. Scopri quale scegliere nel 2026.`;
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/confronto/${pa.slug}/vs/${pb.slug}`,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: `${SITE_URL}/confronto/${pa.slug}/vs/${pb.slug}`,
      images: [pa.imageUrl, pb.imageUrl].filter(Boolean).map((url) => ({
        url: url as string,
        width: 1200,
        height: 630,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function specUnion(a: ProductFull, b: ProductFull): string[] {
  const keys = new Set<string>([
    ...Object.keys(a.specs),
    ...Object.keys(b.specs),
  ]);
  return Array.from(keys);
}

export default async function ConfrontoPage({
  params,
}: {
  params: { a: string; b: string };
}) {
  const [pa, pb] = await Promise.all([
    getProductBySlug(params.a),
    getProductBySlug(params.b),
  ]);
  if (!pa || !pb) notFound();

  const bySlug = (name: string) =>
    name === pa.slug ? pa : name === pb.slug ? pb : undefined;
  const featured = [pa, pb].sort((x, y) => x.priceEur - y.priceEur);
  const winner =
    pa.rating * 0.6 + Math.min(1, pa.reviewCount / 3000) * 0.4 >=
    pb.rating * 0.6 + Math.min(1, pb.reviewCount / 3000) * 0.4
      ? pa
      : pb;
  const loser = winner.slug === pa.slug ? pb : pa;

  const specKeys = specUnion(pa, pb);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Confronto ${pa.name} vs ${pb.name}`,
    numberOfItems: 2,
    itemListElement: [pa, pb].map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        url: `${SITE_URL}/prodotto/${p.slug}`,
        image: p.imageUrl,
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          price: p.priceEur,
          availability: "https://schema.org/InStock",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: p.rating,
          reviewCount: p.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />

      <article className="container-tight py-8 sm:py-12 max-w-5xl space-y-10">
        <nav aria-label="Breadcrumb" className="text-xs text-neutral-500">
          <ol className="flex gap-1 flex-wrap">
            <li>
              <Link href="/" className="hover:text-amazon-600">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-neutral-700 font-semibold truncate">
              {pa.name.split(" ").slice(0, 2).join(" ")} vs {pb.name.split(" ").slice(0, 2).join(" ")}
            </li>
          </ol>
        </nav>

        <header className="space-y-3 text-center">
          <div className="text-xs uppercase tracking-wider text-amazon-700 font-bold">
            Confronto diretto · {pa.brand} vs {pb.brand}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-neutral-900">
            {pa.name} vs {pb.name}
          </h1>
          <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-2xl mx-auto">
            Differenze, potenza, prezzo e recensioni a confronto. Il nostro
            consiglio per il 2026: <strong className="text-amazon-600">{winner.name}</strong>
            {winner === pa ? "" : ""}.{" "}
            {winner.slug !== loser.slug && (
              <>Ha il miglior rapporto qualità/prezzo per la maggior parte degli usi.</>
            )}
          </p>
        </header>

        {/* VS CARDS */}
        <section className="grid grid-cols-2 gap-3 sm:gap-5">
          {featured.map((p) => (
            <div
              key={p.slug}
              className="bg-white rounded-2xl border-2 border-neutral-200 p-4 sm:p-6 flex flex-col gap-3"
            >
              <Link href={`/prodotto/${p.slug}`} className="block">
                <div className="relative aspect-square bg-neutral-50 rounded-xl overflow-hidden">
                  <Image
                    src={p.imageUrl}
                    alt={p.name}
                    fill
                    sizes="(max-width:640px) 50vw, 25vw"
                    className="object-contain p-3"
                  />
                </div>
              </Link>
              <div className="text-[10px] uppercase text-neutral-500 text-center">
                {p.brand}
              </div>
              <h2 className="font-bold text-sm sm:text-base text-center leading-snug line-clamp-2">
                <Link href={`/prodotto/${p.slug}`} className="hover:text-amazon-600">
                  {p.name}
                </Link>
              </h2>
              <div className="text-center">
                <span className="text-xl sm:text-2xl font-extrabold text-amazon-600">
                  {formatPrice(p.priceEur)}
                </span>
              </div>
              <div className="text-center text-xs text-neutral-600">
                {p.rating.toFixed(1)} ★ · {p.reviewCount.toLocaleString("it-IT")} rec.
              </div>
              <div className="mt-auto pt-1">
                <AffiliateButton slug={p.slug} label="Vedi offerta" />
              </div>
            </div>
          ))}
        </section>

        {/* WINNER CALL OUT */}
        <section className="bg-amazon-50 border-2 border-amazon-200 rounded-2xl p-5 sm:p-7 space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
            🏆 Il nostro vincitore: {winner.name}
          </h2>
          <ul className="space-y-2 text-sm sm:text-base text-neutral-800">
            <li className="flex gap-2"><span className="text-amazon-600">✓</span><span>Rating <strong>{winner.rating.toFixed(1)}/5</strong> su {winner.reviewCount.toLocaleString("it-IT")} recensioni verificate</span></li>
            <li className="flex gap-2"><span className="text-amazon-600">✓</span><span>Prezzo <strong>{formatPrice(winner.priceEur)}</strong> su Amazon.it</span></li>
            {winner.keyFeatures.slice(0, 3).map((f, i) => (
              <li key={i} className="flex gap-2"><span className="text-amazon-600">✓</span><span>{f}</span></li>
            ))}
          </ul>
          <AffiliateButton slug={winner.slug} label={`Compra ${winner.name} su Amazon`} />
        </section>

        {/* SPEC TABLE */}
        {specKeys.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Specifiche a confronto
            </h2>
            <div className="overflow-x-auto bg-white rounded-2xl border border-neutral-200 shadow-sm">
              <table className="min-w-[560px] w-full text-sm">
                <thead className="bg-neutral-100 text-neutral-700">
                  <tr>
                    <th className="text-left px-4 py-3">Caratteristica</th>
                    <th className="text-left px-4 py-3">{pa.name}</th>
                    <th className="text-left px-4 py-3">{pb.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {specKeys.map((key) => {
                    const av = pa.specs[key];
                    const bv = pb.specs[key];
                    return (
                      <tr key={key} className="border-t border-neutral-100">
                        <td className="px-4 py-3 text-neutral-600">{humanizeKey(key)}</td>
                        <td className="px-4 py-3 font-semibold text-neutral-900">{av ?? "—"}</td>
                        <td className="px-4 py-3 font-semibold text-neutral-900">{bv ?? "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* PRO/CONTRO both */}
        <section className="grid sm:grid-cols-2 gap-6">
          {[pa, pb].map((p) => (
            <div key={p.slug} className="space-y-3">
              <h2 className="text-lg font-bold text-neutral-900">
                {p.name} — pro e contro
              </h2>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 space-y-2">
                <div className="font-semibold text-green-900">Pro</div>
                <ul className="space-y-1 text-sm text-green-900">
                  {(p.highlights.pro.length ? p.highlights.pro : p.keyFeatures.slice(0, 3)).map((item, i) => (
                    <li key={i} className="flex gap-2"><span className="text-green-600">✓</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2">
                <div className="font-semibold text-amber-900">Contro</div>
                <ul className="space-y-1 text-sm text-amber-900">
                  {(p.highlights.contro.length ? p.highlights.contro : ["Prezzo pieno: aspetta un'offerta Amazon"]).map((item, i) => (
                    <li key={i} className="flex gap-2"><span className="text-amber-600">–</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        <section className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 space-y-3 text-sm text-neutral-700">
          <h2 className="text-base font-bold text-neutral-900">Come scegliere</h2>
          <p>
            Se dai priorità alla <strong>potenza di aspirazione</strong>, confronta i Pa dichiarati
            ({pa.specs["Potenza di aspirazione"] ?? "n/d"} vs {pb.specs["Potenza di aspirazione"] ?? "n/d"}).
            Per la <strong>comodità</strong>, conta la stazione di svuotamento automatico e i giorni di autonomia.
            Sul <strong>prezzo</strong>, il {pa.priceEur <= pb.priceEur ? pa.name : pb.name} costa meno oggi
            ({formatPrice(Math.min(pa.priceEur, pb.priceEur))}), ma controlla le offerte Amazon prima di comprare.
          </p>
          <p className="text-[11px] text-neutral-500 italic">
            *Link affiliato Amazon: guadagniamo una piccola commissione sugli acquisti idonei, senza costi aggiuntivi per te.
          </p>
        </section>
      </article>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getProductBySlug,
  getCompetitorsForSlug,
  getAffiliateUrlBySlug,
  type ProductFull,
} from "@/lib/products";
import { AffiliateButton } from "@/components/AffiliateButton";
import { ProductJsonLd } from "@/components/ProductJsonLd";
import { TrustPills, DEFAULT_TRUST_ITEMS } from "@/components/TrustPills";
import { StatBar } from "@/components/StatBar";
import { ReviewsWidget } from "@/components/ReviewsWidget";
import { FAQAccordion, FAQSchemaJsonLd } from "@/components/FAQ";
import { QuickCompareStrip } from "@/components/QuickCompareStrip";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { DREAME_L40_FAQ } from "@/lib/faq-data";
import { formatPrice, humanizeKey } from "@/lib/utils";

export const revalidate = 86400;

export async function generateStaticParams() {
  const all = await getAllProducts();
  return all.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const p = await getProductBySlug(params.slug);
  if (!p) return { title: "Prodotto non trovato" };
  return {
    title: `${p.name} (2026) — Recensione, Prezzo e Offerta Amazon`,
    description: `Recensione ${p.name} ${p.brand}: prezzo €${p.priceEur}, specifiche, ${p.reviewCount.toLocaleString("it-IT")} recensioni, confronto modelli simili, FAQ. Offerta Amazon con sconto.`,
    alternates: { canonical: `/prodotto/${p.slug}` },
  };
}

export default async function DynamicProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const p = await getProductBySlug(params.slug);
  if (!p) notFound();
  const competitors = await getCompetitorsForSlug(params.slug);
  const all = await getAllProducts();
  const rival =
    competitors.find((c) => c.rating >= 4.4 && c.reviewCount >= 1500) ??
    competitors[0];

  const savings = p.priceRrpEur - p.priceEur;
  const heroStats = [
    { icon: "🏆", value: "Top Brand", label: `${p.brand} · Amazon Italia` },
    { icon: "⭐", value: `${p.rating}/5`, label: `${p.reviewCount.toLocaleString("it-IT")} recensioni` },
    { icon: "🔥", value: "700+/mese", label: "Acquisti mese scorso" },
    { icon: "💸", value: `-${p.discountPct}%`, label: `Risparmi ${formatPrice(savings)}` },
  ];

  const faqs = p.isPrimary ? DREAME_L40_FAQ : GENERIC_FAQ;

  return (
    <>
      <ProductJsonLd
        asin={p.asin}
        name={p.name}
        description={p.keyFeatures.slice(0, 5).join(". ")}
        imageUrl={p.imageUrl}
        priceEur={p.priceEur}
        rating={p.rating}
        reviewCount={p.reviewCount}
        affiliateUrl={await getAffiliateUrlBySlug(p.slug).then((url) => url ?? "")}
        brand={p.brand}
      />
      <FAQSchemaJsonLd items={faqs} />

      <article className="container-tight py-12 space-y-16 max-w-5xl">
        {/* HERO */}
        <header className="grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-10 items-center">
          <div className="order-2 lg:order-1 space-y-4 sm:space-y-5">
            <div className="flex flex-wrap gap-2">
              {p.amazonChoice && (
                <span className="inline-block bg-amazon-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase animate-pulse">
                  🔥 Scelta Amazon · Hot Deal
                </span>
              )}
              <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                ⏱ Offerta a tempo limitato
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.05]">
              {p.name}
            </h1>
            <p className="text-lg text-neutral-700 leading-relaxed">
              Il robot aspirapolvere e lavapavimenti <strong>{p.brand}</strong>:{" "}
              <strong>{p.rating}/5</strong> stelle su {p.reviewCount.toLocaleString("it-IT")} recensioni Amazon verificate. Risparmi{" "}
              <strong className="text-amazon-600">{formatPrice(savings)}</strong> sul prezzo di listino.
            </p>
            <StatBar stats={heroStats} variant="compact" />
            <div className="flex items-baseline gap-4 flex-wrap bg-white border-2 border-amazon-200 rounded-2xl p-5">
              <div>
                <div className="text-xs uppercase tracking-wider text-amazon-700 font-bold">
                  Prezzo oggi
                </div>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-5xl font-extrabold text-amazon-600">
                    {formatPrice(p.priceEur)}
                  </span>
                  <span className="text-lg text-neutral-400 line-through">
                    {formatPrice(p.priceRrpEur)}
                  </span>
                  <span className="bg-red-500 text-white px-2.5 py-1 rounded-lg text-sm font-bold">
                    -{p.discountPct}%
                  </span>
                </div>
              </div>
            </div>
            <TrustPills items={DEFAULT_TRUST_ITEMS} />
            <div className="flex flex-wrap gap-3 pt-1">
              <AffiliateButton slug={p.slug} />
              <p className="text-[11px] text-neutral-500 italic self-center">
                *Link affiliato Amazon — guadagniamo una piccola commissione sugli acquisti idonei.
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative aspect-square bg-white rounded-3xl p-4 sm:p-6 flex items-center justify-center border border-neutral-200 overflow-hidden shadow-md">
            <Image
              src={p.imageUrl}
              alt={p.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-4"
              priority
            />
            {p.amazonChoice && (
              <span className="absolute top-4 right-4 bg-amazon-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                ⭐ Scelta Amazon
              </span>
            )}
            <span className="absolute bottom-4 left-4 bg-red-500 text-white text-sm font-extrabold px-3 py-1.5 rounded-full shadow-md">
              −{p.discountPct}% RISPARMI
            </span>
          </div>
        </header>

        {/* PRICE BOX */}
        <section className="bg-white border-2 border-amazon-200 rounded-2xl p-8 space-y-5 shadow-md">
          <div>
            <div className="text-xs uppercase tracking-wider text-amazon-700 font-bold">
              Prezzo oggi
            </div>
            <div className="flex items-baseline gap-3 flex-wrap mt-1">
              <span className="text-6xl font-extrabold text-amazon-600">
                {formatPrice(p.priceEur)}
              </span>
              <span className="text-xl text-neutral-400 line-through">
                {formatPrice(p.priceRrpEur)}
              </span>
              <span className="bg-red-500 text-white px-3 py-1 rounded-lg text-base font-bold">
                -{p.discountPct}% · risparmi {formatPrice(savings)}
              </span>
            </div>
          </div>
          <TrustPills items={DEFAULT_TRUST_ITEMS} />
          <div className="flex flex-wrap gap-3 pt-2">
            <AffiliateButton slug={p.slug} />
            <p className="text-[11px] text-neutral-500 italic self-center">
              Prezzo finale su Amazon.it · Nessun costo extra
            </p>
          </div>
        </section>

        {/* QUICK COMPARE */}
        {rival && (
          <section id="confronto">
            <QuickCompareStrip
              title={`${p.name.split(" ").slice(0, 3).join(" ")} vs ${rival.name.split(" ").slice(0, 3).join(" ")}`}
              primary={{
                asin: p.asin,
                name: p.name,
                imageUrl: p.imageUrl,
                priceEur: p.priceEur,
                rating: p.rating,
              }}
              rival={{
                asin: rival.asin,
                name: rival.name,
                imageUrl: rival.imageUrl,
                priceEur: rival.priceEur,
                rating: rival.rating,
              }}
              primarySlug={p.slug}
            />
          </section>
        )}

        {/* COMPARISON TABLE */}
        <section className="space-y-4">
          <header>
            <div className="text-xs uppercase tracking-wider text-neutral-500">
              Confronto completo
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
              Tutti i {all.length} modelli a confronto
            </h2>
            <p className="text-neutral-600 mt-1">
              Tabella comparativa dei robot aspirapolvere più acquistati su Amazon.it nel 2026.
            </p>
          </header>
          <ComparisonTable products={all} currentSlug={p.slug} />
        </section>

        {/* PRO/CONTRO editorial */}
        {p.highlights.pro.length > 0 && (
          <section className="grid sm:grid-cols-2 gap-6">
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 space-y-3">
              <h2 className="text-xl font-bold text-green-900">👍 Pro</h2>
              <ul className="space-y-2 text-sm text-green-900">
                {p.highlights.pro.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 space-y-3">
              <h2 className="text-xl font-bold text-amber-900">⚠️ Contro</h2>
              <ul className="space-y-2 text-sm text-amber-900">
                {p.highlights.contro.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-amber-600 flex-shrink-0">–</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* KEY FEATURES (Amazon scraped) */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Caratteristiche principali
          </h2>
          <ul className="space-y-3">
            {p.keyFeatures.map((f, i) => (
              <li
                key={i}
                className="flex gap-3 bg-white rounded-lg border border-neutral-200 hover:border-amazon-300 hover:shadow-sm p-4 transition-all"
              >
                <span className="text-2xl font-bold text-amazon-500 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-neutral-800 leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* REVIEWS — Amazon scraped */}
        <ReviewsWidget
          rating={p.rating}
          reviewCount={p.reviewCount}
          topReviews={p.reviews}
          affiliateUrl={p.affiliateUrl}
        />

        {/* SPECS */}
        {Object.keys(p.specs).length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Specifiche tecniche
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {Object.entries(p.specs).map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between bg-white rounded-lg border border-neutral-200 px-4 py-3"
                >
                  <span className="text-neutral-600">{humanizeKey(k)}</span>
                  <span className="font-semibold text-neutral-900">{v}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="space-y-4">
          <header>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Domande frequenti
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Le domande più comuni dei clienti che stanno valutando questo prodotto.
            </p>
          </header>
          <FAQAccordion items={faqs} />
        </section>

        {/* ALTERNATIVES */}
        <section className="space-y-4">
          <header>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Alternative da considerare
            </h2>
            <p className="text-neutral-600 mt-1">
              Se questo modello non fa per te, ecco i migliori 3 alternative.
            </p>
          </header>
          <div className="grid sm:grid-cols-3 gap-4">
            {competitors.slice(0, 3).map((c) => (
              <article
                key={c.asin}
                className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:border-amazon-300 hover:shadow-md transition-all flex flex-col"
              >
                <a href={`/prodotto/${c.slug}`} className="block">
                  <div className="relative aspect-square bg-neutral-50">
                    <Image
                      src={c.imageUrl}
                      alt={c.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-contain p-2"
                    />
                    {c.amazonChoice && (
                      <span className="absolute top-2 left-2 bg-amazon-500 text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">
                        Scelta
                      </span>
                    )}
                  </div>
                </a>
                <div className="p-4 flex-1 flex flex-col gap-3">
                  <div>
                    <div className="text-xs text-neutral-500 uppercase">{c.brand}</div>
                    <a href={`/prodotto/${c.slug}`} className="font-bold leading-tight hover:text-amazon-600">
                      {c.name}
                    </a>
                  </div>
                  <div className="text-xl font-bold text-amazon-600">
                    {formatPrice(c.priceEur)}
                  </div>
                  <div className="text-sm text-neutral-600">
                    {c.rating.toFixed(1)} ★ · {c.reviewCount.toLocaleString("it-IT")} rec.
                  </div>
                  <div className="mt-auto pt-2 flex flex-col gap-2">
                    <AffiliateButton slug={c.slug} variant="secondary" label="Apri scheda" />
                    <a
                      href={`/prodotto/${c.slug}`}
                      className="text-xs text-center text-amazon-600 hover:text-amazon-700 underline"
                    >
                      Vedi recensione completa →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* DISCLOSURE */}
        <section className="space-y-4">
          <header>
            <div className="text-xs uppercase tracking-wider text-neutral-500">
              Trasparenza
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
              Disclosure Affiliati Amazon.it
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Ultimo aggiornamento: 1 agosto 2026
            </p>
          </header>
          <div className="space-y-4 bg-neutral-50 border border-neutral-200 rounded-2xl p-6 text-sm text-neutral-700 leading-relaxed">
            <p className="bg-amber-50 border border-amber-200 -mx-2 -mt-2 px-4 py-3 rounded-lg">
              <strong>In sintesi:</strong> questo sito partecipa al Programma Affiliazione Amazon EU. Le nostre pagine contengono link affiliati che ci permettono di guadagnare una piccola commissione quando acquisti tramite quei link — <strong>senza alcun costo aggiuntivo per te</strong>.
            </p>
            <h3 className="font-bold text-neutral-900">Come funziona</h3>
            <p>
              Quando clicchi su un prodotto Amazon presente nelle nostre pagine, il tuo browser imposta un cookie di tracciamento (durata 24 ore) che riconosce la provenienza da questo sito. Se acquisti entro 24 ore dall&apos;ultimo click, Amazon ci riconosce una commissione pari a una percentuale del prezzo del prodotto (tipicamente 3-5% per i robot aspirapolvere).
            </p>
            <p>
              Il prezzo che vedi su Amazon.it rimane invariato. La commissione è pagata da Amazon, non viene addebitata al cliente.
            </p>
            <h3 className="font-bold text-neutral-900">Conformità normativa</h3>
            <p>
              Questa pagina è conforme a: <strong>AGCM</strong> Provvedimento n. 25411/2018; <strong>IAP</strong> Linee guida native advertising; <strong>Operating Agreement Amazon EU</strong>.
            </p>
          </div>
        </section>
      </article>

      <StickyBuyBar
        slug={p.slug}
        productName={p.name}
        priceEur={p.priceEur}
        rating={p.rating}
        reviewCount={p.reviewCount}
      />

      <div className="h-20 lg:hidden" aria-hidden />
    </>
  );
}

function ComparisonTable({
  products,
  currentSlug,
}: {
  products: ProductFull[];
  currentSlug: string;
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl border border-neutral-200 shadow-sm">
      <table className="min-w-[760px] w-full text-sm">
        <thead className="bg-neutral-100 text-neutral-700">
          <tr>
            <th className="text-left px-4 py-3">Prodotto</th>
            <th className="text-right px-4 py-3">Prezzo</th>
            <th className="text-right px-4 py-3">Rating</th>
            <th className="text-right px-4 py-3">Recensioni</th>
            <th className="text-center px-4 py-3">Scelta</th>
            <th className="text-center px-4 py-3">Scheda</th>
          </tr>
        </thead>
        <tbody>
          {products.map((row) => {
            const isCurrent = row.slug === currentSlug;
            return (
              <tr
                key={row.asin}
                className={`${
                  isCurrent ? "bg-amazon-50 font-semibold" : ""
                } border-t border-neutral-200 hover:bg-neutral-50 transition-colors`}
              >
                <td className="px-4 py-3">
                  <a href={`/prodotto/${row.slug}`} className="block">
                    <div className="text-xs text-neutral-500 uppercase">
                      {row.brand}
                    </div>
                    <div className="font-semibold text-neutral-900 hover:text-amazon-600">
                      {row.name}
                    </div>
                  </a>
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <div className="font-bold text-amazon-600">
                    {formatPrice(row.priceEur)}
                  </div>
                  {row.priceRrpEur > row.priceEur && (
                    <div className="text-xs text-neutral-400 line-through">
                      {formatPrice(row.priceRrpEur)}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-right font-bold text-amazon-500">
                  {row.rating.toFixed(1)} ★
                </td>
                <td className="px-4 py-3 text-right text-neutral-700">
                  {row.reviewCount.toLocaleString("it-IT")}
                </td>
                <td className="px-4 py-3 text-center">
                  {row.amazonChoice ? (
                    <span className="inline-block bg-amazon-500 text-white text-[10px] px-2 py-0.5 rounded">
                      SI
                    </span>
                  ) : (
                    <span className="text-neutral-300">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <a
                    href={`/prodotto/${row.slug}`}
                    className="inline-block border border-amazon-500 text-amazon-700 text-xs font-semibold px-3 py-1.5 rounded hover:bg-amazon-50"
                  >
                    Apri
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const GENERIC_FAQ = [
  {
    question: "Quanto sono affidabili le recensioni mostrate in questa pagina?",
    answer:
      "Le recensioni mostrate sono estratte direttamente dalla pagina prodotto Amazon italiana e provengono da acquirenti verificati. Puoi cliccare sul titolo di una recensione per vederla completa su Amazon.it.",
  },
  {
    question: "Posso fidarmi della commissione affiliata?",
    answer:
      "Sì. La commissione che riceviamo non modifica in alcun modo il prezzo che paghi e non influenza la nostra selezione dei prodotti consigliati. Ordiniamo i prodotti per qualità/prezzo indipendentemente dal network affiliato.",
  },
  {
    question: "Quanto dura il cookie di tracciamento Amazon?",
    answer:
      "Il cookie di tracciamento Amazon Associates ha una durata di 24 ore. Se acquisti entro 24 ore dal click sul nostro link affiliato, Amazon ci riconosce una commissione. Trascorso questo periodo, l'acquisto non viene attribuito a questo sito.",
  },
  {
    question: "Perché vedo un prezzo diverso su Amazon?",
    answer:
      "I prezzi Amazon variano frequentemente per promozioni e disponibilità. Il prezzo mostrato sulla nostra pagina è aggiornato regolarmente. Se trovi una differenza significativa, potrebbe indicare che Amazon ha applicato un coupon o uno sconto aggiuntivo non ancora catturato dal nostro aggiornamento.",
  },
  {
    question: "Questo prodotto è disponibile in Italia?",
    answer:
      "Verificato. Tutti i prodotti in questa pagina sono venduti e spediti da Amazon.it. La consegna è disponibile in tutta Italia con opzioni Prime per i membri.",
  },
  {
    question: "Posso restituire il prodotto se non mi convince?",
    answer:
      "Sì. Amazon offre il diritto di recesso entro 14 giorni dalla consegna per quasi tutti i prodotti, gratuitamente per i resi Prime. Consulta la pagina del prodotto su Amazon.it per i dettagli specifici del produttore.",
  },
];

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { getAllArticles } from "@/lib/blog";
import { AffiliateButton } from "@/components/AffiliateButton";
import { TrustPills, DEFAULT_TRUST_ITEMS } from "@/components/TrustPills";
import { FAQAccordion, FAQSchemaJsonLd } from "@/components/FAQ";
import { StatBar } from "@/components/StatBar";
import { formatPrice } from "@/lib/utils";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://robotaspirapolvere.pro";

export const revalidate = 86400;

export const metadata: Metadata = {
  title:
    "Robot Aspirapolvere 2026: la classifica completa con prezzi e offerte Amazon",
  description:
    "I migliori robot aspirapolvere del 2026 a confronto: Dreame, Roborock, Ultenic. Prezzi aggiornati su Amazon.it, oltre 15.000 recensioni verificate analizzate, pro e contro di ogni modello.",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    title: "Robot Aspirapolvere 2026: la classifica completa",
    description:
      "I migliori robot aspirapolvere del 2026 a confronto con prezzi aggiornati su Amazon.it e recensioni verificate.",
    url: SITE_URL,
    images: [
      { url: `${SITE_URL}/og-default.png`, width: 1200, height: 630, alt: "RobotAspirapolvere.pro — classifica robot aspirapolvere 2026" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robot Aspirapolvere 2026: la classifica completa",
    description:
      "I migliori robot aspirapolvere del 2026 a confronto con prezzi e recensioni verificate.",
    images: [`${SITE_URL}/og-default.png`],
  },
};

const HOME_FAQ = [
  {
    question: "Qual è il miglior robot aspirapolvere del 2026?",
    answer:
      "Per rapporto qualità/prezzo il Dreame L40 Ultra AE è il modello più equilibrato: 19.000 Pa, stazione all-in-one con 100 giorni di svuotamento automatico e oltre 3.000 recensioni verificate a 4,5 stelle.",
  },
  {
    question: "Quanto costa un buon robot aspirapolvere lavapavimenti?",
    answer:
      "La fascia 350-500 euro offre il miglior rapporto qualità/prezzo nel 2026: potenza superiore a 15.000 Pa, stazione di svuotamento automatico e mappatura LiDAR. Sotto i 300 euro si trovano modelli validi ma con stazioni di ricarica più semplici.",
  },
  {
    question: "Come verifichiamo i prezzi e le recensioni mostrati?",
    answer:
      "I dati provengono direttamente dalle pagine prodotto Amazon.it: prezzo, sconto, rating e numero di recensioni verificate. Li aggiorniamo periodicamente perché i prezzi Amazon variano quotidianamente per promozioni e disponibilità.",
  },
  {
    question: "Il sito guadagna con i link?",
    answer:
      "Sì, partecipiamo al Programma Affiliazione Amazon EU: guadagniamo una piccola commissione sugli acquisti tramite i nostri link, senza alcun costo aggiuntivo per te. Le nostre classifiche non sono influenzate dalle commissioni.",
  },
];

export default async function HomePage() {
  const products = await getAllProducts();
  const primary = products.find((p) => p.isPrimary) ?? products[0];
  const ranked = [...products].sort(
    (a, b) => b.reviewCount - a.reviewCount || b.rating - a.rating,
  );
  const articles = getAllArticles().slice(0, 3);
  const totalReviews = products.reduce((sum, p) => sum + p.reviewCount, 0);
  const brands = Array.from(
    new Set(
      products.map((p) => p.brand.charAt(0).toUpperCase() + p.brand.slice(1)),
    ),
  ).join(", ");

  return (
    <>
      <FAQSchemaJsonLd items={HOME_FAQ} />
      <article className="container-tight py-6 sm:py-10 lg:py-12 space-y-12 sm:space-y-16 max-w-5xl">
        {/* HERO */}
        <header className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <span className="inline-block bg-amazon-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              🏆 Classifica aggiornata · agosto 2026
            </span>
            <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              ✓ Prezzi verificati Amazon.it
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.05] max-w-3xl">
            I migliori robot aspirapolvere 2026
            <span className="text-amazon-600"> a confronto</span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-3xl">
            Abbiamo analizzato{" "}
            <strong className="text-neutral-900">
              {totalReviews.toLocaleString("it-IT")} recensioni verificate
            </strong>{" "}
            su Amazon.it per selezionare i modelli con il miglior rapporto
            qualità/prezzo 2026: Dreame, Roborock e Ultenic. Confronta prezzi,
            potenza di aspirazione e funzioni smart, poi scegli con la nostra{" "}
            <Link href={`/prodotto/${primary.slug}`} className="text-amazon-700 font-semibold underline">
              recensione completa del modello top
            </Link>
            .
          </p>
          <StatBar
            variant="compact"
            stats={[
              { icon: "🧹", value: `${products.length}`, label: "modelli a confronto" },
              { icon: "⭐", value: `${totalReviews.toLocaleString("it-IT")}`, label: "recensioni analizzate" },
              { icon: "🏷️", value: brands, label: "brand monitorati" },
              { icon: "🔁", value: "Settimanale", label: "prezzi aggiornati" },
            ]}
          />
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <AffiliateButton slug={primary.slug} label={`Vedi Dreame L40 Ultra AE — Top pick ${formatPrice(primary.priceEur)}`} />
            <p className="text-[11px] text-neutral-500 italic self-center">
              *Link affiliato Amazon — guadagniamo una piccola commissione sugli acquisti idonei.
            </p>
          </div>
        </header>

        {/* METODOLOGIA */}
        <section className="space-y-4">
          <header>
            <div className="text-xs uppercase tracking-wider text-neutral-500">
              Come scegliamo
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
              La nostra metodologia di selezione
            </h2>
            <p className="text-neutral-600 mt-1">
              Nessun prodotto è sponsorizzato: ordiniamo esclusivamente per
              qualità, prezzo e feedback reale dei clienti Amazon.
            </p>
          </header>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { i: "📊", t: "Minimo 1.500 recensioni", d: "Filtriamo i prodotti con un campione di opinioni statisticamente rilevante." },
              { i: "⭐", t: "Rating ≥ 4,4 su Amazon.it", d: "Consideriamo solo modelli con consenso reale degli acquirenti verificati." },
              { i: "💶", t: "Prezzo verificato", d: "Controlliamo prezzo, sconto e disponibilità direttamente su Amazon.it." },
              { i: "🧪", t: "Test e analisi", d: "Per i modelli principali pubblichiamo recensioni dopo 90 giorni di uso reale." },
            ].map((c) => (
              <li key={c.t} className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-2">
                <div className="text-2xl" aria-hidden>{c.i}</div>
                <div className="font-bold text-neutral-900">{c.t}</div>
                <p className="text-sm text-neutral-600 leading-relaxed">{c.d}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* CLASSIFICA */}
        <section className="space-y-5">
          <header className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <div className="text-xs uppercase tracking-wider text-neutral-500">
                Classifica 2026
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
                I {products.length} migliori robot aspirapolvere su Amazon.it
              </h2>
              <p className="text-neutral-600 mt-1">
                Ordinati per numero di recensioni verificate. Clicca su un
                modello per la scheda completa con pro, contro e offerta.
              </p>
            </div>
          </header>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ranked.map((p, idx) => (
              <li key={p.asin} className="relative">
                <article
                  className={`bg-white rounded-xl border ${
                    p.isPrimary
                      ? "border-amazon-500 ring-2 ring-amazon-200 shadow-md"
                      : "border-neutral-200"
                  } overflow-hidden transition-all hover:border-amazon-300 hover:shadow-md flex flex-col h-full`}
                >
                  <Link href={`/prodotto/${p.slug}`} className="block relative">
                    <div className="relative aspect-square bg-neutral-50">
                      <Image
                        src={p.imageUrl}
                        alt={p.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain p-3"
                      />
                      <span className="absolute top-2 left-2 bg-neutral-900/80 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        #{idx + 1}
                      </span>
                      {p.discountPct > 0 && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          −{p.discountPct}%
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="p-4 flex-1 flex flex-col gap-2">
                    <div className="text-[10px] uppercase tracking-wider text-neutral-500">
                      {p.brand} · {p.rating.toFixed(1)} ★ ·{" "}
                      {p.reviewCount.toLocaleString("it-IT")} rec.
                    </div>
                    <Link
                      href={`/prodotto/${p.slug}`}
                      className="font-bold leading-tight text-neutral-900 hover:text-amazon-600"
                    >
                      {p.name}
                    </Link>
                    <div className="flex items-baseline gap-2 mt-auto pt-1">
                      <span className="text-xl font-extrabold text-amazon-600">
                        {formatPrice(p.priceEur)}
                      </span>
                      {p.priceRrpEur > p.priceEur && (
                        <span className="text-sm text-neutral-400 line-through">
                          {formatPrice(p.priceRrpEur)}
                        </span>
                      )}
                    </div>
                    <div className="pt-2 flex flex-col gap-2">
                      <AffiliateButton
                        slug={p.slug}
                        variant="secondary"
                        label="Vedi offerta"
                      />
                      <Link
                        href={`/prodotto/${p.slug}`}
                        className="text-xs text-center text-amazon-600 hover:text-amazon-700 underline"
                      >
                        Recensione completa →
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ SNIPPET */}
        <section className="space-y-4">
          <header>
            <div className="text-xs uppercase tracking-wider text-neutral-500">
              Domande frequenti
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
              Robot aspirapolvere: le domande più comuni
            </h2>
          </header>
          <FAQAccordion items={HOME_FAQ} />
        </section>

        {/* BLOG */}
        {articles.length > 0 && (
          <section className="space-y-4">
            <header className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <div className="text-xs uppercase tracking-wider text-neutral-500">
                  Guide acquisto
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
                  Ultimi articoli dal blog
                </h2>
              </div>
              <Link href="/blog" className="text-sm font-semibold text-amazon-600 hover:text-amazon-700 underline">
                Tutte le guide →
              </Link>
            </header>
            <ul className="grid sm:grid-cols-3 gap-4">
              {articles.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/blog/${a.slug}`}
                    className="block bg-white rounded-2xl border border-neutral-200 p-5 hover:border-amazon-300 hover:shadow-md transition-all h-full"
                  >
                    <div className="text-[10px] uppercase tracking-wider text-amazon-700 font-semibold">
                      {new Date(a.publishedAt).toLocaleDateString("it-IT", {
                        year: "numeric",
                        month: "long",
                      })}{" "}
                      · {a.readingMinutes} min
                    </div>
                    <h3 className="font-bold text-base text-neutral-900 mt-2 leading-snug line-clamp-2">
                      {a.title}
                    </h3>
                    <p className="text-xs text-neutral-600 mt-2 line-clamp-3 leading-relaxed">
                      {a.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* PROMO PRIMARY */}
        <section className="bg-gradient-to-br from-amazon-50 via-white to-neutral-50 rounded-2xl border-2 border-amazon-200 p-6 sm:p-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
          <div className="relative w-40 h-40 sm:w-52 sm:h-52 flex-shrink-0 bg-white rounded-2xl border border-neutral-200 p-3 overflow-hidden">
            <Image
              src={primary.imageUrl}
              alt={primary.name}
              fill
              sizes="208px"
              className="object-contain p-2"
            />
          </div>
          <div className="flex-1 text-center lg:text-left space-y-3">
            <div className="text-xs uppercase tracking-wider text-amazon-700 font-bold">
              ⭐ Il nostro top pick 2026
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
              {primary.name}
            </h2>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              {primary.keyFeatures[0] && <>{primary.keyFeatures[0]}. </>}Con{" "}
              <strong>{primary.rating.toFixed(1)}/5</strong> da{" "}
              <strong>{primary.reviewCount.toLocaleString("it-IT")} recensioni</strong>{" "}
              verificate, oggi a{" "}
              <strong className="text-amazon-600">{formatPrice(primary.priceEur)}</strong>{" "}
              {primary.discountPct > 0 && (
                <>invece di {formatPrice(primary.priceRrpEur)} (risparmi {formatPrice(primary.savingsEur)}).</>
              )}
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-1">
              <AffiliateButton slug={primary.slug} label="Vedi offerta su Amazon" />
              <Link
                href={`/prodotto/${primary.slug}`}
                className="inline-flex items-center justify-center rounded-lg border-2 border-amazon-500 text-amazon-700 hover:bg-amazon-50 px-6 py-3 font-semibold"
              >
                Recensione completa
              </Link>
            </div>
          </div>
        </section>

        {/* TRUST */}
        <TrustPills items={DEFAULT_TRUST_ITEMS} />

        {/* DISCLOSURE */}
        <section className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 text-sm text-neutral-600 leading-relaxed space-y-2">
          <p>
            <strong className="text-neutral-900">Disclosure:</strong> questo
            sito partecipa al Programma Affiliazione Amazon EU. I link ai
            prodotti sono link affiliati: acquistando tramite essi guadagniamo
            una piccola commissione, senza alcun costo aggiuntivo per te. Le
            classifiche sono indipendenti e basate su dati pubblici Amazon.it.
          </p>
          <p className="text-xs text-neutral-500">
            Prezzi verificati il 1 agosto 2026. I prezzi Amazon possono variare
            quotidianamente.{" "}
            <Link href="/chi-siamo" className="text-amazon-600 underline">
              Scopri come testiamo e analizziamo i prodotti →
            </Link>
          </p>
        </section>
      </article>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://robotaspirapolvere.pro";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Chi siamo e come valutiamo i robot aspirapolvere",
  description:
    "Chi c'è dietro RobotAspirapolvere.pro: metodologia di test, criteri di selezione dei prodotti, policy editoriale e disclosure affiliato Amazon.",
  alternates: { canonical: `${SITE_URL}/chi-siamo` },
  openGraph: {
    type: "website",
    title: "Chi siamo e come valutiamo i robot aspirapolvere",
    description:
      "Metodologia di test, criteri di selezione e policy editoriale di RobotAspirapolvere.pro.",
    url: `${SITE_URL}/chi-siamo`,
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function ChiSiamoPage() {
  return (
    <article className="container-tight py-8 sm:py-12 max-w-3xl space-y-8">
      <nav aria-label="Breadcrumb" className="text-xs text-neutral-500">
        <ol className="flex gap-1 flex-wrap">
          <li>
            <Link href="/" className="hover:text-amazon-600">Home</Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-neutral-700 font-semibold">Chi siamo</li>
        </ol>
      </nav>

      <header className="space-y-3">
        <div className="text-xs uppercase tracking-wider text-amazon-700 font-bold">
          Trasparenza
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
          Chi siamo e come scegliamo i prodotti
        </h1>
        <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
          RobotAspirapolvere.pro è un sito indipendente di confronto e
          recensione di robot aspirapolvere venduti su Amazon.it. Il nostro
          obiettivo è aiutarti a scegliere il modello giusto con dati reali:
          prezzi verificati, recensioni di acquirenti e analisi delle
          caratteristiche.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">Come selezioniamo i modelli</h2>
        <div className="space-y-3 text-sm text-neutral-700 leading-relaxed">
          <p>
            Non recensiamo tutto: partiamo dai prodotti effettivamente più
            acquistati su Amazon.it e applichiamo criteri oggettivi.
          </p>
          <ul className="space-y-2 pl-1">
            {[
              ["Minimo 1.500 recensioni verificate", "un campione troppo piccolo non è statisticamente affidabile per un giudizio."],
              ["Rating medio ≥ 4,4 stelle", "escludiamo i modelli con consenso negativo o controverso degli acquirenti."],
              ["Disponibilità su Amazon.it", "verifichiamo che il prodotto sia in stock, spedito da Amazon e con garanzia italiana."],
              ["Prezzo e sconto verificati", "i prezzi mostrati sono quelli correnti della pagina prodotto Amazon italiana."],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-2">
                <span className="text-amazon-500 flex-shrink-0">✓</span>
                <span>
                  <strong>{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">Metodologia di test</h2>
        <div className="space-y-3 text-sm text-neutral-700 leading-relaxed">
          <p>
            Per i modelli principali pubblichiamo recensioni basate su test
            reali protratti per almeno 90 giorni: aspirazione su diversi
            pavimenti, lavaggio, navigazione, app, rumore e manutenzione. Ogni
            recensione dichiara esplicitamente se il prodotto è stato acquistato
            a prezzo pieno o fornito dal produttore.
          </p>
          <p>
            Per i prodotti non testati direttamente, le schede si basano
            esclusivamente su dati pubblici Amazon.it (specifiche ufficiali,
            rating e recensioni degli acquirenti) riportati in modo verificabile.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">Indipendenza e disclosure</h2>
        <div className="space-y-3 text-sm text-neutral-700 leading-relaxed">
          <p>
            Questo sito partecipa al Programma Affiliazione Amazon EU: quando
            acquisti tramite un nostro link riceviamo una piccola commissione,
            <strong> senza alcun costo aggiuntivo per te</strong>. La commissione
            non influisce sulle valutazioni: nessun produttore può pagare per
            comparire nelle nostre classifiche.
          </p>
          <p className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
            La presente pagina è conforme ad <strong>AGCM</strong> (Provvedimento
            n. 25411/2018),             alle <strong>Linee guida IAP</strong> sul native
            advertising e all’<strong>Operating Agreement Amazon EU</strong>.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">Contatti e segnalazioni</h2>
        <p className="text-sm text-neutral-700 leading-relaxed">
          Segnala prezzi non aggiornati, dati errati o prodotti da testare:
          ci impegniamo a verificare e correggere ogni segnalazione entro 48
          ore lavorative.
        </p>
        <a
          href="mailto:info@robotaspirapolvere.pro"
          className="inline-flex items-center justify-center rounded-lg bg-amazon-500 hover:bg-amazon-600 text-white px-6 py-3 font-semibold shadow transition-colors"
        >
          Scrivici a info@robotaspirapolvere.pro
        </a>
      </section>
    </article>
  );
}

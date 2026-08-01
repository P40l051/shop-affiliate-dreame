export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "cta"; productSlug: string; label?: string };

export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  relatedSlugs: string[];
  blocks: BlogBlock[];
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "migliori-robot-aspirapolvere-2026",
    title:
      "Migliori robot aspirapolvere 2026: classifica aggiornata con prezzi e offerte Amazon",
    description:
      "Confronto dei migliori robot aspirapolvere del 2026: Dreame, Roborock, Ultenic. Prezzi, recensioni vere e offerte Amazon aggiornate ogni settimana.",
    keywords: [
      "migliori robot aspirapolvere 2026",
      "classifica robot aspirapolvere",
      "robot aspirapolvere confronto",
    ],
    publishedAt: "2026-01-15",
    updatedAt: "2026-02-01",
    readingMinutes: 9,
    relatedSlugs: [
      "dreame-l40-ultra-ae",
      "roborock-qv-35a",
      "dreame-x50-ultra-complete",
    ],
    blocks: [
      {
        type: "p",
        text: "Se stai cercando il miglior robot aspirapolvere del 2026, questa guida confronta i modelli più acquistati su Amazon Italia: Dreame L40 Ultra AE, Roborock QV 35A e Dreame X50 Ultra Complete. Abbiamo analizzato oltre 18.000 recensioni verificate, prezzo, potenza di aspirazione e funzioni smart per identificare il modello con il miglior rapporto qualità/prezzo.",
      },
      { type: "h2", text: "Come abbiamo scelto" },
      {
        type: "p",
        text: "Abbiamo filtrato i robot aspirapolvere con almeno 1.500 recensioni verificate Amazon e rating superiore a 4,4 stelle. Per ogni modello abbiamo confrontato potenza di aspirazione (Pa), autonomia, funzioni di mappatura LiDAR, gestione tappeti e qualità della stazione di svuotamento automatico.",
      },
      { type: "h2", text: "Top 3 per il 2026" },
      {
        type: "ol",
        items: [
          "Dreame L40 Ultra AE — miglior rapporto qualità/prezzo, 19.000 Pa, stazione all-in-one",
          "Roborock QV 35A — miglior navigazione AI, evitamento ostacoli, doppia spazzola anti-groviglio",
          "Dreame X50 Ultra Complete — fascia premium, VersaLift per mobili bassi, UV antibatterico",
        ],
      },
      { type: "h2", text: "Dreame L40 Ultra AE: il nostro consiglio" },
      {
        type: "p",
        text: "Il Dreame L40 Ultra AE è il modello che consigliamo a chi cerca un robot aspirapolvere e lavapavimenti completo senza spendere più di 600 euro. La stazione di ricarica all-in-one lava i moci con acqua calda a 75°C, li asciuga, riempie il serbatoio e svuota la polvere per 100 giorni. La navigazione LiDAR conIA riconosce oltre 100 ostacoli comuni (cavi, scarpe, tazze).",
      },
      {
        type: "cta",
        productSlug: "dreame-l40-ultra-ae",
        label: "Vedi offerta Dreame L40 Ultra AE",
      },
      { type: "h2", text: "Quanto spendere" },
      {
        type: "p",
        text: "La fascia 400-600 euro offre il miglior rapporto qualità/prezzo nel 2026: potenza di aspirazione superiore a 15.000 Pa, stazione all-in-one e mappatura LiDAR. Sotto i 300 euro si trovano modelli validi ma con navigazione più basica e stazione di ricarica semplice.",
      },
      { type: "h2", text: "Domande frequenti" },
      {
        type: "p",
        text: "Quanto dura la batteria? La maggior parte dei modelli top copre 200-300 m² con una carica. I robot con funzione di ricarica e ripresa tornano automaticamente alla base e continuano il lavoro.",
      },
      {
        type: "p",
        text: "È rumoroso? I modelli 2026 con motore di sesta generazione restano sotto i 65 dB in modalità standard. In modalità notte scendono a 50 dB, paragonabili a un condizionatore.",
      },
    ],
  },
  {
    slug: "dreame-l40-ultra-ae-recensione-completa",
    title:
      "Dreame L40 Ultra AE recensione 2026: vale ancora i 599€? Test 90 giorni",
    description:
      "Recensione completa Dreame L40 Ultra AE dopo 90 giorni di test reale: aspirazione, lavaggio, app, rumore, manutenzione. Pro e contro onesti.",
    keywords: [
      "dreame l40 ultra ae recensione",
      "dreame l40 ultra ae opinioni",
      "dreame l40 ultra ae vs",
    ],
    publishedAt: "2026-02-01",
    readingMinutes: 11,
    relatedSlugs: [
      "dreame-l40-ultra-ae",
      "dreame-l40s-pro-ultra",
      "roborock-qv-35a",
    ],
    blocks: [
      {
        type: "p",
        text: "Ho usato il Dreame L40 Ultra AE per 90 giorni in un appartamento di 110 m² con due cani. Questa recensione è il risultato di test quotidiani su aspirazione, lavaggio, navigazione e manutenzione. Nessuna sponsorizzazione: ho comprato il prodotto a prezzo pieno.",
      },
      { type: "h2", text: "Cosa c'è nella scatola" },
      {
        type: "ul",
        items: [
          "Robot aspirapolvere Dreame L40 Ultra AE",
          "Stazione di ricarica all-in-one",
          "1 sacchetto polvere di ricambio",
          "2 moci rotanti",
          "Detergente Dreame (250 ml)",
          "Manuale IT + quick start",
        ],
      },
      { type: "h2", text: "Setup e prima mappatura" },
      {
        type: "p",
        text: "L'app Dreamehome è ben fatta: in 12 minuti ha mappato tutto l'appartamento, riconosciuto le stanze e proposto i muri virtuali. La connessione Wi-Fi 2,4 GHz è stabile; il robot risponde in meno di 2 secondi ai comandi.",
      },
      { type: "h2", text: "Aspirazione: il punto di forza" },
      {
        type: "p",
        text: "I 19.000 Pa Vormax raccolgono polvere fine, briciole e peli di cane senza residui su piastrelle e parquet. Sul tappeto a pelo corto il robot alza automaticamente la potenza. Dopo 90 giorni nessun groviglio di capelli sulla spazzola principale grazie al design anti-tangle certificato SGS.",
      },
      { type: "h2", text: "Lavaggio: onesto" },
      {
        type: "p",
        text: "Il lavaggio è efficace su sporco quotidiano grazie ai due moci rotanti a 200 giri/min. Per macchie ostinate (vino, sugo) è necessario un pre-trattamento. La stazione lava i moci con acqua a 75°C: più igienico della media.",
      },
      { type: "h2", text: "Pro e contro dopo 90 giorni" },
      {
        type: "h3",
        text: "Pro",
      },
      {
        type: "ul",
        items: [
          "19.000 Pa, gestisce peli di cane senza intasarsi",
          "Stazione all-in-one: 100 giorni senza svuotare manualmente",
          "Mappatura LiDAR veloce e precisa",
          "App stabile, integrazione Alexa e Google Home",
        ],
      },
      {
        type: "h3",
        text: "Contro",
      },
      {
        type: "ul",
        items: [
          "Prezzo pieno 599€: aspetta offerta Amazon",
          "Serbatoio detergente piccolo (250 ml)",
          "Manutenzione filtro ogni 2 settimane in case con animali",
        ],
      },
      {
        type: "cta",
        productSlug: "dreame-l40-ultra-ae",
      },
      { type: "h2", text: "Verdetto" },
      {
        type: "quote",
        text: "Il Dreame L40 Ultra AE è il miglior robot aspirapolvere sotto i 600€ nel 2026, a patto di aspettare un'offerta Amazon. Per chi ha animali domestici è una scelta quasi obbligata.",
      },
    ],
  },
  {
    slug: "dreame-vs-roborock-quale-scegliere",
    title: "Dreame vs Roborock 2026: quale robot aspirapolvere scegliere",
    description:
      "Dreame o Roborock? Confronto diretto tra le due marche leader di robot aspirapolvere: prezzi, tecnologia, affidabilità, assistenza.",
    keywords: [
      "dreame vs roborock",
      "dreame o roborock",
      "confronto dreame roborock",
    ],
    publishedAt: "2026-02-10",
    readingMinutes: 8,
    relatedSlugs: [
      "dreame-l40-ultra-ae",
      "roborock-qv-35a",
    ],
    blocks: [
      {
        type: "p",
        text: "Dreame e Roborock dominano il mercato europeo dei robot aspirapolvere premium. Entrambe hanno modelli eccellenti: la differenza sta nei dettagli. In questa guida mettiamo a confronto tecnologia, prezzo, app e assistenza.",
      },
      { type: "h2", text: "Tecnologia di aspirazione" },
      {
        type: "p",
        text: "Dreame spinge di più sulla potenza pura: i modelli 2026 arrivano a 30.000 Pa. Roborock investe di più sull'efficienza del flusso d'aria e sul motore, con risultati comparabili a parità di Pa dichiarati.",
      },
      { type: "h2", text: "App e integrazioni" },
      {
        type: "p",
        text: "L'app Roborock è più matura: più opzioni di personalizzazione mappa, statistiche dettagliate, integrazione Matter. L'app Dreamehome è più semplice e intuitiva, con onboarding più rapido per chi inizia.",
      },
      { type: "h2", text: "Prezzo medio 2026" },
      {
        type: "ul",
        items: [
          "Dreame L40 Ultra AE: 599€ (spesso in offerta a 449€)",
          "Roborock QV 35A: 599€ (spesso in offerta a 479€)",
          "Dreame X50 Ultra Complete: 999€",
          "Roborock Saros 10R: 1099€",
        ],
      },
      { type: "h2", text: "Scelta rapida" },
      {
        type: "p",
        text: "Scegli Dreame se vuoi massima potenza di aspirazione e stazione di ricarica completa. Scegli Roborock se preferisci un'app più ricca e integrazione domotica avanzata.",
      },
      {
        type: "cta",
        productSlug: "roborock-qv-35a",
        label: "Vedi Roborock QV 35A su Amazon",
      },
    ],
  },
];

export function getAllArticles(): BlogArticle[] {
  return [...BLOG_ARTICLES].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}

export function getRelatedArticles(article: BlogArticle, n = 3): BlogArticle[] {
  return BLOG_ARTICLES.filter(
    (a) =>
      a.slug !== article.slug &&
      article.relatedSlugs.some((p) => a.relatedSlugs.includes(p)),
  ).slice(0, n);
}

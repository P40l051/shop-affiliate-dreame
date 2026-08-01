import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-tight py-16 text-center space-y-6">
      <div className="text-6xl">🤖</div>
      <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
        Prodotto non trovato
      </h1>
      <p className="text-neutral-600 max-w-md mx-auto">
        La scheda che stai cercando non esiste o è stata rimossa.
        Ecco i prodotti disponibili:
      </p>
      <div className="flex flex-wrap gap-3 justify-center pt-2">
        <Link
          href="/prodotto/dreame-l40-ultra-ae"
          className="inline-flex items-center justify-center rounded-lg bg-amazon-500 hover:bg-amazon-600 px-6 py-3 font-semibold text-white shadow"
        >
          🏆 Dreame L40 Ultra AE (Top Pick)
        </Link>
        <Link
          href="/prodotto/ultenic-mx50"
          className="inline-flex items-center justify-center rounded-lg border-2 border-amazon-500 text-amazon-700 hover:bg-amazon-50 px-6 py-3 font-semibold"
        >
          🤖 Ultenic MX50 (Best Value)
        </Link>
      </div>
    </main>
  );
}
